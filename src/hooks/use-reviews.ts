'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services';
import { CreateReviewDto } from '@/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * React Query hooks para reviews
 */

/**
 * Hook para obtener una review por ID
 */
export function useReview(id: string) {
  return useQuery({
    queryKey: ['reviews', id],
    queryFn: () => reviewService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para obtener reviews de un producto
 */
export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ['reviews', 'product', productId],
    queryFn: () => reviewService.getByProduct(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Hook para todas las reviews (Admin)
 */
export function useAllReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewService.getAll(),
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

/**
 * Mutation para crear review
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewDto) => reviewService.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'product', variables.productId] });
      toast.success('Review creada exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al crear review'
        : 'Error al crear review';
      toast.error(message);
    },
  });
}

/**
 * Mutation para eliminar review
 */
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review eliminada exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al eliminar review'
        : 'Error al eliminar review';
      toast.error(message);
    },
  });
}
