import { apiClient } from "@/lib/api";
import type {
  IRefund,
  IRefundFilters,
  IPaginatedRefunds,
  IResolveRefundDto,
  ICreateRefundDto,
  ICreateRefundResponse,
} from "@/types";

export const refundService = {
  // ─────────────── CLIENTE ───────────────

  /**
   * POST /refunds - Crear una solicitud de reembolso
   * Requiere: CLIENT | Throttle: 3/min
   */
  create: async (data: ICreateRefundDto): Promise<ICreateRefundResponse> => {
    const response = await apiClient.post<ICreateRefundResponse>(
      "/refunds",
      data
    );
    return response.data;
  },

  /**
   * GET /refunds/my-refunds - Mis solicitudes de reembolso
   * Requiere: CLIENT
   */
  getMyRefunds: async (): Promise<IRefund[]> => {
    const response = await apiClient.get<IRefund[]>("/refunds/my-refunds");
    return response.data;
  },

  // ─────────────── ADMIN ───────────────

  /**
   * GET /refunds - Listar solicitudes de reembolso (paginado, createdAt DESC)
   * Requiere: ADMIN | Filtros: status (pending/approved/rejected), userId
   */
  getAll: async (params?: IRefundFilters): Promise<IPaginatedRefunds> => {
    const response = await apiClient.get<IPaginatedRefunds>("/refunds", {
      params,
    });
    return response.data;
  },

  /**
   * GET /refunds/:id - Detalle completo (order, orderDetail, payment, user)
   * Requiere: ADMIN
   */
  getById: async (id: string): Promise<IRefund> => {
    const response = await apiClient.get<IRefund>(`/refunds/${id}`);
    return response.data;
  },

  /**
   * PATCH /refunds/:id/approve - Aprobar solicitud (solo desde "pending")
   * Requiere: ADMIN | adminResponse obligatorio (5-1000 chars) | Manda mail
   */
  approve: async (id: string, data: IResolveRefundDto): Promise<IRefund> => {
    const response = await apiClient.patch<IRefund>(
      `/refunds/${id}/approve`,
      data
    );
    return response.data;
  },

  /**
   * PATCH /refunds/:id/reject - Rechazar solicitud (solo desde "pending")
   * Requiere: ADMIN | adminResponse obligatorio (5-1000 chars) | Manda mail
   */
  reject: async (id: string, data: IResolveRefundDto): Promise<IRefund> => {
    const response = await apiClient.patch<IRefund>(
      `/refunds/${id}/reject`,
      data
    );
    return response.data;
  },
};
