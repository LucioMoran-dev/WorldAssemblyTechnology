import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { extractApiMessage } from "@/utils/handle-api-error";
import { apiLogger } from "@/utils/logger";

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

  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  document.cookie =
    "frontend_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      const route = describeRoute(error);

      if (error.response) {
        const { status, statusText } = error.response;
        const serverMessage =
          extractApiMessage(error.response.data) ?? error.message;
        apiLogger.error(
          `${route} → ${status} ${statusText} | ${serverMessage}`,
          {
            message: serverMessage,
            response: error.response.data,
          }
        );
        reportToDevTerminal({
          route,
          status: `${status} ${statusText}`,
          message: serverMessage,
          detail: error.response.data,
        });
      } else if (error.request) {
        apiLogger.error(
          `${route} → NO RESPONSE from server (${error.code ?? "network error"})`,
          { detail: error.message }
        );
        reportToDevTerminal({
          route,
          status: `NO RESPONSE (${error.code ?? "network error"})`,
          message: error.message,
        });
      } else {
        apiLogger.error(`${route} → request setup failed`, {
          detail: error.message,
        });
        reportToDevTerminal({
          route,
          message: `request setup failed: ${error.message}`,
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
