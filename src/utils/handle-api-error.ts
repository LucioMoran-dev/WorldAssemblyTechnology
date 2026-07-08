import { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Shape de error que devuelve el back:
 * - Nuevo filtro global: el mensaje viene en `data.error.message`.
 * - Formato viejo (compat): el mensaje viene en `data.message`.
 * `message` puede ser string o string[] (validación de DTO).
 */
type ApiErrorBody = {
  message?: string | string[];
  error?: string | { message?: string | string[] };
};

/**
 * Extrae el mensaje legible del body de error, contemplando el shape nuevo
 * (`data.error.message`, anidado) y el viejo (`data.message`), y aplanando arrays.
 */
export function extractApiMessage(data: unknown): string | undefined {
  const body = data as ApiErrorBody | undefined;
  if (!body) return undefined;

  const nested =
    typeof body.error === "object" && body.error !== null
      ? body.error.message
      : undefined;
  const raw = nested ?? body.message;

  if (Array.isArray(raw)) return raw.join(", ");
  if (typeof raw === "string") return raw;
  return undefined;
}

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = extractApiMessage(error.response?.data);

    if (message) {
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

/**
 * Mensaje para mostrar en la VISTA (toast).
 *
 * - Errores 4xx (accionables por el usuario, ej. validación / nombre duplicado)
 *   → se muestra el mensaje del back si lo hay.
 * - 5xx, red o cualquier otro caso técnico → se muestra el `fallback` genérico.
 *
 * El error exacto/técnico se ve aparte en la consola y en el terminal de dev
 * (interceptor de `src/lib/api/client.ts`), no en la vista.
 */
export function getUserFacingMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const serverMessage = extractApiMessage(error.response?.data);
    if (serverMessage && status && status >= 400 && status < 500) {
      return serverMessage;
    }
  }
  return fallback;
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
