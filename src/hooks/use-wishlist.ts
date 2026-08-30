"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import { toast } from "sonner";

import { wishlistService } from "@/services";
import type { IAddToWishlistDto, ICheckWishlistResponse } from "@/types";
import { getUserFacingMessage } from "@/utils";

import { useAuth } from "./use-auth";
import { useIsAdmin } from "./use-is-admin";

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
    enabled: !isLoading && isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error: unknown) => {
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
  const { isAdmin } = useIsAdmin();

  return useQuery({
    queryKey: ["wishlist-summary", isAuthenticated, isLoading],
    queryFn: wishlistService.getSummary,
    enabled: !isLoading && isAuthenticated && !isAdmin,
    staleTime: 1000 * 60 * 2,
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

export function useCheckWishlist(productId: string): {
  data: ICheckWishlistResponse | undefined;
  isLoading: boolean;
} {
  const { data: wishlist, isLoading } = useWishlist();

  const data = useMemo<ICheckWishlistResponse | undefined>(() => {
    if (!wishlist) return undefined;
    return {
      isInWishlist:
        wishlist.items?.some((item) => item.product?.id === productId) ?? false,
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
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-summary"] });
      toast.success("Producto eliminado de favoritos");
    },
    onError: (error: unknown) => {
      toast.error(
        getUserFacingMessage(error, "Error al eliminar de favoritos")
      );
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
