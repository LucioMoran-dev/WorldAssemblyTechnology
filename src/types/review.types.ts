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

// Usuario en Review (público)
export interface IReviewUser {
  id: string;
  name: string;
}

// Usuario en Review (admin) - incluye email
export interface IReviewUserAdmin extends IReviewUser {
  email: string;
}

// Producto en Review
export interface IReviewProduct {
  id: string;
  name: string;
}

// Review pública (para clientes y público)
export interface IReviews {
  id: string;
  rating: Rating;
  message: string;
  createdAt: string;
  user?: IReviewUser;
  product?: IReviewProduct;
}

// Review para Admin (incluye isVisible y email del usuario)
export interface IReviewAdmin {
  id: string;
  rating: Rating;
  message: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  user?: IReviewUserAdmin;
  product?: IReviewProduct;
}

// Respuesta paginada de reviews (Admin)
export interface PaginatedReviews {
  items: IReviewAdmin[];
  total: number;
  pages: number;
}

// DTOs
export interface ICreateReviewDto {
  productId: string;
  rating: Rating;
  message: string;
}

export interface IUpdateReviewDto {
  rating?: Rating;
  message?: string;
}

// Can Review Response
export interface ICanReviewResponse {
  canReview: boolean;
  hasReviewed?: boolean;
  message?: string;
  reason?: string | null;
}

// Legacy compatibility
export interface IReviewResponse {
  id: string;
  rating: number;
  message: string;
}
