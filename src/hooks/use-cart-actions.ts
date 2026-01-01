'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services';
import { useCart } from './use-cart';
import { AddToCartDto, UpdateCartItemDto, CheckoutDto } from '@/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

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
 */
export function useCartQuery() {
  const { setCart, setLoading } = useCart();

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      setLoading(true);
      const cart = await cartService.getCart();
      setCart(cart);
      setLoading(false);
      return cart;
    },
    staleTime: 30 * 1000, // 30 segundos
  });
}

/**
 * Hook para el resumen del carrito (navbar)
 */
export function useCartSummary() {
  return useQuery({
    queryKey: ['cart', 'summary'],
    queryFn: () => cartService.getSummary(),
    staleTime: 15 * 1000, // 15 segundos
    refetchInterval: 30 * 1000, // Refetch cada 30 segundos
  });
}

/**
 * Mutation para agregar producto al carrito
 */
export function useAddToCart() {
  const queryClient = useQueryClient();
  const { setCart } = useCart();

  return useMutation({
    mutationFn: (data: AddToCartDto) => cartService.addItem(data),
    onSuccess: (cart) => {
      setCart(cart);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Producto agregado al carrito');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al agregar producto'
        : 'Error al agregar producto';
      toast.error(message);
    },
  });
}

/**
 * Mutation para actualizar cantidad de un item
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { setCart } = useCart();

  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemDto }) =>
      cartService.updateItemQuantity(itemId, data),
    onSuccess: (cart) => {
      setCart(cart);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrito actualizado');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al actualizar carrito'
        : 'Error al actualizar carrito';
      toast.error(message);
    },
  });
}

/**
 * Mutation para eliminar un item del carrito
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const { setCart } = useCart();

  return useMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: (response) => {
      setCart(response.cart);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Producto eliminado del carrito');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al eliminar producto'
        : 'Error al eliminar producto';
      toast.error(message);
    },
  });
}

/**
 * Mutation para vaciar el carrito
 */
export function useClearCart() {
  const queryClient = useQueryClient();
  const { clearCart } = useCart();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrito vaciado');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al vaciar carrito'
        : 'Error al vaciar carrito';
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
  const { clearCart } = useCart();

  return useMutation({
    mutationFn: (data: CheckoutDto) => cartService.checkout(data),
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Orden creada exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al crear orden'
        : 'Error al crear orden';
      toast.error(message);
    },
  });
}
