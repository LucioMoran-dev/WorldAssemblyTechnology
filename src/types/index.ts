export interface IProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  images?: string[];
  badge?: string;
  inStock?: boolean;
}

export interface IDownloads {
  id: string;
  name: string;
  orderId: string;
  date: string;
  downloadLink: string;
}

export interface IPaymentMethods {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface IReviews {
  id: string;
  productName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface IWishlistItems {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}
