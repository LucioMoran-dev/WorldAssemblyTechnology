'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import { OrderListParams, UpdateOrderStatusDto, ConfirmPaymentDto } from '@/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * React Query hooks para órdenes
 */

/**
 * Hook para obtener mis órdenes
 */
export function useMyOrders() {
  return useQuery({
    queryKey: ['orders', 'my-orders'],
    queryFn: () => orderService.getMyOrders(),
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

/**
 * Hook para obtener una orden por ID
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para todas las órdenes (Admin)
 */
export function useAllOrders(params?: OrderListParams) {
  return useQuery({
    queryKey: ['orders', 'all', params],
    queryFn: () => orderService.getAllOrders(params),
    staleTime: 30 * 1000, // 30 segundos
  });
}

/**
 * Hook para estadísticas de órdenes (Admin)
 */
export function useOrderStats() {
  return useQuery({
    queryKey: ['orders', 'stats'],
    queryFn: () => orderService.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Mutation para actualizar estado de orden (Admin)
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderStatusDto }) =>
      orderService.updateStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', variables.id] });
      toast.success('Estado de orden actualizado');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al actualizar orden'
        : 'Error al actualizar orden';
      toast.error(message);
    },
  });
}

/**
 * Mutation para confirmar pago
 */
export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ConfirmPaymentDto }) =>
      orderService.confirmPayment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', variables.id] });
      toast.success('Pago confirmado exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al confirmar pago'
        : 'Error al confirmar pago';
      toast.error(message);
    },
  });
}

/**
 * Mutation para cancelar orden (Super Admin)
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, userId }: { orderId: string; userId: string }) =>
      orderService.cancelOrder(orderId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Orden cancelada exitosamente');
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Error al cancelar orden'
        : 'Error al cancelar orden';
      toast.error(message);
    },
  });
}
