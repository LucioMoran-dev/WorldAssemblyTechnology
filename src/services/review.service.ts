import { apiClient } from "@/lib/api";
import type {
  IReviews,
  IReviewAdmin,
  PaginatedReviews,
  ICreateReviewDto,
  IReviewResponse,
  ICanReviewResponse,
} from "@/types";

/**
 * Parámetros para listar reviews (Admin)
 */
export interface ReviewsQueryParams {
  page?: number;
  limit?: number;
  rating?: number;
  productId?: string;
  userName?: string;
}

/**
 * Servicio de reviews
 * Endpoints del módulo /review
 */
export const reviewService = {
  /**
   * POST /review - Crear review
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  create: async (data: ICreateReviewDto): Promise<IReviewResponse> => {
    const response = await apiClient.post<IReviewResponse>("/review", data);
    return response.data;
  },

  /**
   * GET /review - Todas las reviews paginadas (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   * Devuelve: { items: ReviewAdmin[], total: number, pages: number }
   */
  getAll: async (params?: ReviewsQueryParams): Promise<PaginatedReviews> => {
    const response = await apiClient.get<PaginatedReviews>("/review", {
      params,
    });
    return response.data;
  },

  /**
   * GET /review/:id - Review por ID
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<IReviews> => {
    const response = await apiClient.get<IReviews>(`/review/${id}`);
    return response.data;
  },

  /**
   * GET /review/product/:productId - Reviews de un producto (Admin)
   * Requiere: ADMIN | Rate Limit: 60/min
   * Devuelve todas las reviews (visibles y ocultas) con isVisible
   */
  getByProduct: async (productId: string): Promise<IReviewAdmin[]> => {
    const response = await apiClient.get<IReviewAdmin[]>(
      `/review/product/${productId}`
    );
    return response.data;
  },

  /**
   * GET /review/product/:productId/public - Reviews públicas de un producto
   * Público | Rate Limit: 60/min
   * Solo devuelve reviews con isVisible: true
   */
  getByProductPublic: async (productId: string): Promise<IReviews[]> => {
    const response = await apiClient.get<IReviews[]>(
      `/review/product/${productId}/public`
    );
    return response.data;
  },

  /**
   * GET /review/can-review/:productId - Verificar si puede dejar review
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  canReview: async (productId: string): Promise<ICanReviewResponse> => {
    const response = await apiClient.get<ICanReviewResponse>(
      `/review/can-review/${productId}`
    );
    return response.data;
  },

  /**
   * PATCH /review/:id/visibility - Toggle visibilidad de review
   * Requiere: ADMIN | Rate Limit: 60/min
   * Alterna el estado de isVisible (true → false, false → true)
   */
  toggleVisibility: async (id: string): Promise<IReviewAdmin> => {
    const response = await apiClient.patch<IReviewAdmin>(
      `/review/${id}/visibility`
    );
    return response.data;
  },

  /**
   * DELETE /review/:id - Eliminar review
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/review/${id}`);
  },
};
