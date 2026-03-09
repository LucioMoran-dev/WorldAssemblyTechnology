"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { newsletterService } from "@/services";
import type {
  INewsletterSubscribeDto,
  ICreateCampaignDto,
  IUpdateCampaignDto,
  ISendPromoDto,
  ICampaignListParams,
} from "@/types";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Mutation para suscribirse al newsletter (público)
 */
export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: (data: INewsletterSubscribeDto) =>
      newsletterService.subscribe(data),
    onSuccess: () => {
      toast.success("¡Te has suscrito al newsletter exitosamente!");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al suscribirse"
        : "Error al suscribirse";
      toast.error(message);
    },
  });
}

export function useNewsletterUnsubscribe() {
  return useMutation({
    mutationFn: (token: string) => newsletterService.unsubscribe(token),

    onSuccess: (result) => {
      if (result.alreadyUnsubscribed) {
        toast.info(result.message);
        return;
      }

      toast.success(result.message);
    },

    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al desuscribirse"
        : "Error al desuscribirse";

      toast.error(message);
    },
  });
}

// ===== ADMIN =====

export function useNewsletterStats() {
  return useQuery({
    queryKey: ["newsletter", "stats"],
    queryFn: () => newsletterService.getStats(),
    staleTime: 2 * 60 * 1000,
  });
}

export function useSendMonthlyManual() {
  return useMutation({
    mutationFn: () => newsletterService.sendMonthlyManual(),
    onSuccess: () => {
      toast.success("Newsletter mensual enviado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al enviar newsletter"
        : "Error al enviar newsletter";
      toast.error(message);
    },
  });
}

export function useSendPromo() {
  return useMutation({
    mutationFn: (data: ISendPromoDto) => newsletterService.sendPromo(data),
    onSuccess: (result) => {
      toast.success(`Promo enviada a ${result.enqueuedCount} suscriptores`);
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al enviar promo"
        : "Error al enviar promo";
      toast.error(message);
    },
  });
}

// ===== CAMPAÑAS =====

export function useCampaigns(params?: ICampaignListParams) {
  return useQuery({
    queryKey: ["newsletter", "campaigns", params],
    queryFn: () => newsletterService.getCampaigns(params),
    staleTime: 1 * 60 * 1000,
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ["newsletter", "campaigns", id],
    queryFn: () => newsletterService.getCampaign(id),
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCampaignDto) =>
      newsletterService.createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newsletter", "campaigns"],
      });
      toast.success("Campaña creada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear campaña"
        : "Error al crear campaña";
      toast.error(message);
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateCampaignDto }) =>
      newsletterService.updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newsletter", "campaigns"],
      });
      toast.success("Campaña actualizada");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al actualizar campaña"
        : "Error al actualizar campaña";
      toast.error(message);
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => newsletterService.deleteCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newsletter", "campaigns"],
      });
      toast.success("Campaña eliminada");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al eliminar campaña"
        : "Error al eliminar campaña";
      toast.error(message);
    },
  });
}

export function useSendCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => newsletterService.sendCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newsletter", "campaigns"],
      });
      toast.success("Campaña enviada exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al enviar campaña"
        : "Error al enviar campaña";
      toast.error(message);
    },
  });
}
