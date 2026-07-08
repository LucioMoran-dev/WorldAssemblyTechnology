"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import { toast } from "sonner";

import { wishlistService } from "@/services";
import type { IAddToWishlistDto, ICheckWishlistResponse } from "@/types";
import { getUserFacingMessage } from "@/utils";

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
 * Hook para verificar si un producto está en wishlist.
 *
 * OJO: antes esto le pegaba a GET /wishlist/check/:id — UN request HTTP por
 * cada card visible. Con 24 productos por página de catálogo eso disparaba
 * 24 requests de golpe y el throttler del back (límite 60/min) devolvía
 * 429 Too Many Requests. El fix es el patrón "derivar, no consultar":
 * reutilizamos la query única de useWishlist() (1 request, cache de 5 min
 * compartida entre TODAS las cards) y respondemos "¿está el producto X?"
 * en memoria con un .some(). Las mutaciones de agregar/quitar ya invalidan
 * la key ["wishlist"], así que el estado del corazón se refresca solo.
 */
export function useCheckWishlist(productId: string): {
  data: ICheckWishlistResponse | undefined;
  isLoading: boolean;
} {
  const { data: wishlist, isLoading } = useWishlist();

  // useMemo evita recalcular el .some() en cada render si ni la wishlist
  // ni el productId cambiaron (con muchas cards montadas, suma).
  const data = useMemo<ICheckWishlistResponse | undefined>(() => {
    if (!wishlist) return undefined;
    return {
      isInWishlist:
        wishlist.items?.some((item) => item.product?.id === productId) ??
        false,
    };
  }, [wishlist, productId]);

  return { data, isLoading };
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
      toast.error(getUserFacingMessage(error, "Error al agregar a favoritos"));
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
      toast.error(getUserFacingMessage(error, "Error al eliminar de favoritos"));
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
      toast.error(getUserFacingMessage(error, "Error al vaciar favoritos"));
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
