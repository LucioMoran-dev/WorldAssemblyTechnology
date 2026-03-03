"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { paymentService } from "@/services";
import type { ICreatePreferenceDto, IPaymentListParams } from "@/types";
import { useAuth } from "./use-auth";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Mutation para crear preferencia de pago MercadoPago
 */
export function useCreatePreference() {
  return useMutation({
    mutationFn: (data: ICreatePreferenceDto) =>
      paymentService.createPreference(data),
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear preferencia de pago"
        : "Error al crear preferencia de pago";
      toast.error(message);
    },
  });
}

/**
 * Query para obtener mis pagos
 */
export function useMyPayments() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  return useQuery({
    queryKey: ["payments", "my-payments"],
    queryFn: () => paymentService.getMyPayments(),
    enabled: !isLoading && isAuthenticated,
    staleTime: 1 * 60 * 1000,
  });
}

/**
 * Query para obtener estado de un pago desde MercadoPago
 */
export function usePaymentStatus(paymentId: string) {
  return useQuery({
    queryKey: ["payments", "status", paymentId],
    queryFn: () => paymentService.getPaymentStatus(paymentId),
    enabled: !!paymentId,
    staleTime: 10 * 1000,
  });
}

/**
 * Query para listar todos los pagos (Admin)
 */
export function useAllPayments(params?: IPaymentListParams) {
  return useQuery({
    queryKey: ["payments", "all", params],
    queryFn: () => paymentService.getAllPayments(params),
    staleTime: 30 * 1000,
  });
}

/**
 * Query para pagos de una orden específica (Admin)
 */
export function usePaymentsByOrder(orderId: string) {
  return useQuery({
    queryKey: ["payments", "order", orderId],
    queryFn: () => paymentService.getPaymentsByOrder(orderId),
    enabled: !!orderId,
    staleTime: 30 * 1000,
  });
}
