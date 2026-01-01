/**
 * Tipos relacionados con reviews y calificaciones
 */

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: string;
  rating: Rating;
  message: string;
  isVisible: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
  };
}

export interface CreateReviewDto {
  productId: string;
  rating: Rating;
  message: string;
}

export interface ReviewResponse {
  id: string;
  rating: number;
  message: string;
}
