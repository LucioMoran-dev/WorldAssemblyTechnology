'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services';
import { CreateCategoryDto } from '@/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * React Query hooks para categorías
 */

/**
 * Hook para obtener todas las categorías
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos (raramente cambian)
  });
}

/**
 * Hook para obtener una categoría por ID con sus productos
 */
export function useCategory(id: string) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

/**
 * Mutation para crear categoría (Admin)
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoría creada exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al crear categoría'
        : 'Error al crear categoría';
      toast.error(message);
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
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categorías precargadas exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al precargar categorías'
        : 'Error al precargar categorías';
      toast.error(message);
    },
  });
}
