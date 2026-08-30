export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
}

export interface IApiError {
  statusCode: number;
  timestamp?: string;
  path?: string;
  message: string | string[];
  error: string;
}

export interface IApiResponse<T> {
  data?: T;
  error?: IApiError;
}

export interface IMessageResponse {
  message: string;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
}

// Roles según el backend
export enum UserRole {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type Role = UserRole;

// Variant Snapshot (compartido entre cart y order)
export interface IVariantSnapshot {
  id: string;
  type: string;
  name: string;
  priceModifier: number;
}
