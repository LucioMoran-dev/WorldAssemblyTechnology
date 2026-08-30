"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { orderService } from "@/services";
import type { OrderListParams, IUpdateOrderStatusDto } from "@/types";
import { OrderStatus } from "@/types";
import { getUserFacingMessage } from "@/utils";

export function useMyOrders() {
  return useQuery({
    queryKey: ["orders", "my-orders"],
    queryFn: () => orderService.getMyOrders(),
    staleTime: 1 * 60 * 1000,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });
}

// Cada cuánto le preguntamos al back si el pago ya se confirmó, y hasta
// cuándo insistimos. El webhook de Mercado Pago puede tardar unos segundos
// (retry de 1s + hasta 6 reintentos de 3s), por eso 60s de ventana.
const PAYMENT_POLL_INTERVAL_MS = 3000;
const PAYMENT_POLL_TIMEOUT_MS = 60000;

/**
 * Confirma el pago de una orden después de volver de Mercado Pago.
 * Devuelve: la orden, si está confirmada (paid o más avanzada), si se
 * agotó el tiempo, y si sigue esperando.
 */
export function useOrderPaymentConfirmation(orderId: string) {
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    setHasTimedOut(false);
    const timer = setTimeout(
      () => setHasTimedOut(true),
      PAYMENT_POLL_TIMEOUT_MS
    );
    return () => clearTimeout(timer);
  }, [orderId]);

  const query = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => orderService.getById(orderId),
    enabled: !!orderId,
    staleTime: 0,
    refetchInterval: (q) => {
      const order = q.state.data;
      if (order && order.status !== OrderStatus.PENDING) return false;
      if (hasTimedOut) return false;
      return PAYMENT_POLL_INTERVAL_MS;
    },
  });

  const order = query.data;
  const isConfirmed = Boolean(order && order.status !== OrderStatus.PENDING);
  const isPaid = order?.status === OrderStatus.PAID;

  return {
    order,
    isPaid,
    isConfirmed,
    isWaiting: !isConfirmed && !hasTimedOut,
    hasTimedOut: hasTimedOut && !isConfirmed,
    isError: query.isError,
  };
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
    mutationFn: ({
      orderId,
      cancellationReason,
    }: {
      orderId: string;
      cancellationReason: string;
    }) => orderService.cancelOrder(orderId, cancellationReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden cancelada exitosamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al cancelar orden"));
    },
  });
}
