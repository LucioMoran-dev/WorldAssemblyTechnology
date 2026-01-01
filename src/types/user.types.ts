import type { Cart } from "./cart.types";
import type { Role } from "./common.types";
import type { Order } from "./order.types";

/**
 * Tipos relacionados con usuarios y autenticación
 */

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  birthDate: Date | string;
  phone: string;
  address: string;
  role: Role;
  createdAt: Date | string;
  deletedAt: Date | string | null;
  orders?: Order[];
  cart?: Cart;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  username: string;
  phone?: string;
  address?: string;
}

export interface SigninDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  username?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeRoleDto {
  roleName: Role;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
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

export interface UserListParams {
  page?: number;
  limit?: number;
  username?: string;
  email?: string;
}
