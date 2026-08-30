import type { ICart } from "./cart.types";
import type { UserRole } from "./common.types";
import type { IOrder } from "./order.types";

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

export interface IJWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface IAuthResponse {
  accessToken: string;
  expiresIn?: number;
  user: IUser;
}

export interface ISingUpDto {
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
  name?: string;
  username?: string;
  phone?: string;
  birthDate?: string;
  password?: string;
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
  name?: string;
  username?: string;
  email?: string;
}

export interface IResetPassword {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export type SigninDto = ILoginDto;
export type Address = IUserAddress;
export type ChangePasswordDto = IUpdatePasswordDto;
