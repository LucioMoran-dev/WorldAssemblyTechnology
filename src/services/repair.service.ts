import { apiClient } from "@/lib/api";
import type {
  IRepair,
  ICreateRepairDto,
  IUpdateRepairStatusDto,
  IRepairListParams,
  IPaginatedResponse,
} from "@/types";

/**
 * Servicio de reparaciones
 * Endpoints del módulo /repairs
 */
export const repairService = {
  /**
   * POST /repairs - Enviar solicitud de reparación
   * Público - Rate limit: 3/min
   */
  submitRequest: async (
    data: ICreateRepairDto
  ): Promise<{ message: string; repairId: string }> => {
    const response = await apiClient.post<{
      message: string;
      repairId: string;
    }>("/repairs", data);
    return response.data;
  },

  /**
   * GET /repairs - Listar reparaciones (Admin)
   * Requiere: ADMIN+
   */
  getAll: async (
    params?: IRepairListParams
  ): Promise<IPaginatedResponse<IRepair>> => {
    const response = await apiClient.get<IPaginatedResponse<IRepair>>(
      "/repairs",
      { params }
    );
    return response.data;
  },

  /**
   * GET /repairs/:id - Detalle de reparación (Admin)
   * Requiere: ADMIN+
   */
  getById: async (id: string): Promise<IRepair> => {
    const response = await apiClient.get<IRepair>(`/repairs/${id}`);
    return response.data;
  },

  /**
   * PATCH /repairs/:id/status - Actualizar estado (Admin)
   * Requiere: ADMIN+
   */
  updateStatus: async (
    id: string,
    data: IUpdateRepairStatusDto
  ): Promise<IRepair> => {
    const response = await apiClient.patch<IRepair>(
      `/repairs/${id}/status`,
      data
    );
    return response.data;
  },
};
