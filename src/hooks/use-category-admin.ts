"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { categoryService } from "@/services";
import type { IUpdateCategoryDto } from "@/types";

/**
 * Hook para actualizar categoría (ADMIN)
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateCategoryDto }) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría actualizada correctamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al actualizar categoría"
        : "Error al actualizar categoría";
      toast.error(message);
    },
  });
}

/**
 * Hook para eliminar categoría (ADMIN)
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría eliminada correctamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al eliminar categoría"
        : "Error al eliminar categoría";
      toast.error(message);
    },
  });
}
