export interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  url?: string;
  addedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistSummary {
  itemCount: 0;
}
export interface CreateWishlistItemDTO {
  name: string;
  description?: string;
  price: number;
  url?: string;
}

export interface AddToWishlistDto {
  productId: string;
}

export interface CheckWishlistResponse {
  isInWishlist: boolean;
}
