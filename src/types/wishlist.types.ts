import type { IProduct } from "./product.types";
import type { IUser } from "./user.types";

/**
 * Tipos relacionados con wishlist
 */

// Wishlist Item
export interface IWishlistItem {
  id: string;
  product: IProduct;
  addedAt: string;
}

// Wishlist
export interface IWishlist {
  id: string;
  user: IUser;
  items: IWishlistItem[];
  createdAt: string;
  updatedAt: string;
}

// Wishlist Summary (para navbar)
export interface IWishlistSummary {
  itemCount: number;
}

// DTOs
export interface IAddToWishlistDto {
  productId: string;
}

export interface ICheckWishlistResponse {
  isInWishlist: boolean;
}
