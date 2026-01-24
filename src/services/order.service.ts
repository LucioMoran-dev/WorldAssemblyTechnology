import { apiClient } from "@/lib/api";
import type {
  IOrder,
  IOrderStats,
  OrderListParams,
  IUpdateOrderStatusDto,
  IConfirmPaymentDto,
} from "@/types";

/**
 * Servicio de órdenes
 * Endpoints del módulo /orders
 */
export const orderService = {
  /**
   * GET /orders/my-orders - Obtener mis órdenes
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getMyOrders: async (): Promise<IOrder[]> => {
    const response = await apiClient.get<IOrder[]>("/orders/my-orders");
    return response.data;
  },

  /**
   * GET /orders/:id - Obtener orden por ID
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<IOrder> => {
    const response = await apiClient.get<IOrder>(`/orders/${id}`);
    return response.data;
  },

  /**
   * GET /orders - Todas las órdenes (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getAllOrders: async (params?: OrderListParams): Promise<IOrder[]> => {
    const response = await apiClient.get<IOrder[]>("/orders", { params });
    return response.data;
  },

  /**
   * GET /orders/stats - Estadísticas de órdenes (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getStats: async (): Promise<IOrderStats> => {
    const response = await apiClient.get<IOrderStats>("/orders/stats");
    return response.data;
  },

  /**
   * PUT /orders/:id/status - Actualizar estado de orden (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  updateStatus: async (
    id: string,
    data: IUpdateOrderStatusDto
  ): Promise<IOrder> => {
    const response = await apiClient.put<IOrder>(`/orders/${id}/status`, data);
    return response.data;
  },

  /**
   * POST /orders/:id/confirm-payment - Confirmar pago de orden
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  confirmPayment: async (
    id: string,
    data: IConfirmPaymentDto
  ): Promise<IOrder> => {
    const response = await apiClient.post<IOrder>(
      `/orders/${id}/confirm-payment`,
      data
    );
    return response.data;
  },

  /**
   * POST /orders/:orderId/:userId/cancel - Cancelar orden (Super Admin only)
   * Requiere: SUPER_ADMIN | Rate Limit: 60/min
   */
  cancelOrder: async (orderId: string, userId: string): Promise<IOrder> => {
    const response = await apiClient.post<IOrder>(
      `/orders/${orderId}/${userId}/cancel`
    );
    return response.data;
  },
};
