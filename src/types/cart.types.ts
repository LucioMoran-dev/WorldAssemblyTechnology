import type { IVariantSnapshot } from "./common.types";
import type { IProduct, IProductVariant } from "./product.types";
import type { IUser } from "./user.types";

/**
 * Tipos relacionados con el carrito de compras
 */

// Re-export VariantSnapshot para compatibilidad
export type { IVariantSnapshot };

// Cart Item
export interface ICartItem {
  id: string;
  quantity: number;
  priceAtAddition: number;
  subtotal: number;
  product: IProduct;
  variants?: IProductVariant[];
  selectedVariants?: IVariantSnapshot[];
}

// Cart
export interface ICart {
  id: string;
  user: IUser;
  items: ICartItem[];
  selectedAddressId?: string;
  itemCount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Cart Summary (para navbar)
export interface ICartSummary {
  itemCount: number;
  total: number;
  hasItems?: boolean;
}

// DTOs
export interface IAddToCartDto {
  productId: string;
  quantity: number;
  variantIds?: string[];
}

export interface IUpdateCartItemDto {
  quantity: number;
}

export interface ISelectAddressDto {
  addressId: string;
}

export interface ICheckoutAddressDto {
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}

export interface ICheckoutDto {
  shippingAddress: ICheckoutAddressDto;
  promoCode?: string;
}

export interface ICartDiscountPreviewItem {
  itemId: string;
  productName: string;
  originalUnitPrice: number;
  finalUnitPrice: number;
  discountAmount: number;
  discountSource?: string;
  discountCode?: string;
  quantity: number;
  subtotal: number;
}

export interface ICartDiscountPreview {
  subtotalOriginal: number;
  subtotalWithDiscount: number;
  totalDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  promoValid: boolean;
  promoErrors: string[];
  items: ICartDiscountPreviewItem[];
}

// Response types
export interface ISelectedAddressResponse {
  selectedAddressId: string | null;
}

// Legacy compatibility
export interface IStockValidationIssue {
  itemId: string;
  productId: string;
  productName: string;
  issue: string;
  requested: number;
  available: number;
}

export interface IStockValidationResponse {
  valid: boolean;
  issues: IStockValidationIssue[];
}
