"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { wishlistService } from "@/services";
import type { IAddToWishlistDto } from "@/types";

import { useAuth } from "./use-auth";

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Hook para obtener la wishlist completa
 * SOLO se ejecuta si el usuario está autenticado Y la inicialización terminó
 */
export function useWishlist() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["wishlist", isAuthenticated, isLoading],
    queryFn: wishlistService.getMyWishlist,
    enabled: !isLoading && isAuthenticated, // ✅ Esperar a que termine de inicializar
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: (failureCount, error: unknown) => {
      // No reintentar si es 401 (no autenticado)
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para obtener el resumen de wishlist (para navbar)
 * SOLO se ejecuta si el usuario está autenticado Y la inicialización terminó
 */
export function useWishlistSummary() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["wishlist-summary", isAuthenticated, isLoading],
    queryFn: wishlistService.getSummary,
    enabled: !isLoading && isAuthenticated, // ✅ Esperar a que termine de inicializar
    staleTime: 1000 * 60 * 2, // 2 minutos
    refetchInterval: !isLoading && isAuthenticated ? 1000 * 60 * 2 : false, // Solo refetch si está autenticado
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para verificar si un producto está en wishlist
 * SOLO se ejecuta si el usuario está autenticado Y la inicialización terminó
 */
export function useCheckWishlist(productId: string) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["wishlist-check", productId, isAuthenticated, isLoading],
    queryFn: () => wishlistService.checkProduct(productId),
    enabled: !isLoading && !!productId && isAuthenticated, // ✅ Esperar a que termine de inicializar
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para agregar producto a wishlist
 */
export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IAddToWishlistDto) => wishlistService.addItem(data),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-summary"] });
      toast.success("Producto agregado a favoritos");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al agregar a favoritos"
        : "Error al agregar a favoritos";
      toast.error(message);
    },
  });
}

/**
 * Hook para eliminar producto de wishlist
 */
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => wishlistService.removeItem(productId),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-summary"] });
      toast.success("Producto eliminado de favoritos");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al eliminar de favoritos"
        : "Error al eliminar de favoritos";
      toast.error(message);
    },
  });
}

/**
 * Hook para vaciar wishlist
 */
export function useClearWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-summary"] });
      toast.success("Lista de favoritos vaciada");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al vaciar favoritos"
        : "Error al vaciar favoritos";
      toast.error(message);
    },
  });
}

/**
 * Hook para toggle producto en wishlist (agregar o eliminar)
 */
export function useToggleWishlist() {
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  return {
    toggle: (productId: string, isInWishlist: boolean) => {
      if (isInWishlist) {
        removeFromWishlist.mutate(productId);
      } else {
        addToWishlist.mutate({ productId });
      }
    },
    isLoading: addToWishlist.isPending || removeFromWishlist.isPending,
  };
}
