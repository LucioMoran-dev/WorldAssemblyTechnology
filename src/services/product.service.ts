import { apiClient } from "@/lib/api";
import type {
  Product,
  PaginatedResponse,
  ProductFilters,
  CreateProductDto,
  UpdateProductDto,
  CreateVariantDto,
  UpdateVariantDto,
  ProductVariant,
} from "@/types";

/**
 * Servicio de productos
 * Endpoints del módulo /products
 */
export const productService = {
  /**
   * GET /products - Todos los productos sin filtros ni paginación
   * Público | Rate Limit: 60/min
   * ⚠️ Backend requiere page + limit para paginar
   */
  getProductsAll: async (): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      "/products",
      {
        params: { page: 1, limit: 100 }, // page es obligatorio, limit alto para traer todos
      }
    );
    return response.data;
  },

  /**
   * GET /products - Listar productos con filtros y paginación
   * Público | Rate Limit: 60/min
   */
  getProducts: async (
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      "/products",
      {
        params: filters,
      }
    );
    return response.data;
  },

  /**
   * GET /products/featured - Productos destacados
   * Público | Rate Limit: 60/min
   */
  getFeatured: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products/featured", {
      params: { limit },
    });
    return response.data;
  },

  /**
   * GET /products/brand/:brand - Productos por marca
   * Público | Rate Limit: 60/min
   */
  getByBrand: async (brand: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products/brand/${brand}`);
    return response.data;
  },

  /**
   * GET /products/:id - Obtener producto por ID
   * Público | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  /**
   * GET /products/category/:categoryId - Productos por categoría
   * Público | Rate Limit: 60/min
   */
  getByCategory: async (
    categoryId: string,
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      `/products/category/${categoryId}`,
      {
        params: filters,
      }
    );
    return response.data;
  },

  /**
   * GET /products/search?q=query - Búsqueda de productos
   * Público | Rate Limit: 60/min
   */
  search: async (query: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products/search", {
      params: { q: query },
    });
    return response.data;
  },

  /**
   * GET /products/:id/related - Productos relacionados
   * Público | Rate Limit: 60/min
   */
  getRelated: async (id: string, limit = 6): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products/${id}/related`, {
      params: { limit },
    });
    return response.data;
  },

  /**
   * GET /products/:id/price?variants=uuid1,uuid2 - Calcular precio final
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  calculatePrice: async (
    productId: string,
    variantIds?: string[]
  ): Promise<PriceCalculation> => {
    const params = variantIds?.length
      ? { variants: variantIds.join(",") }
      : undefined;
    const response = await apiClient.get<PriceCalculation>(
      `/products/${productId}/price`,
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * GET /products/:id/stock?variants=uuid1,uuid2 - Obtener stock disponible
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getStock: async (
    productId: string,
    variantIds?: string[]
  ): Promise<StockInfo> => {
    const params = variantIds?.length
      ? { variants: variantIds.join(",") }
      : undefined;
    const response = await apiClient.get<StockInfo>(
      `/products/${productId}/stock`,
      { params }
    );
    return response.data;
  },

  /**
   * POST /products - Crear producto
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  create: async (data: CreateProductDto): Promise<Product> => {
    const response = await apiClient.post<Product>("/products", data);
    return response.data;
  },

  /**
   * PUT /products/:id - Actualizar producto
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  update: async (id: string, data: UpdateProductDto): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /products/:id - Desactivar producto (Soft Delete)
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  delete: async (id: string): Promise<{ id: string; message: string }> => {
    const response = await apiClient.delete<{ id: string; message: string }>(
      `/products/${id}`
    );
    return response.data;
  },

  /**
   * POST /products/:id/variants - Agregar variante a producto
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  addVariant: async (
    productId: string,
    data: CreateVariantDto
  ): Promise<ProductVariant> => {
    const response = await apiClient.post<ProductVariant>(
      `/products/${productId}/variants`,
      data
    );
    return response.data;
  },

  /**
   * PUT /products/variants/:variantId - Actualizar variante
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  updateVariant: async (
    variantId: string,
    data: UpdateVariantDto
  ): Promise<ProductVariant> => {
    const response = await apiClient.put<ProductVariant>(
      `/products/variants/${variantId}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /products/variants/:variantId - Eliminar variante
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  deleteVariant: async (variantId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/products/variants/${variantId}`
    );
    return response.data;
  },

  /**
   * POST /products/seeder - Cargar productos de prueba
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  seedProducts: async (): Promise<{ message: string; total: number }> => {
    const response = await apiClient.post<{ message: string; total: number }>(
      "/products/seeder"
    );
    return response.data;
  },
};
