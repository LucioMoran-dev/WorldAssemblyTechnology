"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { discountService, cartService } from "@/services";
import type {
  ICreateProductDiscountDto,
  IUpdateProductDiscountDto,
  ICreatePromoCodeDto,
  IUpdatePromoCodeDto,
  IDiscountListParams,
} from "@/types";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

// ===== PREVIEW DESCUENTOS (CARRITO) =====

/**
 * Mutation para preview de descuentos en carrito
 */
export function usePreviewDiscounts() {
  return useMutation({
    mutationFn: (promoCode?: string) =>
      cartService.previewDiscounts(promoCode),
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al calcular descuentos"
        : "Error al calcular descuentos";
      toast.error(message);
    },
  });
}

/**
 * Mutation para validar código promocional
 */
export function useValidatePromoCode() {
  return useMutation({
    mutationFn: (code: string) => discountService.validateCode(code),
  });
}

// ===== DESCUENTOS DE PRODUCTO (ADMIN) =====

export function useProductDiscounts(params?: IDiscountListParams) {
  return useQuery({
    queryKey: ["discounts", "products", params],
    queryFn: () => discountService.getProductDiscounts(params),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateProductDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateProductDiscountDto) =>
      discountService.createProductDiscount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Descuento creado exitosamente");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear descuento"
        : "Error al crear descuento";
      toast.error(message);
    },
  });
}

export function useUpdateProductDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateProductDiscountDto }) =>
      discountService.updateProductDiscount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Descuento actualizado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al actualizar descuento"
        : "Error al actualizar descuento";
      toast.error(message);
    },
  });
}

export function useDeleteProductDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => discountService.deleteProductDiscount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Descuento desactivado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al desactivar descuento"
        : "Error al desactivar descuento";
      toast.error(message);
    },
  });
}

// ===== CÓDIGOS PROMOCIONALES (ADMIN) =====

export function usePromoCodes(params?: IDiscountListParams) {
  return useQuery({
    queryKey: ["discounts", "promo-codes", params],
    queryFn: () => discountService.getPromoCodes(params),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePromoCodeUsage(id: string) {
  return useQuery({
    queryKey: ["discounts", "promo-codes", id, "usage"],
    queryFn: () => discountService.getPromoUsage(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });
}

export function useCreatePromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePromoCodeDto) =>
      discountService.createPromoCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "promo-codes"] });
      toast.success("Código promocional creado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al crear código"
        : "Error al crear código";
      toast.error(message);
    },
  });
}

export function useUpdatePromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdatePromoCodeDto }) =>
      discountService.updatePromoCode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "promo-codes"] });
      toast.success("Código promocional actualizado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al actualizar código"
        : "Error al actualizar código";
      toast.error(message);
    },
  });
}

export function useDeletePromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => discountService.deletePromoCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "promo-codes"] });
      toast.success("Código promocional desactivado");
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al desactivar código"
        : "Error al desactivar código";
      toast.error(message);
    },
  });
}
