"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { userService } from "@/services";
import type { ChangeRoleDto, User, UserListParams } from "@/types";

/**
 * Hook para obtener lista de usuarios (ADMIN)
 */
export function useGetUsers(params?: UserListParams) {
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
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al eliminar usuario");
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
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al restaurar usuario");
    },
  });
}

/**
 * Hook para cambiar rol de usuario (SUPER_ADMIN)
 */
export function useChangeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ChangeRoleDto }) =>
      userService.changeUserRole(id, data),
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(`Rol cambiado a ${user.role} correctamente`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al cambiar rol");
    },
  });
}
