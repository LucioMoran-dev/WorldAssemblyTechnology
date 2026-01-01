import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

/**
 * Configuración del cliente Axios para toda la aplicación
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 segundos
});

/**
 * Request Interceptor: Agregar token automáticamente a todas las peticiones
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener token de localStorage
    const token = localStorage.getItem("accessToken");

    // Si existe token, agregarlo al header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Manejar errores globales
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;

        const protectedRoutes = [
          "/dashboard",
          "/cart",
          "/checkout",
          "/orders",
          "/profile",
        ];

        const isProtectedRoute = protectedRoutes.some((route) =>
          currentPath.startsWith(route)
        );

        if (isProtectedRoute && !currentPath.startsWith("/auth")) {
          window.location.href = "/auth/singin";
        }
      }
    }

    return Promise.reject(error);
  }
);
