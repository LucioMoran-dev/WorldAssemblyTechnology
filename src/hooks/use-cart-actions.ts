"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { cartService } from "@/services";
import type { AddToCartDto, UpdateCartItemDto, CheckoutDto } from "@/types";
import { cartLogger } from "@/utils/logger";

// Importa los stores de Zustand
import { useAuth } from "./use-auth";
import { useCart } from "./use-cart";

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * React Query hooks para el carrito
 */

/**
 * Hook para obtener el carrito completo
 * SOLO se ejecuta si el usuario está autenticado Y la inicialización terminó
 */
export function useCartQuery() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  const enabled = !isLoading && isAuthenticated;

  // Debug log
  if (process.env.NODE_ENV === 'development') {
    cartLogger.info('useCartQuery hook called', { isLoading, isAuthenticated, enabled });
  }

  return useQuery({
    queryKey: ["cart", isAuthenticated, isLoading],
    queryFn: async () => {
      cartLogger.info('useCartQuery: Fetching cart from API');
      useCart.getState().setLoading(true);
      const cart = await cartService.getCart();
      useCart.getState().setCart(cart);
      useCart.getState().setLoading(false);
      return cart;
    },
    enabled, // ✅ Esperar a que termine de inicializar
    staleTime: 30 * 1000, // 30 segundos
    retry: (failureCount, error: unknown) => {
      // No reintentar si es 401 (no autenticado)
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para el resumen del carrito (navbar)
 * SOLO se ejecuta si el usuario está autenticado Y la inicialización terminó
 */
export function useCartSummary() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  const enabled = !isLoading && isAuthenticated;

  // Debug log
  if (process.env.NODE_ENV === 'development') {
    cartLogger.info('useCartSummary hook called', { isLoading, isAuthenticated, enabled });
  }

  return useQuery({
    queryKey: ["cart", "summary", isAuthenticated, isLoading],
    queryFn: () => {
      cartLogger.info('useCartSummary: Fetching cart summary from API');
      return cartService.getSummary();
    },
    enabled, // ✅ Esperar a que termine de inicializar
    staleTime: 15 * 1000, // 15 segundos
    refetchInterval: enabled ? 30 * 1000 : false, // Solo refetch si está habilitado
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Mutation para agregar producto al carrito
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartDto) => cartService.addItem(data),
    onSuccess: (cart) => {
      useCart.getState().setCart(cart);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Producto agregado al carrito");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al agregar producto"
        : "Error al agregar producto";
      toast.error(message);
    },
  });
}

/**
 * Mutation para actualizar cantidad de un item
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: string;
      data: UpdateCartItemDto;
    }) => cartService.updateItemQuantity(itemId, data),
    onSuccess: (cart) => {
      useCart.getState().setCart(cart);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Carrito actualizado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al actualizar carrito"
        : "Error al actualizar carrito";
      toast.error(message);
    },
  });
}

/**
 * Mutation para eliminar un item del carrito
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: (response) => {
      useCart.getState().setCart(response.cart);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Producto eliminado del carrito");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al eliminar producto"
        : "Error al eliminar producto";
      toast.error(message);
    },
  });
}

/**
 * Mutation para vaciar el carrito
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      useCart.getState().clearCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Carrito vaciado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al vaciar carrito"
        : "Error al vaciar carrito";
      toast.error(message);
    },
  });
}

/**
 * Hook para validar stock antes de checkout
 */
export function useValidateStock() {
  return useMutation({
    mutationFn: () => cartService.validateStock(),
  });
}

/**
 * Mutation para checkout
 */
export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CheckoutDto) => cartService.checkout(data),
    onSuccess: () => {
      useCart.getState().clearCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden creada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear orden"
        : "Error al crear orden";
      toast.error(message);
    },
  });
}
