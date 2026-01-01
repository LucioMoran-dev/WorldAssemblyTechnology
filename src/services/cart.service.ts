import { apiClient } from '@/lib/api';
import {
  Cart,
  CartSummary,
  AddToCartDto,
  UpdateCartItemDto,
  StockValidationResponse,
  SelectAddressDto,
  SelectedAddressResponse,
  CheckoutDto,
  Order,
} from '@/types';

/**
 * Servicio de carrito
 * Endpoints del módulo /cart
 */
export const cartService = {
  /**
   * GET /cart/id - Obtener mi carrito completo
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getCart: async (): Promise<Cart> => {
    const response = await apiClient.get<Cart>('/cart/id');
    return response.data;
  },

  /**
   * GET /cart/summary - Resumen rápido del carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getSummary: async (): Promise<CartSummary> => {
    const response = await apiClient.get<CartSummary>('/cart/summary');
    return response.data;
  },

  /**
   * POST /cart/add - Agregar producto al carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  addItem: async (data: AddToCartDto): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/cart/add', data);
    return response.data;
  },

  /**
   * PUT /cart/items/:cartItemId - Actualizar cantidad de item
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  updateItemQuantity: async (cartItemId: string, data: UpdateCartItemDto): Promise<Cart> => {
    const response = await apiClient.put<Cart>(`/cart/items/${cartItemId}`, data);
    return response.data;
  },

  /**
   * DELETE /cart/items/:cartItemId - Eliminar item del carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  removeItem: async (cartItemId: string): Promise<{ message: string; cart: Cart }> => {
    const response = await apiClient.delete<{ message: string; cart: Cart }>(
      `/cart/items/${cartItemId}`,
    );
    return response.data;
  },

  /**
   * DELETE /cart/clear - Vaciar carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  clearCart: async (): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>('/cart/clear');
    return response.data;
  },

  /**
   * POST /cart/validate-stock - Validar stock antes de checkout
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  validateStock: async (): Promise<StockValidationResponse> => {
    const response = await apiClient.post<StockValidationResponse>('/cart/validate-stock');
    return response.data;
  },

  /**
   * POST /cart/select-address - Seleccionar dirección guardada para checkout
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  selectAddress: async (data: SelectAddressDto): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/cart/select-address', data);
    return response.data;
  },

  /**
   * GET /cart/selected-address - Obtener dirección seleccionada
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getSelectedAddress: async (): Promise<SelectedAddressResponse> => {
    const response = await apiClient.get<SelectedAddressResponse>('/cart/selected-address');
    return response.data;
  },

  /**
   * POST /cart/checkout - Crear orden desde el carrito
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  checkout: async (data: CheckoutDto): Promise<Order> => {
    const response = await apiClient.post<Order>('/cart/checkout', data);
    return response.data;
  },
};
