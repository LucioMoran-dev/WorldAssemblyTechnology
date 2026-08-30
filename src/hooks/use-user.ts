"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { userService } from "@/services";
import type {
  IUpdateUserDto,
  ChangePasswordDto,
  ICreateAddressDto,
  IUpdateAddressDto,
  IResetPassword,
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
 * Estadísticas propias del usuario (GET /users/stats/me):
 * totalOrders, totalSpent, wishlistItems, reviewsGiven.
 */
export function useMyStats() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["user", "stats", "me"],
    queryFn: () => userService.getMyStats(),
    enabled: !isLoading && isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Mutation para actualizar perfil
 */
export function useUpdateProfile() {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateUserDto) => userService.updateProfile(data),
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
 * Eliminar la PROPIA cuenta (DELETE /users/:id — soft delete en el back).
 */
export function useDeleteMyAccount() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      toast.success("Tu cuenta fue eliminada");
      logout();
      // Redirect duro: limpia todo el estado en memoria de la sesión
      window.location.href = "/";
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "Error al eliminar la cuenta"
        : "Error al eliminar la cuenta";
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
    mutationFn: (data: ICreateAddressDto) => userService.createAddress(data),
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
      data: IUpdateAddressDto;
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

/**
 * Mutation para solicitar recuperacion de contrasena
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => userService.forgotPassword(email),
    onSuccess: (response) => {
      toast.success(
        response.message ||
          "Si el email existe, recibiras instrucciones para restablecer tu contrasena"
      );
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "No se pudo procesar la solicitud"
        : "No se pudo procesar la solicitud";
      toast.error(message);
    },
  });
}

/**
 * Mutation para restablecer contrasena con token
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: IResetPassword) => userService.resetPassword(data),

    onSuccess: (response) => {
      toast.success(
        response.message || "Contrasena restablecida correctamente"
      );
    },

    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as ErrorResponse)?.message ||
          "No se pudo restablecer la contrasena"
        : "No se pudo restablecer la contrasena";

      toast.error(message);
    },
  });
}
