"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { userService } from "@/services";
import type { IChangeRoleDto, IUser, IUserListParams } from "@/types";

/**
 * Hook para obtener lista de usuarios (ADMIN)
 */
export function useGetUsers(params?: IUserListParams) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
    enabled: !isLoading && isAuthenticated,
    staleTime: 30 * 1000,
  });
}

/**
 * Hook para eliminar usuario (ADMIN)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario eliminado correctamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al eliminar usuario"
        : "Error al eliminar usuario";
      toast.error(message);
    },
  });
}

/**
 * Hook para restaurar usuario eliminado (ADMIN)
 */
export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.restoreUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario restaurado correctamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al restaurar usuario"
        : "Error al restaurar usuario";
      toast.error(message);
    },
  });
}

/**
 * Hook para cambiar rol de usuario (SUPER_ADMIN)
 */
export function useChangeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IChangeRoleDto }) =>
      userService.changeUserRole(id, data),
    onSuccess: (user: IUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(`Rol cambiado a ${user.role} correctamente`);
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al cambiar rol"
        : "Error al cambiar rol";
      toast.error(message);
    },
  });
}
