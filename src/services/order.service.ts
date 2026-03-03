import { apiClient } from "@/lib/api";
import type {
  IOrder,
  IOrdersListResponse,
  IOrderStats,
  OrderListParams,
  IUpdateOrderStatusDto,
} from "@/types";

/**
 * Servicio de órdenes
 * Endpoints del módulo /orders
 */
export const orderService = {
  /**
   * GET /orders/my-orders - Obtener mis órdenes
   * Requiere: Autenticación (CLIENT+)
   */
  getMyOrders: async (): Promise<IOrder[]> => {
    const response = await apiClient.get<IOrder[]>("/orders/my-orders");
    return response.data;
  },

  /**
   * GET /orders/:id - Obtener orden por ID
   * Requiere: Autenticación (CLIENT+ — solo propia si CLIENT)
   */
  getById: async (id: string): Promise<IOrder> => {
    const response = await apiClient.get<IOrder>(`/orders/${id}`);
    return response.data;
  },

  /**
   * GET /orders - Todas las órdenes (Admin only)
   * Requiere: ADMIN+
   */
  getAllOrders: async (
    params?: OrderListParams
  ): Promise<IOrdersListResponse> => {
    const response = await apiClient.get<IOrdersListResponse>("/orders", {
      params,
    });
    return response.data;
  },

  /**
   * GET /orders/stats - Estadísticas de órdenes (Admin only)
   * Requiere: ADMIN+
   */
  getStats: async (): Promise<IOrderStats> => {
    const response = await apiClient.get<IOrderStats>("/orders/stats");
    return response.data;
  },

  /**
   * PUT /orders/:id/status - Actualizar estado de orden (Admin only)
   * Requiere: ADMIN+
   */
  updateStatus: async (
    id: string,
    data: IUpdateOrderStatusDto
  ): Promise<IOrder> => {
    const response = await apiClient.put<IOrder>(`/orders/${id}/status`, null, {
      params: { status: data.status },
    });
    return response.data;
  },

  /**
   * POST /orders/:id/cancel - Cancelar orden
   * Requiere: CLIENT+ (solo en estado pending o paid)
   */
  cancelOrder: async (
    orderId: string,
    reason?: string
  ): Promise<IOrder> => {
    const response = await apiClient.post<IOrder>(
      `/orders/${orderId}/cancel`,
      { reason }
    );
    return response.data;
  },
};
