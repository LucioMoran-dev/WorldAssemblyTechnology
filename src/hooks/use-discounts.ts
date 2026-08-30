"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { discountService, cartService } from "@/services";
import type {
  ICreateProductDiscountDto,
  IUpdateProductDiscountDto,
  ICreatePromoCodeDto,
  IUpdatePromoCodeDto,
  IDiscountListParams,
} from "@/types";
import { getUserFacingMessage } from "@/utils";

// ===== PREVIEW DESCUENTOS (CARRITO) =====

/**
 * Mutation para preview de descuentos en carrito
 */
export function usePreviewDiscounts() {
  return useMutation({
    mutationFn: (promoCode?: string) => cartService.previewDiscounts(promoCode),
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al calcular descuentos"));
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

/**
 * Descuento automático VIGENTE de un producto (GET /discounts/products/:id).
 * Público. Devuelve null si el producto no tiene descuento activo, por eso
 * la UI debe tratar la ausencia como caso normal, no como error.
 */
export function useProductDiscount(productId: string) {
  return useQuery({
    queryKey: ["discounts", "products", productId],
    queryFn: () => discountService.getProductDiscount(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000,
    retry: false,
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
      toast.error(getUserFacingMessage(error, "Error al crear descuento"));
    },
  });
}

export function useUpdateProductDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateProductDiscountDto;
    }) => discountService.updateProductDiscount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Descuento actualizado");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al actualizar descuento"));
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
      toast.error(getUserFacingMessage(error, "Error al desactivar descuento"));
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
      toast.error(getUserFacingMessage(error, "Error al crear código"));
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
      toast.error(getUserFacingMessage(error, "Error al actualizar código"));
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
      toast.error(getUserFacingMessage(error, "Error al desactivar código"));
    },
  });
}
