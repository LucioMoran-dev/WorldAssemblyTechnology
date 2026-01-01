import { apiClient } from '@/lib/api';
import {
  Order,
  OrderStats,
  OrderListParams,
  UpdateOrderStatusDto,
  ConfirmPaymentDto,
} from '@/types';

/**
 * Servicio de órdenes
 * Endpoints del módulo /orders
 */
export const orderService = {
  /**
   * GET /orders/my-orders - Obtener mis órdenes
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getMyOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders/my-orders');
    return response.data;
  },

  /**
   * GET /orders/:id - Obtener orden por ID
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  /**
   * GET /orders - Todas las órdenes (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getAllOrders: async (params?: OrderListParams): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders', { params });
    return response.data;
  },

  /**
   * GET /orders/stats - Estadísticas de órdenes (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getStats: async (): Promise<OrderStats> => {
    const response = await apiClient.get<OrderStats>('/orders/stats');
    return response.data;
  },

  /**
   * PUT /orders/:id/status - Actualizar estado de orden (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  updateStatus: async (id: string, data: UpdateOrderStatusDto): Promise<Order> => {
    const response = await apiClient.put<Order>(`/orders/${id}/status`, data);
    return response.data;
  },

  /**
   * POST /orders/:id/confirm-payment - Confirmar pago de orden
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  confirmPayment: async (id: string, data: ConfirmPaymentDto): Promise<Order> => {
    const response = await apiClient.post<Order>(`/orders/${id}/confirm-payment`, data);
    return response.data;
  },

  /**
   * POST /orders/:orderId/:userId/cancel - Cancelar orden (Super Admin only)
   * Requiere: SUPER_ADMIN | Rate Limit: 60/min
   */
  cancelOrder: async (orderId: string, userId: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/orders/${orderId}/${userId}/cancel`);
    return response.data;
  },
};
