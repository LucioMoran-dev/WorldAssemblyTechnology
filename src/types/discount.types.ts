/**
 * Tipos relacionados con descuentos y códigos promocionales
 */

export type DiscountType = "percentage" | "fixed";

// Descuento automático de producto (admin)
export interface IProductDiscount {
  id: string;
  productId: string;
  discountType: DiscountType;
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProductDiscountDto {
  productId: string;
  discountType: DiscountType;
  value: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

export interface IUpdateProductDiscountDto {
  discountType?: DiscountType;
  value?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

// Código promocional (admin)
export interface IPromoCode {
  id: string;
  code: string;
  discountType: DiscountType;
  value: number;
  maxUses: number;
  usesPerUser: number;
  currentUses: number;
  minAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  productIds?: string[];
  categoryIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePromoCodeDto {
  code: string;
  discountType: DiscountType;
  value: number;
  maxUses: number;
  usesPerUser: number;
  minAmount?: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  productIds?: string[];
  categoryIds?: string[];
}

export interface IUpdatePromoCodeDto {
  code?: string;
  discountType?: DiscountType;
  value?: number;
  maxUses?: number;
  usesPerUser?: number;
  minAmount?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  productIds?: string[];
  categoryIds?: string[];
}

export interface IPromoCodeUsage {
  id: string;
  userId: string;
  userName: string;
  orderId: string;
  orderNumber: string;
  usedAt: string;
  discountApplied: number;
}

export interface IValidateCodeResponse {
  valid: boolean;
  discount?: number;
  discountType?: DiscountType;
  message?: string;
  errors?: string[];
}

export interface IDiscountListParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
}
