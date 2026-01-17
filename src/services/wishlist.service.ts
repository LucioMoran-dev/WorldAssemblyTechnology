import { apiClient } from "@/lib/api";
import type {
  Wishlist,
  WishlistSummary,
  AddToWishlistDto,
  CheckWishlistResponse,
  WishlistItem,
} from "@/types";

/**
 * Servicio de wishlist (lista de deseos)
 * Endpoints del módulo /wishlist
 */
export const wishlistService = {
  /**
   * GET /wishlist/my-wishlist - Obtener mi wishlist completa
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  getMyWishlist: async (): Promise<Wishlist> => {
    const response = await apiClient.get<Wishlist>("/wishlist/my-wishlist");
    return response.data;
  },

  /**
   * GET /wishlist/summary - Resumen rápido de wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  getSummary: async (): Promise<WishlistSummary> => {
    const response = await apiClient.get<WishlistSummary>("/wishlist/summary");
    return response.data;
  },

  /**
   * POST /wishlist/add - Agregar producto a wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  addItem: async (data: AddToWishlistDto): Promise<WishlistItem> => {
    const response = await apiClient.post<WishlistItem>("/wishlist/add", data);
    return response.data;
  },

  /**
   * DELETE /wishlist/remove/:productId - Eliminar producto de wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  removeItem: async (productId: string): Promise<void> => {
    await apiClient.delete(`/wishlist/remove/${productId}`);
  },

  /**
   * DELETE /wishlist/clear - Vaciar wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  clearWishlist: async (): Promise<void> => {
    await apiClient.delete("/wishlist/clear");
  },

  /**
   * GET /wishlist/check/:productId - Verificar si producto está en wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  checkProduct: async (productId: string): Promise<CheckWishlistResponse> => {
    const response = await apiClient.get<CheckWishlistResponse>(
      `/wishlist/check/${productId}`
    );
    return response.data;
  },
};
