/**
 * Tipos comunes y compartidos entre módulos
 */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface MessageResponse {
  message: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'CLIENT' | 'CLEANER' | 'KEY_KEEPER';
