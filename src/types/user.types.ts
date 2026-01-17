import type { Cart } from "./cart.types";
import type { UserRole } from "./common.types";
import type { Order } from "./order.types";

/**
 * Tipos relacionados con usuarios y autenticación
 */

// User Address
export interface UserAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  birthDate: Date;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  addresses?: UserAddress[];
  orders?: Order[];
  cart?: Cart;
}

// JWT Payload
export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Auth Response
export interface AuthResponse {
  accessToken: string; // ✅ El backend devuelve 'accessToken', no 'token'
  expiresIn?: number; // Segundos de expiración (opcional)
  user: User;
}

// DTOs
export interface SignupDto {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthDate?: string;
  phone?: string;
  username?: string;
  addresses?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  phone: string;
  addresses: UserAddress | string;
  username: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateAddressDto {
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateAddressDto {
  label?: string;
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
}

export interface ChangeRoleDto {
  role: UserRole;
}

export interface UserListParams {
  page?: number;
  limit?: number;
}

// Legacy compatibility
export type SigninDto = LoginDto;
export type Address = UserAddress;
export type ChangePasswordDto = UpdatePasswordDto;
