import z from "zod";

import type { ICart } from "./cart.types";
import type { UserRole } from "./common.types";
import type { IOrder } from "./order.types";

/**
 * Tipos relacionados con usuarios y autenticación
 */

// User Address
export interface IUserAddress {
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
export interface IUser {
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
  addresses?: IUserAddress[];
  orders?: IOrder[];
  cart?: ICart;
}

// JWT Payload
export interface IJWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Auth Response
export interface IAuthResponse {
  accessToken: string; // ✅ El backend devuelve 'accessToken', no 'token'
  expiresIn?: number; // Segundos de expiración (opcional)
  user: IUser;
}

// DTOs
export interface ISignupDto {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthDate?: string;
  phone?: string;
  username?: string;
  addresses?: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IUpdateUserDto {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  phone: string;
  addresses: IUserAddress | string;
  username: string;
}

export interface IUpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ICreateAddressDto {
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface IUpdateAddressDto {
  label?: string;
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
}

export interface IChangeRoleDto {
  roleId: string;
}

export interface IRole {
  id: string;
  name: string;
}

export interface IUserListParams {
  page?: number;
  limit?: number;
  username?: string;
  email?: string;
}

export interface IResetPassword {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// Legacy compatibility
export type SigninDto = ILoginDto;
export type Address = IUserAddress;
export type ChangePasswordDto = IUpdatePasswordDto;

// auth types
export const schemaForgot = z.object({
  email: z.string().email("Ingresa un email valido"),
});

export type FormValues = z.infer<typeof schemaForgot>;
