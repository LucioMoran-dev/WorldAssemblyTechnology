import { apiClient } from "@/lib/api";
import type {
  ICategory,
  ICategoryWithProducts,
  ICreateCategoryDto,
  IUpdateCategoryDto,
} from "@/types";
import type { IPaginatedResult } from "@/types/paginateResult";

/**
 * Parámetros para filtrado avanzado de categorías
 */
export interface CategorySearchParams {
  page?: number;
  limit?: number;
  category?: string;
}

/**
 * Servicio de categorías
 * Endpoints del módulo /categories
 */
export const categoryService = {
  getAll: async (
    params?: CategorySearchParams
  ): Promise<IPaginatedResult<ICategory>> => {
    const response = await apiClient.get<IPaginatedResult<ICategory>>(
      "/categories",
      {
        params,
      }
    );
    return response.data;
  },

  getById: async (id: string): Promise<ICategoryWithProducts> => {
    const response = await apiClient.get<ICategoryWithProducts>(
      `/categories/${id}`
    );
    return response.data;
  },

  /**
   * POST /categories - Crear categoría (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  create: async (data: ICreateCategoryDto): Promise<ICategory> => {
    const response = await apiClient.post<ICategory>("/categories", {
      category_name: data.name,
      description: data.description,
    });
    return response.data;
  },

  /**
   * POST /categories/seeder - Cargar categorías iniciales (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  seedCategories: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/categories/seeder"
    );
    return response.data;
  },

  /**
   * PUT /categories/:id - Actualizar categoría
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  update: async (id: string, data: IUpdateCategoryDto): Promise<ICategory> => {
    const payload: Record<string, unknown> = {};
    if (data.name !== undefined) payload.category_name = data.name;
    if (data.description !== undefined) payload.description = data.description;
    const response = await apiClient.put<ICategory>(
      `/categories/${id}`,
      payload
    );
    return response.data;
  },

  /**
   * DELETE /categories/:id - Eliminar categoría
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/categories/${id}`
    );
    return response.data;
  },
};
