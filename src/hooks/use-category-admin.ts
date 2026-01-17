"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { categoryService } from "@/services";
import type { CreateCategoryDto, UpdateCategoryDto } from "@/types";

/**
 * Hook para crear categoría (ADMIN)
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría creada correctamente");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al crear categoría");
    },
  });
}

/**
 * Hook para actualizar categoría (ADMIN)
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría actualizada correctamente");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error al actualizar categoría"
      );
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
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error al eliminar categoría"
      );
    },
  });
}
