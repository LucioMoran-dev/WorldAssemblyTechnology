/**
 * Tipos relacionados con health check
 */

export interface IHealthCheckResponse {
  status: "ok";
  timestamp: string;
  uptime: number;
}
