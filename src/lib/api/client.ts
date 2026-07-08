import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { extractApiMessage } from "@/utils/handle-api-error";
import { apiLogger } from "@/utils/logger";

/**
 * Arma la "ruta" legible del request: MÉTODO /path?query
 * para saber exactamente qué endpoint falló.
 */
function describeRoute(error: AxiosError): string {
  const method = error.config?.method?.toUpperCase() ?? "???";
  const url = error.config?.url ?? "unknown-url";
  const params = error.config?.params as Record<string, unknown> | undefined;
  const query =
    params && Object.keys(params).length
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, String(v)])
        ).toString()
      : "";
  return `${method} ${url}${query}`;
}

/**
 * Reenvía el error al server para que también salga por el terminal de `pnpm dev`.
 * Fire-and-forget, solo en desarrollo y desde el browser. Usa `fetch` nativo
 * (no `apiClient`) para no recursar el interceptor.
 */
function reportToDevTerminal(payload: {
  route: string;
  status?: number | string;
  message?: string;
  detail?: unknown;
}): void {
  if (process.env.NODE_ENV !== "development") return;
  if (typeof window === "undefined") return;

  fetch("/api/dev-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // logging de dev: si falla, no importa
  });
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export { API_BASE_URL };

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

let isRedirecting401 = false;

function clearClientSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  document.cookie = "frontend_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      const route = describeRoute(error);

      if (error.response) {
        // El back respondió con un error HTTP → mostramos ruta + status + mensaje específico
        const { status, statusText } = error.response;
        const serverMessage =
          extractApiMessage(error.response.data) ?? error.message;
        apiLogger.error(`${route} → ${status} ${statusText} | ${serverMessage}`, {
          mensaje: serverMessage,
          respuesta: error.response.data,
        });
        reportToDevTerminal({
          route,
          status: `${status} ${statusText}`,
          message: serverMessage,
          detail: error.response.data,
        });
      } else if (error.request) {
        // No hubo respuesta: server caído, CORS, timeout, red
        apiLogger.error(
          `${route} → SIN RESPUESTA del servidor (${error.code ?? "network error"})`,
          { detalle: error.message }
        );
        reportToDevTerminal({
          route,
          status: `SIN RESPUESTA (${error.code ?? "network error"})`,
          message: error.message,
        });
      } else {
        // Error armando el request antes de salir
        apiLogger.error(`${route} → error al preparar el request`, {
          detalle: error.message,
        });
        reportToDevTerminal({
          route,
          message: `error al preparar el request: ${error.message}`,
        });
      }
    }

    if (error.response?.status === 401 && typeof window !== "undefined") {
      const hasToken =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      const hasUser = localStorage.getItem("user");

      if ((hasToken || hasUser) && !isRedirecting401) {
        apiLogger.warn("Unauthorized session detected - clearing auth state");
        clearClientSession();

        const currentPath = window.location.pathname;
        const protectedRoutes = [
          "/dashboard",
          "/admin",
          "/cart/checkout",
          "/cart/review-payment",
          "/orders",
          "/profile",
        ];

        const isProtectedRoute = protectedRoutes.some((route) =>
          currentPath.startsWith(route)
        );

        if (isProtectedRoute && !currentPath.startsWith("/auth")) {
          isRedirecting401 = true;
          sessionStorage.setItem("redirectAfterLogin", currentPath);
          window.location.href = "/auth/signin";
          setTimeout(() => {
            isRedirecting401 = false;
          }, 5000);
        }
      }
    }

    return Promise.reject(error);
  }
);
