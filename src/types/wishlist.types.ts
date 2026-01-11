import type { Product } from "./product.types";
import type { User } from "./user.types";

/**
 * Tipos relacionados con wishlist
 */

// Wishlist Item
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

// Wishlist
export interface Wishlist {
  id: string;
  user: User;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

// Wishlist Summary (para navbar)
export interface WishlistSummary {
  itemCount: number;
}

// DTOs
export interface AddToWishlistDto {
  productId: string;
}

// Legacy compatibility
export interface WishlistProduct extends Product {}

export interface CheckWishlistResponse {
  isInWishlist: boolean;
}
