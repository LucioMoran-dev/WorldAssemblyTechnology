"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { newsletterService } from "@/services";
import type {
  INewsletterSubscribeDto,
  ICreateCampaignDto,
  IUpdateCampaignDto,
  ISendPromoDto,
  ICampaignListParams,
} from "@/types";
import { getUserFacingMessage } from "@/utils";

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
      toast.error(getUserFacingMessage(error, "Error al suscribirse"));
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
      toast.error(getUserFacingMessage(error, "Error al desuscribirse"));
    },
  });
}

// ===== ADMIN =====

/** Estadísticas de tracking; campaignType filtra por tipo de campaña */
export function useNewsletterStats(campaignType?: string) {
  return useQuery({
    queryKey: ["newsletter", "stats", campaignType],
    queryFn: () => newsletterService.getStats(campaignType),
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
      toast.error(getUserFacingMessage(error, "Error al enviar newsletter"));
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
      toast.error(getUserFacingMessage(error, "Error al enviar promo"));
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
      toast.error(getUserFacingMessage(error, "Error al crear campaña"));
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
      toast.error(getUserFacingMessage(error, "Error al actualizar campaña"));
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
      toast.error(getUserFacingMessage(error, "Error al eliminar campaña"));
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
      toast.error(getUserFacingMessage(error, "Error al enviar campaña"));
    },
  });
}
