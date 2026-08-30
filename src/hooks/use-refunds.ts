"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { refundService } from "@/services";
import type {
  IRefundFilters,
  IResolveRefundDto,
  ICreateRefundDto,
} from "@/types";
import { getUserFacingMessage } from "@/utils";

/**
 * Hooks de reembolsos (panel admin).
 * El cliente crea las solicitudes; el admin las lista y resuelve
 * (aprobar/rechazar con adminResponse obligatorio de 5-1000 chars).
 */

// ─────────────── CLIENTE ───────────────

/** Mis solicitudes de reembolso (GET /refunds/my-refunds) */
export function useMyRefunds() {
  return useQuery({
    queryKey: ["refunds", "my-refunds"],
    queryFn: () => refundService.getMyRefunds(),
    staleTime: 60 * 1000,
  });
}

export function useCreateRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateRefundDto) => refundService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success(
        "Solicitud de reembolso enviada. Te avisaremos por email cuando la revisemos."
      );
    },
    onError: (error: unknown) => {
      toast.error(
        getUserFacingMessage(error, "Error al solicitar el reembolso")
      );
    },
  });
}

// ─────────────── ADMIN ───────────────

// Lista paginada con filtros (status, userId)
export function useRefunds(params?: IRefundFilters) {
  return useQuery({
    queryKey: ["refunds", "all", params],
    queryFn: () => refundService.getAll(params),
    staleTime: 30 * 1000,
  });
}

// Detalle completo de una solicitud (trae order, payment y user)
export function useRefund(id: string) {
  return useQuery({
    queryKey: ["refunds", id],
    queryFn: () => refundService.getById(id),
    enabled: !!id,
  });
}

export function useApproveRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IResolveRefundDto }) =>
      refundService.approve(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success(
        "Reembolso aprobado. Recordá procesar la devolución del dinero manualmente."
      );
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al aprobar el reembolso"));
    },
  });
}

export function useRejectRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IResolveRefundDto }) =>
      refundService.reject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success("Reembolso rechazado. Se notificó al cliente por email.");
    },
    onError: (error: unknown) => {
      toast.error(
        getUserFacingMessage(error, "Error al rechazar el reembolso")
      );
    },
  });
}
