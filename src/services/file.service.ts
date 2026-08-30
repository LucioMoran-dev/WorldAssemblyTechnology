import { apiClient } from "@/lib/api";
import type { IProductImage, IUploadImageResponse } from "@/types";

/**
 * Servicio de archivos
 * Endpoints del módulo /files
 */
export const fileService = {
  uploadProductImage: async (
    productId: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<IUploadImageResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<IUploadImageResponse>(
      `/files/uploadImage/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentage);
          }
        },
      }
    );

    return response.data;
  },

  /**
   * GET /files/product/:productId - Imágenes del producto con su ID
   * Requiere: ADMIN
   */
  getProductImages: async (productId: string): Promise<IProductImage[]> => {
    const response = await apiClient.get<IProductImage[]>(
      `/files/product/${productId}`
    );
    return response.data;
  },

  /**
   * DELETE /files/image/:imageId - Eliminar una imagen
   * Requiere: ADMIN
   * Borra la referencia en la DB y el archivo en Cloudinary.
   */
  deleteImage: async (imageId: string): Promise<void> => {
    await apiClient.delete(`/files/image/${imageId}`);
  },
};
