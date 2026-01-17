import type { Product, ProductVariant } from "./product.types";
import type { User } from "./user.types";
import type { VariantSnapshot } from "./common.types";

/**
 * Tipos relacionados con el carrito de compras
 */

// Re-export VariantSnapshot para compatibilidad
export type { VariantSnapshot };

// Cart Item
export interface CartItem {
  id: string;
  quantity: number;
  priceAtAddition: number;
  subtotal: number;
  product: Product;
  variants?: ProductVariant[];
  selectedVariants?: VariantSnapshot[];
}

// Cart
export interface Cart {
  id: string;
  user: User;
  items: CartItem[];
  selectedAddressId?: string;
  itemCount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Cart Summary (para navbar)
export interface CartSummary {
  itemCount: number;
  total: number;
}

// DTOs
export interface AddToCartDto {
  productId: string;
  quantity: number;
  variantIds?: string[];
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface SelectAddressDto {
  addressId: string;
}

export interface CheckoutDto {
  shippingAddress?: null;
  paymentMethod?: string;
}

// Response types
export interface SelectedAddressResponse {
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
export interface StockValidationIssue {
  itemId: string;
  productId: string;
  productName: string;
  issue: string;
  requested: number;
  available: number;
}

export interface StockValidationResponse {
  valid: boolean;
  issues: StockValidationIssue[];
}
