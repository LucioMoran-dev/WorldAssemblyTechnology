"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { categoryService, type CategorySearchParams } from "@/services";
import type { ICreateCategoryDto } from "@/types";
import { getUserFacingMessage } from "@/utils";

/**
 * Hook para obtener categorías con filtros opcionales y paginación
 */
export function useCategories(params?: CategorySearchParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para obtener una categoría por ID con sus productos
 */
export function useCategory(id: string) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Mutation para crear categoría (Admin)
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCategoryDto) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría creada exitosamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al crear categoría"));
    },
  });
}

/**
 * Mutation para cargar categorías iniciales (Admin)
 */
export function useSeedCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => categoryService.seedCategories(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categorías precargadas exitosamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al precargar categorías"));
    },
  });
}
