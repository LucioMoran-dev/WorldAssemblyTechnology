import { apiClient } from "@/lib/api";
import type {
  IProductDiscount,
  ICreateProductDiscountDto,
  IUpdateProductDiscountDto,
  IPromoCode,
  ICreatePromoCodeDto,
  IUpdatePromoCodeDto,
  IPromoCodeUsage,
  IValidateCodeResponse,
  IDiscountListParams,
} from "@/types";

/**
 * Servicio de descuentos y códigos promocionales
 * Endpoints del módulo /discounts
 */
export const discountService = {
  // ===== DESCUENTOS DE PRODUCTO (ADMIN) =====

  /**
   * GET /discounts/products - Listar descuentos activos
   * Requiere: ADMIN+
   */
  getProductDiscounts: async (
    params?: IDiscountListParams
  ): Promise<IProductDiscount[]> => {
    const response = await apiClient.get<IProductDiscount[]>(
      "/discounts/products",
      { params }
    );
    return response.data;
  },

  /**
   * GET /discounts/products/:productId - Descuento activo de un producto
   * Público
   */
  getProductDiscount: async (
    productId: string
  ): Promise<IProductDiscount | null> => {
    const response = await apiClient.get<IProductDiscount | null>(
      `/discounts/products/${productId}`
    );
    return response.data;
  },

  /**
   * POST /discounts/products - Crear descuento de producto
   * Requiere: ADMIN+
   */
  createProductDiscount: async (
    data: ICreateProductDiscountDto
  ): Promise<IProductDiscount> => {
    const response = await apiClient.post<IProductDiscount>(
      "/discounts/products",
      data
    );
    return response.data;
  },

  /**
   * PUT /discounts/products/:id - Actualizar descuento
   * Requiere: ADMIN+
   */
  updateProductDiscount: async (
    id: string,
    data: IUpdateProductDiscountDto
  ): Promise<IProductDiscount> => {
    const response = await apiClient.put<IProductDiscount>(
      `/discounts/products/${id}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /discounts/products/:id - Desactivar descuento
   * Requiere: ADMIN+
   */
  deleteProductDiscount: async (
    id: string
  ): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/discounts/products/${id}`
    );
    return response.data;
  },

  // ===== CÓDIGOS PROMOCIONALES (ADMIN) =====

  /**
   * GET /discounts/promo-codes - Listar códigos
   * Requiere: ADMIN+
   */
  getPromoCodes: async (
    params?: IDiscountListParams
  ): Promise<IPromoCode[]> => {
    const response = await apiClient.get<IPromoCode[]>(
      "/discounts/promo-codes",
      { params }
    );
    return response.data;
  },

  /**
   * GET /discounts/promo-codes/:id - Detalle de código
   * Requiere: ADMIN+
   */
  getPromoCode: async (id: string): Promise<IPromoCode> => {
    const response = await apiClient.get<IPromoCode>(
      `/discounts/promo-codes/${id}`
    );
    return response.data;
  },

  /**
   * POST /discounts/promo-codes - Crear código
   * Requiere: ADMIN+
   */
  createPromoCode: async (data: ICreatePromoCodeDto): Promise<IPromoCode> => {
    const response = await apiClient.post<IPromoCode>(
      "/discounts/promo-codes",
      data
    );
    return response.data;
  },

  /**
   * PUT /discounts/promo-codes/:id - Actualizar código
   * Requiere: ADMIN+
   */
  updatePromoCode: async (
    id: string,
    data: IUpdatePromoCodeDto
  ): Promise<IPromoCode> => {
    const response = await apiClient.put<IPromoCode>(
      `/discounts/promo-codes/${id}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /discounts/promo-codes/:id - Desactivar código
   * Requiere: ADMIN+
   */
  deletePromoCode: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/discounts/promo-codes/${id}`
    );
    return response.data;
  },

  /**
   * GET /discounts/promo-codes/:id/usage - Historial de uso
   * Requiere: ADMIN+
   */
  getPromoUsage: async (id: string): Promise<IPromoCodeUsage[]> => {
    const response = await apiClient.get<IPromoCodeUsage[]>(
      `/discounts/promo-codes/${id}/usage`
    );
    return response.data;
  },

  // ===== VALIDACIÓN PÚBLICA =====

  /**
   * POST /discounts/validate-code - Validar código para el carrito del usuario
   * Requiere: Autenticación (cualquier rol)
   */
  validateCode: async (code: string): Promise<IValidateCodeResponse> => {
    const response = await apiClient.post<IValidateCodeResponse>(
      "/discounts/validate-code",
      { code }
    );
    return response.data;
  },
};
