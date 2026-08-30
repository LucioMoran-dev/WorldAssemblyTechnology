"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { fileService } from "@/services";
import { getUserFacingMessage } from "@/utils";

/**
 * React Query hooks para archivos/imagenes
 */

/**
 * Imágenes de un producto con su ID (GET /files/product/:productId).
 * Necesario para poder borrarlas: `product.imgUrls` solo trae las URLs.
 */
export function useProductImages(productId: string) {
  return useQuery({
    queryKey: ["product-images", productId],
    queryFn: () => fileService.getProductImages(productId),
    enabled: !!productId,
    staleTime: 30 * 1000,
  });
}

/**
 * Eliminar una imagen de producto (Admin).
 * Borra la referencia en la DB y el archivo en Cloudinary.
 */
export function useDeleteProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageId }: { imageId: string; productId: string }) =>
      fileService.deleteImage(imageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product-images", variables.productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Imagen eliminada");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al eliminar la imagen"));
    },
  });
}

/**
 * Mutation para subir una imagen de producto (Admin)
 */
export function useUploadProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      file,
      onProgress,
    }: {
      productId: string;
      file: File;
      onProgress?: (progress: number) => void;
    }) => fileService.uploadProductImage(productId, file, onProgress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
      });
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al subir la imagen"));
    },
  });
}
