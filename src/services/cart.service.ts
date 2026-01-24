import { apiClient } from "@/lib/api";
import type {
  ICart,
  ICartSummary,
  IAddToCartDto,
  IUpdateCartItemDto,
  IStockValidationResponse,
  ISelectAddressDto,
  ISelectedAddressResponse,
  ICheckoutDto,
  IOrder,
} from "@/types";

/**
 * Servicio de carrito
 * Endpoints del módulo /cart
 */
export const cartService = {
  /**
   * GET /cart/id - Obtener mi carrito completo
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getCart: async (): Promise<ICart> => {
    const response = await apiClient.get<ICart>("/cart/id");
    return response.data;
  },

  /**
   * GET /cart/summary - Resumen rápido del carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getSummary: async (): Promise<ICartSummary> => {
    const response = await apiClient.get<ICartSummary>("/cart/summary");
    return response.data;
  },

  /**
   * POST /cart/add - Agregar producto al carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  addItem: async (data: IAddToCartDto): Promise<ICart> => {
    const response = await apiClient.post<ICart>("/cart/add", data);
    return response.data;
  },

  /**
   * PUT /cart/items/:cartItemId - Actualizar cantidad de item
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  updateItemQuantity: async (
    cartItemId: string,
    data: IUpdateCartItemDto
  ): Promise<ICart> => {
    const response = await apiClient.put<ICart>(
      `/cart/items/${cartItemId}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /cart/items/:cartItemId - Eliminar item del carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  removeItem: async (
    cartItemId: string
  ): Promise<{ message: string; cart: ICart }> => {
    const response = await apiClient.delete<{ message: string; cart: ICart }>(
      `/cart/items/${cartItemId}`
    );
    return response.data;
  },

  /**
   * DELETE /cart/clear - Vaciar carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  clearCart: async (): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>("/cart/clear");
    return response.data;
  },

  /**
   * POST /cart/validate-stock - Validar stock antes de checkout
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  validateStock: async (): Promise<IStockValidationResponse> => {
    const response = await apiClient.post<IStockValidationResponse>(
      "/cart/validate-stock"
    );
    return response.data;
  },

  /**
   * POST /cart/select-address - Seleccionar dirección guardada para checkout
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  selectAddress: async (
    data: ISelectAddressDto
  ): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/cart/select-address",
      data
    );
    return response.data;
  },

  /**
   * GET /cart/selected-address - Obtener dirección seleccionada
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getSelectedAddress: async (): Promise<ISelectedAddressResponse> => {
    const response = await apiClient.get<ISelectedAddressResponse>(
      "/cart/selected-address"
    );
    return response.data;
  },

  /**
   * POST /cart/checkout - Crear orden desde el carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  checkout: async (data: ICheckoutDto): Promise<IOrder> => {
    const response = await apiClient.post<IOrder>("/cart/checkout", data);
    return response.data;
  },
};
