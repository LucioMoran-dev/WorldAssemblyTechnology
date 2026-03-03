"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { reviewService, type ReviewsQueryParams } from "@/services";
import type { ICreateReviewDto } from "@/types";

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
    queryKey: ["reviews", id],
    queryFn: () => reviewService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para obtener reviews públicas de un producto
 * Solo devuelve reviews visibles (isVisible: true)
 */
export function useProductReviewsPublic(productId: string) {
  return useQuery({
    queryKey: ["reviews", "product", productId, "public"],
    queryFn: () => reviewService.getByProductPublic(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Hook para obtener todas las reviews de un producto (Admin)
 * Incluye reviews visibles y ocultas con isVisible
 */
export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", "product", productId, "admin"],
    queryFn: () => reviewService.getByProduct(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Hook para todas las reviews paginadas (Admin)
 * Devuelve { items: ReviewAdmin[], total: number, pages: number }
 */
export function useAllReviews(params?: ReviewsQueryParams) {
  return useQuery({
    queryKey: ["reviews", "admin", params],
    queryFn: () => reviewService.getAll(params),
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

/**
 * Hook para verificar si el usuario puede dejar review
 */
export function useCanReview(productId: string) {
  return useQuery({
    queryKey: ["reviews", "can-review", productId],
    queryFn: () => reviewService.canReview(productId),
    enabled: !!productId,
  });
}

/**
 * Mutation para crear review
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateReviewDto) => reviewService.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["reviews", "product", variables.productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews", "can-review", variables.productId],
      });
      toast.success("Review creada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear review"
        : "Error al crear review";
      toast.error(message);
    },
  });
}

/**
 * Mutation para toggle visibilidad de review (Admin)
 */
export function useToggleReviewVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewService.toggleVisibility(id),
    onSuccess: (updatedReview) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      const status = updatedReview.isVisible ? "visible" : "oculta";
      toast.success(`Review marcada como ${status}`);
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al cambiar visibilidad"
        : "Error al cambiar visibilidad";
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
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review eliminada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al eliminar review"
        : "Error al eliminar review";
      toast.error(message);
    },
  });
}
