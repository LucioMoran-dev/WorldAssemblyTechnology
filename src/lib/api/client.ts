import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { apiLogger } from "@/utils/logger";

/**
 * Configuración del cliente Axios para toda la aplicación
 * Según guía de integración del backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 segundos
});

export { API_BASE_URL };

/**
 * Request Interceptor: Agregar token automáticamente a todas las peticiones
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener token de localStorage solo en el navegador
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

      // Si existe token, agregarlo al header Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
    // Solo loguear errores en desarrollo
    if (process.env.NODE_ENV === 'development') {
      // Crear un objeto de error más descriptivo
      const errorDetails = {
        type: error.response ? 'HTTP Error' : error.request ? 'Network Error' : 'Request Setup Error',
        status: error.response?.status || 'N/A',
        statusText: error.response?.statusText || 'N/A',
        message: error.message || 'Unknown error',
        url: error.config?.url || 'N/A',
        method: error.config?.method?.toUpperCase() || 'N/A',
        data: error.response?.data || 'No response data',
        code: error.code || 'N/A',
        hasResponse: !!error.response,
        hasRequest: !!error.request,
      };

      apiLogger.error('API Error Details', errorDetails);

      // Si es un error de red sin response, agregar más info
      if (!error.response && error.request) {
        apiLogger.error('Network Issue: No response received from server');
        apiLogger.error('Possible causes: CORS, server down, network timeout');
      }
    }

    // Manejar error 401 (Token inválido o expirado)
    if (error.response?.status === 401) {
      // Solo limpiar y redirigir si hay un token guardado que fue rechazado
      if (typeof window !== "undefined") {
        const hasToken = localStorage.getItem("token") || localStorage.getItem("accessToken");

        if (hasToken) {
          apiLogger.warn('Token inválido o expirado - limpiando sesión');

          // Token inválido o expirado, limpiar localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");

          // Redirigir a login solo si estamos en una ruta protegida
          const currentPath = window.location.pathname;
          const protectedRoutes = ["/dashboard", "/cart", "/checkout", "/orders", "/profile", "/admin"];
          const isProtectedRoute = protectedRoutes.some((route) => currentPath.startsWith(route));

          if (isProtectedRoute && !currentPath.startsWith("/auth")) {
            // Guardar la ruta actual para redirigir después del login
            sessionStorage.setItem("redirectAfterLogin", currentPath);
            window.location.href = "/auth/signin";
          }
        }
      }
    }

    return Promise.reject(error);
  }
);
