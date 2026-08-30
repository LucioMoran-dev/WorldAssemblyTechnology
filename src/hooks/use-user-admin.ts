"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { roleService, userService } from "@/services";
import type { IChangeRoleDto, IUser, IUserListParams } from "@/types";
import { getUserFacingMessage } from "@/utils";

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
      toast.error(getUserFacingMessage(error, "Error al eliminar usuario"));
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
      toast.error(getUserFacingMessage(error, "Error al restaurar usuario"));
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
      toast.error(getUserFacingMessage(error, "Error al cambiar rol"));
    },
  });
}

/**
 * Hook para obtener todos los roles del sistema (ADMIN)
 */
export function useRoles() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["roles"],
    queryFn: () => roleService.getRoles(),
    enabled: !isLoading && isAuthenticated,
    staleTime: 10 * 60 * 1000,
  });
}
