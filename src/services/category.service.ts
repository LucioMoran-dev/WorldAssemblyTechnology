import { apiClient } from '@/lib/api';
import { Category, CategoryWithProducts, CreateCategoryDto } from '@/types';

/**
 * Servicio de categorías
 * Endpoints del módulo /categories
 */
export const categoryService = {
  /**
   * GET /categories - Listar todas las categorías
   * Público | Rate Limit: 60/min
   */
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  /**
   * GET /categories/:id - Obtener categoría por ID con productos
   * Público | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<CategoryWithProducts> => {
    const response = await apiClient.get<CategoryWithProducts>(`/categories/${id}`);
    return response.data;
  },

  /**
   * POST /categories - Crear categoría (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  create: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await apiClient.post<Category>('/categories', data);
    return response.data;
  },

  /**
   * POST /categories/seeder - Cargar categorías iniciales (Admin only)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  seedCategories: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/categories/seeder');
    return response.data;
  },
};
