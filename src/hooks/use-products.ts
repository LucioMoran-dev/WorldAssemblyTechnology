"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { productService } from "@/services";
import type {
  ICreateProductDto,
  IUpdateProductDto,
  IProductsSearchQuery,
  ICreateVariantDto,
  IProduct,
  IPaginatedResponse,
} from "@/types";
import { getUserFacingMessage } from "@/utils";

/**
 * Parchea el flag isActive de un producto en todos los caches de listas de productos,
 * para reflejar el cambio (activar/desactivar) al instante sin esperar al refetch.
 * Devuelve el snapshot previo para poder revertir si la mutación falla.
 */
function patchProductActiveInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string,
  isActive: boolean
) {
  const previous = queryClient.getQueriesData<IPaginatedResponse<IProduct>>({
    queryKey: ["products"],
  });
  queryClient.setQueriesData<IPaginatedResponse<IProduct>>(
    { queryKey: ["products"] },
    (old) =>
      old?.items
        ? {
            ...old,
            items: old.items.map((p) =>
              p.id === id ? { ...p, isActive } : p
            ),
          }
        : old
  );
  return previous;
}

/**
 * React Query hooks para productos
 */

/**
 * Type guard para verificar si un error es de Axios
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Hook para listar todos los productos sin filtros ni paginación
 * PÚBLICO - No requiere autenticación
 */
export function useAllProducts() {
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: () => productService.getProductsAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para listar productos con filtros y paginación
 * PÚBLICO - No requiere autenticación
 */
export function useProducts(filters?: IProductsSearchQuery) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: (failureCount, error: unknown) => {
      // No reintentar si es error 401 en endpoint público
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para productos destacados
 * PÚBLICO - No requiere autenticación
 */
export function useFeaturedProducts(limit = 10) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: () => productService.getFeatured(limit),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Hook para productos por marca
 */
export function useProductsByBrand(brand: string) {
  return useQuery({
    queryKey: ["products", "brand", brand],
    queryFn: () => productService.getByBrand(brand),
    enabled: !!brand,
    staleTime: 3 * 60 * 1000, // 3 minutos
  });
}

/**
 * Hook para obtener un producto por ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

/**
 * Hook para productos relacionados
 */
export function useRelatedProducts(id: string, limit = 6) {
  return useQuery({
    queryKey: ["products", id, "related", limit],
    queryFn: () => productService.getRelated(id, limit),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook para calcular precio con variantes
 */
export function useProductPrice(productId: string, variantIds?: string[]) {
  return useQuery({
    queryKey: ["products", productId, "price", variantIds],
    queryFn: () => productService.calculatePrice(productId, variantIds),
    enabled: !!productId,
  });
}

/**
 * Hook para obtener stock disponible
 */
export function useProductStock(productId: string, variantIds?: string[]) {
  return useQuery({
    queryKey: ["products", productId, "stock", variantIds],
    queryFn: () => productService.getStock(productId, variantIds),
    enabled: !!productId,
  });
}

/**
 * Mutation para crear producto (Admin)
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateProductDto) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * Mutation para crear producto + imágenes en un solo request atómico (Admin)
 * POST /products/with-images. Sirve también sin imágenes (images: []).
 */
export function useCreateProductWithImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, images }: { data: ICreateProductDto; images: File[] }) =>
      productService.createWithImages(data, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto creado correctamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al crear el producto"));
    },
  });
}

/**
 * Mutation para actualizar producto (Admin)
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateProductDto }) =>
      productService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
    },
  });
}

/**
 * Mutation para desactivar producto (Admin) — soft delete: marca isActive=false.
 * Optimistic: la fila pasa a "Inactivo" (rojo) al instante; si el back falla, se revierte.
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previous = patchProductActiveInCache(queryClient, id, false);
      return { previous };
    },
    onError: (error: unknown, _id, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data)
      );
      toast.error(getUserFacingMessage(error, "Error al desactivar el producto"));
    },
    onSuccess: () => {
      toast.success("Producto desactivado");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * Mutation para reactivar producto (Admin) — vuelve a marcar isActive=true.
 * Optimistic: la fila pasa a "Activo" (verde) al instante; si el back falla, se revierte.
 */
export function useReactivateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.update(id, { isActive: true }),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previous = patchProductActiveInCache(queryClient, id, true);
      return { previous };
    },
    onError: (error: unknown, _id, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data)
      );
      toast.error(getUserFacingMessage(error, "Error al reactivar el producto"));
    },
    onSuccess: () => {
      toast.success("Producto reactivado");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * Mutation para agregar variante a un producto existente (Admin)
 */
export function useAddVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: ICreateVariantDto }) =>
      productService.addVariant(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", variables.productId] });
      toast.success("Variante agregada correctamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al agregar variante"));
    },
  });
}

/**
 * Mutation para eliminar variante de un producto (Admin)
 */
export function useDeleteVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId }: { variantId: string; productId: string }) =>
      productService.deleteVariant(variantId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", variables.productId] });
      toast.success("Variante eliminada correctamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al eliminar variante"));
    },
  });
}

export function useSeedProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => productService.seedProducts(),
    onSuccess: (data) => {
      // 1. Invalidar la caché de productos para que se refresque la lista
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // 2. Mensaje de éxito correcto
      toast.success(data.message || "Productos precargados exitosamente");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al precargar productos"));
    },
  });
}
