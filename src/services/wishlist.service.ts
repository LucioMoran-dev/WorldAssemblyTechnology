import { apiClient } from "@/lib/api";
import type {
  IWishlist,
  IWishlistSummary,
  IAddToWishlistDto,
  IWishlistItem,
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
  getMyWishlist: async (): Promise<IWishlist> => {
    const response = await apiClient.get<IWishlist>("/wishlist/my-wishlist");
    return response.data;
  },

  /**
   * GET /wishlist/summary - Resumen rápido de wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  getSummary: async (): Promise<IWishlistSummary> => {
    const response = await apiClient.get<IWishlistSummary>("/wishlist/summary");
    return response.data;
  },

  /**
   * POST /wishlist/add - Agregar producto a wishlist
   * Requiere: CLIENT | Rate Limit: 60/min
   */
  addItem: async (data: IAddToWishlistDto): Promise<IWishlistItem> => {
    const response = await apiClient.post<IWishlistItem>("/wishlist/add", data);
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

  // Nota: se eliminó checkProduct (GET /wishlist/check/:id). Hacer un request
  // por producto disparaba el rate limit del back (429) con listas grandes;
  // ahora useCheckWishlist deriva la respuesta de la wishlist completa cacheada.
};
