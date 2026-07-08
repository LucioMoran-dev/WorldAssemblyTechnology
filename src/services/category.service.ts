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
  category?: string; // Nombre de la categoría para filtrar
}

/**
 * Servicio de categorías
 * Endpoints del módulo /categories
 */
export const categoryService = {
  /**
   * GET /categories - Listar todas las categorías con filtros opcionales
   * Público | Rate Limit: 60/min
   *
   * @param params - Parámetros de búsqueda y paginación
   * @param params.page - Número de página (default: 1)
   * @param params.limit - Items por página (default: 10)
   * @param params.category - Filtrar por nombre de categoría (búsqueda parcial case-insensitive)
   *
   * @example
   * // Buscar categoría "laptops" con paginación
   * const result = await categoryService.getAll({ category: "laptops", page: 1, limit: 10 });
   *
   * @example
   * // Obtener todas las categorías sin filtros
   * const result = await categoryService.getAll();
   */
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

  /**
   * GET /categories/:id - Obtener categoría por ID con productos
   * Público | Rate Limit: 60/min
   *
   * @param id - UUID de la categoría
   *
   * @example
   * const category = await categoryService.getById("550e8400-e29b-41d4-a716-446655440000");
   */
  getById: async (id: string): Promise<ICategoryWithProducts> => {
    const response = await apiClient.get<ICategoryWithProducts>(
      `/categories/${id}`
    );
    return response.data;
  },

  /**
   * POST /categories - Crear categoría (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   *
   * @param data - Datos de la nueva categoría
   *
   * @example
   * const newCategory = await categoryService.create({ categoryName: "Tablets" });
   */
  create: async (data: ICreateCategoryDto): Promise<ICategory> => {
    // El back usa `category_name` (no `name`), igual que en productos.
    const response = await apiClient.post<ICategory>("/categories", {
      category_name: data.name,
      description: data.description,
    });
    return response.data;
  },

  /**
   * POST /categories/seeder - Cargar categorías iniciales (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   *
   * @example
   * const result = await categoryService.seedCategories();
   * // { message: "Categorías precargadas correctamente" }
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
   *
   * @param id - UUID de la categoría
   * @param data - Datos a actualizar
   *
   * @example
   * const category = await categoryService.update("550e8400-e29b-41d4-a716-446655440000", { name: "Laptops Gaming" });
   */
  update: async (id: string, data: IUpdateCategoryDto): Promise<ICategory> => {
    // El back usa `category_name` (no `name`), igual que en productos.
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
   *
   * @param id - UUID de la categoría
   *
   * @example
   * const result = await categoryService.delete("550e8400-e29b-41d4-a716-446655440000");
   * // { message: "Categoría eliminada correctamente" }
   */
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/categories/${id}`
    );
    return response.data;
  },
};
