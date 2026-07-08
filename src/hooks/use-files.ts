"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { fileService } from "@/services";
import { getUserFacingMessage } from "@/utils";

/**
 * React Query hooks para archivos/imagenes
 */

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
      queryClient.invalidateQueries({ queryKey: ["products", variables.productId] });
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al subir la imagen"));
    },
  });
}
