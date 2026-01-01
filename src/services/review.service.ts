import { apiClient } from '@/lib/api';
import { Review, CreateReviewDto, ReviewResponse } from '@/types';

/**
 * Servicio de reviews
 * Endpoints del módulo /review
 */
export const reviewService = {
  /**
   * POST /review - Crear review
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  create: async (data: CreateReviewDto): Promise<ReviewResponse> => {
    const response = await apiClient.post<ReviewResponse>('/review', data);
    return response.data;
  },

  /**
   * GET /review - Todas las reviews (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getAll: async (): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>('/review');
    return response.data;
  },

  /**
   * GET /review/:id - Review por ID
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<Review> => {
    const response = await apiClient.get<Review>(`/review/${id}`);
    return response.data;
  },

  /**
   * GET /review/product/:productId - Reviews de un producto (Admin)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getByProduct: async (productId: string): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/review/product/${productId}`);
    return response.data;
  },

  /**
   * GET /review/product/:productId/public - Reviews públicas de un producto
   * Público | Rate Limit: 60/min
   */
  getByProductPublic: async (productId: string): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/review/product/${productId}/public`);
    return response.data;
  },

  /**
   * GET /review/can-review/:productId - Verificar si puede dejar review
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  canReview: async (productId: string): Promise<{ canReview: boolean; reason: string | null }> => {
    const response = await apiClient.get<{ canReview: boolean; reason: string | null }>(
      `/review/can-review/${productId}`
    );
    return response.data;
  },

  /**
   * DELETE /review/:id - Eliminar review
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/review/${id}`);
    return response.data;
  },
};
