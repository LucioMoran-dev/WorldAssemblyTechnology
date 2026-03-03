/**
 * Utilidades para manejar errores de la API
 * Según guía de integración del backend
 */

import type { AxiosError } from "axios";

import type { IApiError } from "@/types";

/**
 * Extrae el mensaje de error de una respuesta de API
 * @param error Error de Axios
 * @returns Mensaje de error formateado
 */
export function handleApiError(error: unknown): string {
  // Si es un error de Axios
  if (isAxiosError(error)) {
    const apiError = error.response?.data as IApiError | undefined;

    if (apiError) {
      // Múltiples mensajes de validación
      if (Array.isArray(apiError.message)) {
        return apiError.message.join(", ");
      }

      // Mensaje único
      if (typeof apiError.message === "string") {
        return apiError.message;
      }

      // Error genérico
      return apiError.error || "Ha ocurrido un error";
    }

    // Error de red
    if (error.request) {
      return "No se pudo conectar con el servidor";
    }
  }

  // Error desconocido
  if (error instanceof Error) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado";
}

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

/**
 * Obtiene el código de estado HTTP de un error
 * @param error Error de Axios
 * @returns Código de estado HTTP o null
 */
export function getErrorStatusCode(error: unknown): number | null {
  if (isAxiosError(error)) {
    return error.response?.status ?? null;
  }
  return null;
}

/**
 * Verifica si un error es de autenticación (401)
 */
export function isAuthError(error: unknown): boolean {
  return getErrorStatusCode(error) === 401;
}

/**
 * Verifica si un error es de autorización (403)
 */
export function isForbiddenError(error: unknown): boolean {
  return getErrorStatusCode(error) === 403;
}

/**
 * Verifica si un error es de recurso no encontrado (404)
 */
export function isNotFoundError(error: unknown): boolean {
  return getErrorStatusCode(error) === 404;
}

/**
 * Verifica si un error es de validación (400)
 */
export function isValidationError(error: unknown): boolean {
  return getErrorStatusCode(error) === 400;
}

/**
 * Verifica si un error es de servidor (500+)
 */
export function isServerError(error: unknown): boolean {
  const statusCode = getErrorStatusCode(error);
  return statusCode !== null && statusCode >= 500;
}
