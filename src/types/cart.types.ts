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

export interface ICheckoutDto {
  shippingAddress?: null;
  paymentMethod?: string;
}

// Response types
export interface ISelectedAddressResponse {
  addressId: string | null;
  address: {
    id: string;
    label: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  } | null;
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
