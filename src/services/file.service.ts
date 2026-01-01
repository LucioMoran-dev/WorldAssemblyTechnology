import { apiClient } from '@/lib/api';
import { UploadImageResponse } from '@/types';

/**
 * Servicio de archivos
 * Endpoints del módulo /files
 */
export const fileService = {
  /**
   * POST /files/uploadImage/:id - Subir imagen de producto (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   * Content-Type: multipart/form-data
   */
  uploadProductImage: async (
    productId: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadImageResponse>(
      `/files/uploadImage/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentage);
          }
        },
      },
    );

    return response.data;
  },
};
