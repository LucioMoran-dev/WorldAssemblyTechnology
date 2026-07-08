"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { categoryService } from "@/services";
import type { IUpdateCategoryDto } from "@/types";
import { getUserFacingMessage } from "@/utils";

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
      toast.error(getUserFacingMessage(error, "Error al actualizar categoría"));
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
      toast.error(getUserFacingMessage(error, "Error al eliminar categoría"));
    },
  });
}
