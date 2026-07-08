"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { cartService } from "@/services";
import type { IAddToCartDto, IUpdateCartItemDto, ICheckoutDto } from "@/types";
import { getUserFacingMessage } from "@/utils";
import { cartLogger } from "@/utils/logger";

import { useAuth } from "./use-auth";
import { useCart } from "./use-cart";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function useCartQuery() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  const enabled = !isLoading && isAuthenticated;

  if (process.env.NODE_ENV === "development") {
    cartLogger.info("useCartQuery hook called", {
      isLoading,
      isAuthenticated,
      enabled,
    });
  }

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      cartLogger.info("useCartQuery: Fetching cart from API");
      useCart.getState().setLoading(true);
      const cart = await cartService.getCart();
      useCart.getState().setCart(cart);
      useCart.getState().setLoading(false);
      return cart;
    },
    enabled,
    staleTime: 30 * 1000,
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

export function useCartSummary() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  const enabled = !isLoading && isAuthenticated;

  if (process.env.NODE_ENV === "development") {
    cartLogger.info("useCartSummary hook called", {
      isLoading,
      isAuthenticated,
      enabled,
    });
  }

  return useQuery({
    queryKey: ["cart", "summary"],
    queryFn: () => {
      cartLogger.info("useCartSummary: Fetching cart summary from API");
      return cartService.getSummary();
    },
    enabled,
    staleTime: 15 * 1000,
    refetchInterval: enabled ? 30 * 1000 : false,
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IAddToCartDto) => cartService.addItem(data),
    onSuccess: async (cart) => {
      const normalizedCart = {
        ...cart,
        itemCount:
          typeof cart.itemCount === "number"
            ? cart.itemCount
            : cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
      };

      useCart.getState().setCart(normalizedCart);
      await queryClient.refetchQueries({ queryKey: ["cart"] });
      toast.success("Producto agregado al carrito");
    },
    onError: (error: unknown) => {
      const isAuthenticated = useAuth.getState().isAuthenticated;

      const defaultMessage = isAuthenticated
        ? "Error al agregar producto"
        : "Tiene que iniciar sesión para agregar productos al carrito";

      toast.error(getUserFacingMessage(error, defaultMessage));
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: string;
      data: IUpdateCartItemDto;
    }) => cartService.updateItemQuantity(itemId, data),
    onSuccess: async (cart) => {
      if (cart && typeof cart.itemCount !== "number") {
        cart.itemCount =
          cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      }

      useCart.getState().setCart(cart);
      await queryClient.refetchQueries({ queryKey: ["cart"] });
      toast.success("Carrito actualizado");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al actualizar carrito"));
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: async (response) => {
      const cart = response.cart;
      if (cart && typeof cart.itemCount !== "number") {
        cart.itemCount =
          cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      }

      useCart.getState().setCart(cart);
      await queryClient.refetchQueries({ queryKey: ["cart"] });

      toast.success("Producto eliminado del carrito");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al eliminar producto"));
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: async () => {
      useCart.getState().clearCart();
      await queryClient.refetchQueries({ queryKey: ["cart"] });
      toast.success("Carrito vaciado");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al vaciar carrito"));
    },
  });
}

export function useValidateStock() {
  return useMutation({
    mutationFn: () => cartService.validateStock(),
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICheckoutDto) => cartService.checkout(data),
    onSuccess: () => {
      useCart.getState().clearCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden creada exitosamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al crear orden"));
    },
  });
}
