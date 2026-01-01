import { apiClient } from '@/lib/api';
import { HealthCheckResponse } from '@/types';

/**
 * Servicio de health check
 * Endpoints del módulo /health
 */
export const healthService = {
  /**
   * GET /health - Verificar estado del servidor
   * Público | Sin Rate Limit
   */
  check: async (): Promise<HealthCheckResponse> => {
    const response = await apiClient.get<HealthCheckResponse>('/health');
    return response.data;
  },
};
