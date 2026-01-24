import { AxiosError } from "axios";
import { toast } from "sonner";

import type { IApiError } from "@/types";

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as IApiError | undefined;

    if (apiError?.message) {
      const message = Array.isArray(apiError.message)
        ? apiError.message.join(", ")
        : apiError.message;

      toast.error(message);
      return message;
    }

    switch (error.response?.status) {
      case 400:
        toast.error("Datos inválidos. Por favor verifica la información.");
        return "Datos inválidos";

      case 401:
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
        return "No autorizado";

      case 403:
        toast.error("No tienes permisos para realizar esta acción.");
        return "Acceso denegado";

      case 404:
        toast.error("Recurso no encontrado.");
        return "No encontrado";

      case 409:
        toast.error("Ya existe un recurso con estos datos.");
        return "Conflicto";

      case 429:
        toast.error("Demasiadas solicitudes. Por favor espera un momento.");
        return "Rate limit excedido";

      case 500:
        toast.error("Error interno del servidor. Por favor intenta más tarde.");
        return "Error del servidor";

      default:
        toast.error("Error inesperado. Por favor intenta nuevamente.");
        return "Error desconocido";
    }
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return error.message;
  }

  const fallbackMessage = "Error inesperado. Por favor intenta nuevamente.";
  toast.error(fallbackMessage);
  return fallbackMessage;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as IApiError | undefined;

    if (apiError?.message) {
      return Array.isArray(apiError.message)
        ? apiError.message.join(", ")
        : apiError.message;
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error desconocido";
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 401;
}

export function isRateLimitError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 429;
}

export function isValidationError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 400;
}
