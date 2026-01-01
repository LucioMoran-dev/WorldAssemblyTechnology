import type { Product, ProductVariant } from "./product.types";

/**
 * Tipos relacionados con el carrito de compras
 */

export interface CartItem {
  id: string;
  quantity: number;
  priceAtAddition: number;
  subtotal: number;
  addedAt: Date | string;
  product: Product;
  variants: ProductVariant[];
  selectedVariants: Record<string, any>;
}

export interface Cart {
  id: string;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  items: CartItem[];
  itemCount: number;
}

export interface CartSummary {
  itemCount: number;
  total: number;
  hasItems: boolean;
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
  variantIds?: string[];
}

export interface UpdateCartItemDto {
  quantity: number;
}

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

export interface SelectAddressDto {
  addressId: string;
}

export interface SelectedAddressResponse {
  selectedAddressId: string | null;
}

export interface ShippingAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface CheckoutDto {
  shippingAddress: ShippingAddress;
}
