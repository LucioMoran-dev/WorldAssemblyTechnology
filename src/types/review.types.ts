/**
 * Tipos relacionados con reviews y calificaciones
 */

// Rating Enum
export enum Rating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

// Review
export interface Review {
  id: string;
  rating: Rating;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
  };
}

// DTOs
export interface CreateReviewDto {
  productId: string;
  rating: Rating;
  message: string;
}

export interface UpdateReviewDto {
  rating?: Rating;
  message?: string;
}

// Legacy compatibility
export interface ReviewResponse {
  id: string;
  rating: number;
  message: string;
}
