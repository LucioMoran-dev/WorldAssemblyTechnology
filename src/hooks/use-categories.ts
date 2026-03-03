"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { categoryService, type CategorySearchParams } from "@/services";
import type { ICreateCategoryDto } from "@/types";

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Hook para obtener categorías con filtros opcionales y paginación
 *
 * @param params - Parámetros de búsqueda opcionales
 * @param params.page - Número de página
 * @param params.limit - Items por página
 * @param params.category - Nombre de categoría para filtrar
 *
 * @example
 * // Buscar categoría "laptops"
 * const { data } = useCategories({ category: "laptops" });
 * const products = data?.items[0]?.products ?? [];
 *
 * @example
 * // Listar todas con paginación
 * const { data } = useCategories({ page: 1, limit: 20 });
 */
export function useCategories(params?: CategorySearchParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

/**
 * Hook para obtener una categoría por ID con sus productos
 *
 * @param id - UUID de la categoría
 *
 * @example
 * const { data: category } = useCategory("550e8400-e29b-41d4-a716-446655440000");
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
 *
 * @example
 * const { mutate } = useCreateCategory();
 * mutate({ categoryName: "Tablets" });
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
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear categoría"
        : "Error al crear categoría";
      toast.error(message);
    },
  });
}

/**
 * Mutation para cargar categorías iniciales (Admin)
 *
 * @example
 * const { mutate } = useSeedCategories();
 * mutate();
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
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al precargar categorías"
        : "Error al precargar categorías";
      toast.error(message);
    },
  });
}
