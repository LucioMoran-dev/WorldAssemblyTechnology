/**
 * Tipos relacionados con health check
 */

export interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
}
