import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { apiLogger } from "@/utils/logger";

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
      apiLogger.error("API Error Details", {
        type: error.response
          ? "HTTP Error"
          : error.request
            ? "Network Error"
            : "Request Setup Error",
        status: error.response?.status || "N/A",
        statusText: error.response?.statusText || "N/A",
        message: error.message || "Unknown error",
        url: error.config?.url || "N/A",
        method: error.config?.method?.toUpperCase() || "N/A",
        data: error.response?.data || "No response data",
        code: error.code || "N/A",
      });
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
