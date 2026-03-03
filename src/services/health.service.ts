import { apiClient } from "@/lib/api";
import type { IHealthCheckResponse } from "@/types";

/**
 * Servicio de health check
 * Endpoints del módulo /health
 */
export const healthService = {
  /**
   * GET /health - Verificar estado del servidor
   * Público | Sin Rate Limit
   */
  check: async (): Promise<IHealthCheckResponse> => {
    const response = await apiClient.get<IHealthCheckResponse>("/health");
    return response.data;
  },
};
