export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pages: number;
}

export type PaginateResult<T> = IPaginatedResult<T>;
export type PaginatedResponse<T> = IPaginatedResult<T>;
