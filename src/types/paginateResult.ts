/**
 * Tipo genérico para respuestas paginadas del backend
 */

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pages: number;
}

// Alias para compatibilidad con la guía del backend
export type PaginateResult<T> = IPaginatedResult<T>;
export type PaginatedResponse<T> = IPaginatedResult<T>;
