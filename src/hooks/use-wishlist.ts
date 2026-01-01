"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { wishlistService } from "@/services";
import type { AddToWishlistDto } from "@/types";

/**
 * Hook para obtener la wishlist completa
 */
export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistService.getMyWishlist,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Hook para obtener el resumen de wishlist (para navbar)
 */
export function useWishlistSummary() {
  return useQuery({
    queryKey: ["wishlist-summary"],
    queryFn: wishlistService.getSummary,
    staleTime: 1000 * 60 * 2, // 2 minutos
    refetchInterval: 1000 * 60 * 2, // Re-fetch cada 2 minutos
  });
}

/**
 * Hook para verificar si un producto está en wishlist
 */
export function useCheckWishlist(productId: string) {
  return useQuery({
    queryKey: ["wishlist-check", productId],
    queryFn: () => wishlistService.checkProduct(productId),
    enabled: !!productId,
  });
}

/**
 * Hook para agregar producto a wishlist
 */
export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToWishlistDto) => wishlistService.addItem(data),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-summary"] });
      toast.success("Producto agregado a favoritos");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al agregar a favoritos";
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
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al eliminar de favoritos";
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
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al vaciar favoritos";
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
