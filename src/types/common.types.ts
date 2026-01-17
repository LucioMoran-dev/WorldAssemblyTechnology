/**
 * Tipos comunes y compartidos entre módulos
 */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
}

export interface ApiError {
  statusCode: number;
  timestamp?: string;
  path?: string;
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

// Roles según el backend
export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export type Role = UserRole;

// Variant Snapshot (compartido entre cart y order)
export interface VariantSnapshot {
  id: string;
  type: string;
  name: string;
  priceModifier: number;
}
