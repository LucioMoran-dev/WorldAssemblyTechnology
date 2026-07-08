"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { orderService } from "@/services";
import type { OrderListParams, IUpdateOrderStatusDto } from "@/types";
import { getUserFacingMessage } from "@/utils";

export function useMyOrders() {
  return useQuery({
    queryKey: ["orders", "my-orders"],
    queryFn: () => orderService.getMyOrders(),
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para todas las órdenes (Admin)
 */
export function useAllOrders(params?: OrderListParams) {
  return useQuery({
    queryKey: ["orders", "all", params],
    queryFn: () => orderService.getAllOrders(params),
    staleTime: 30 * 1000, // 30 segundos
  });
}

/**
 * Hook para estadísticas de órdenes (Admin)
 */
export function useOrderStats() {
  return useQuery({
    queryKey: ["orders", "stats"],
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
    mutationFn: ({ id, data }: { id: string; data: IUpdateOrderStatusDto }) =>
      orderService.updateStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", variables.id] });
      toast.success("Estado de orden actualizado");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al actualizar orden"));
    },
  });
}

/**
 * Mutation para cancelar orden (CLIENT+ — solo pending o paid)
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) =>
      orderService.cancelOrder(orderId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden cancelada exitosamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al cancelar orden"));
    },
  });
}
