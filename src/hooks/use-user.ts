"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { userService } from "@/services";
import type {
  UpdateUserDto,
  ChangePasswordDto,
  CreateAddressDto,
  UpdateAddressDto,
} from "@/types";

import { useAuth } from "./use-auth";

/**
 * Type for error response
 */
interface ErrorResponse {
  message: string;
}

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * React Query hooks para gestión de usuario
 */

/**
 * Hook para obtener las direcciones del usuario
 */
export function useMyAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => userService.getMyAddresses(),
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

/**
 * Mutation para actualizar perfil
 */
export function useUpdateProfile() {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => userService.updateProfile(data),
    onSuccess: (user) => {
      updateUser(user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Perfil actualizado exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al actualizar perfil"
        : "Error al actualizar perfil";
      toast.error(message);
    },
  });
}

/**
 * Mutation para cambiar contraseña
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => userService.changePassword(data),
    onSuccess: () => {
      toast.success("Contraseña actualizada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al cambiar contraseña"
        : "Error al cambiar contraseña";
      toast.error(message);
    },
  });
}

/**
 * Mutation para crear dirección
 */
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAddressDto) => userService.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Dirección agregada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al agregar dirección"
        : "Error al agregar dirección";
      toast.error(message);
    },
  });
}

/**
 * Mutation para actualizar dirección
 */
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      addressId,
      data,
    }: {
      addressId: string;
      data: UpdateAddressDto;
    }) => userService.updateAddress(addressId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Dirección actualizada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al actualizar dirección"
        : "Error al actualizar dirección";
      toast.error(message);
    },
  });
}

/**
 * Mutation para eliminar dirección
 */
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => userService.deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Dirección eliminada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al eliminar dirección"
        : "Error al eliminar dirección";
      toast.error(message);
    },
  });
}

/**
 * Mutation para marcar dirección como predeterminada
 */
export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => userService.setDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Dirección predeterminada actualizada");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al actualizar dirección"
        : "Error al actualizar dirección";
      toast.error(message);
    },
  });
}
