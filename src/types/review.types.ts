export enum Rating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}
export interface IReviewUser {
  id: string;
  name: string;
}

export interface IReviewUserAdmin extends IReviewUser {
  email: string;
}
export interface IReviewProduct {
  id: string;
  name: string;
}
export interface IReviews {
  id: string;
  rating: Rating;
  message: string;
  createdAt: string;
  user?: IReviewUser;
  product?: IReviewProduct;
}
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
export interface PaginatedReviews {
  items: IReviewAdmin[];
  total: number;
  pages: number;
}
export interface PaginatedMyReviews {
  items: IReviews[];
  total: number;
  pages: number;
}

export interface ICreateReviewDto {
  productId: string;
  rating: Rating;
  message: string;
}

export interface IUpdateReviewDto {
  rating?: Rating;
  message?: string;
}

export interface ICanReviewResponse {
  canReview: boolean;
  hasReviewed?: boolean;
  message?: string;
  reason?: string | null;
}
export interface IReviewResponse {
  id: string;
  rating: number;
  message: string;
}
