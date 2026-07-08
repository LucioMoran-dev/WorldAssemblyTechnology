import { apiClient } from "@/lib/api";
import type {
  IProduct,
  IPaginatedResponse,
  ProductFilters,
  ICreateProductDto,
  IUpdateProductDto,
  ICreateVariantDto,
  IUpdateVariantDto,
  IProductVariant,
  IPriceCalculation,
  IStockInfo,
  IHybridSearchResponse,
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
  getProductsAll: async (): Promise<IPaginatedResponse<IProduct>> => {
    const response = await apiClient.get<IPaginatedResponse<IProduct>>(
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
  ): Promise<IPaginatedResponse<IProduct>> => {
    const response = await apiClient.get<IPaginatedResponse<IProduct>>(
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
  getFeatured: async (limit = 10): Promise<IProduct[]> => {
    const response = await apiClient.get<IProduct[]>("/products/featured", {
      params: { limit },
    });
    return response.data;
  },

  /**
   * GET /products/brand/:brand - Productos por marca
   * Público | Rate Limit: 60/min
   */
  getByBrand: async (brand: string): Promise<IProduct[]> => {
    const response = await apiClient.get<IProduct[]>(
      `/products/brand/${brand}`
    );
    return response.data;
  },

  /**
   * GET /products/:id - Obtener producto por ID
   * Público | Rate Limit: 60/min
   */
  getById: async (id: string): Promise<IProduct> => {
    const response = await apiClient.get<IProduct>(`/products/${id}`);
    return response.data;
  },

  /**
   * GET /products/category/:categoryId - Productos por categoría
   * Público | Rate Limit: 60/min
   */
  getByCategory: async (
    categoryId: string,
    filters?: ProductFilters
  ): Promise<IPaginatedResponse<IProduct>> => {
    const response = await apiClient.get<IPaginatedResponse<IProduct>>(
      `/products/category/${categoryId}`,
      {
        params: filters,
      }
    );
    return response.data;
  },

  /**
   * GET /products/search?q=query&ai=true&limit=8 - Búsqueda híbrida
   * Público | Rate Limit: 60/min
   *
   * @param query - Texto de búsqueda (mínimo 1 carácter)
   * @param useAi - Incluir resultados de IA (default: false)
   * @param limit - Cantidad de resultados (default: 8)
   */
  search: async (
    query: string,
    useAi = false,
    limit = 8
  ): Promise<IHybridSearchResponse> => {
    if (!query || query.trim().length < 1) {
      return { results: [], source: "local" };
    }

    const params: Record<string, string | number | boolean> = {
      q: query.trim(),
      limit,
    };

    if (useAi) {
      params.ai = true;
    }

    const response = await apiClient.get<IHybridSearchResponse>(
      "/products/search",
      { params }
    );
    return response.data;
  },

  /**
   * GET /products/:id/related - Productos relacionados
   * Público | Rate Limit: 60/min
   */
  getRelated: async (id: string, limit = 6): Promise<IProduct[]> => {
    const response = await apiClient.get<IProduct[]>(
      `/products/${id}/related`,
      {
        params: { limit },
      }
    );
    return response.data;
  },

  /**
   * GET /products/:id/price?variants=uuid1,uuid2 - Calcular precio final
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  calculatePrice: async (
    productId: string,
    variantIds?: string[]
  ): Promise<IPriceCalculation> => {
    const params = variantIds?.length
      ? { variants: variantIds.join(",") }
      : undefined;
    const response = await apiClient.get<IPriceCalculation>(
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
  ): Promise<IStockInfo> => {
    const params = variantIds?.length
      ? { variants: variantIds.join(",") }
      : undefined;
    const response = await apiClient.get<IStockInfo>(
      `/products/${productId}/stock`,
      { params }
    );
    return response.data;
  },

  /**
   * POST /products - Crear producto
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  create: async (data: ICreateProductDto): Promise<IProduct> => {
    const { categoryName, ...rest } = data;
    const response = await apiClient.post<IProduct>("/products", {
      ...rest,
      category_name: categoryName,
    });
    return response.data;
  },

  /**
   * POST /products/with-images - Crear producto + imágenes en un solo request (atómico)
   * Requiere: ADMIN | Content-Type: multipart/form-data
   *
   * - `data`: el CreateProductDto serializado como JSON (sin imgUrls: se ignoran).
   * - `images`: 0..N archivos bajo el mismo field `images` (máx 8, 5MB c/u).
   * Devuelve el producto completo con `imgUrls` ya poblado.
   */
  createWithImages: async (
    data: ICreateProductDto,
    images: File[]
  ): Promise<IProduct> => {
    // imgUrls se ignora del lado del back (se arma desde los archivos subidos)
    const { categoryName, imgUrls: _ignoredImgUrls, ...rest } = data;

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ ...rest, category_name: categoryName })
    );
    images.forEach((file) => formData.append("images", file));

    const response = await apiClient.post<IProduct>(
      "/products/with-images",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },

  /**
   * PUT /products/:id - Actualizar producto
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  update: async (id: string, data: IUpdateProductDto): Promise<IProduct> => {
    const { categoryName, ...rest } = data;
    const payload = categoryName !== undefined
      ? { ...rest, category_name: categoryName }
      : rest;
    const response = await apiClient.put<IProduct>(`/products/${id}`, payload);
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
    data: ICreateVariantDto
  ): Promise<IProductVariant> => {
    const response = await apiClient.post<IProductVariant>(
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
    data: IUpdateVariantDto
  ): Promise<IProductVariant> => {
    const response = await apiClient.put<IProductVariant>(
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
