"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { productService } from "@/services";
import type {
  ICreateProductDto,
  IUpdateProductDto,
  IProductsSearchQuery,
} from "@/types";

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
 * Mutation para eliminar producto (Admin)
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
      // 3. Manejo de errores con mensajes de Productos
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al precargar productos"
        : "Error al precargar productos";
      toast.error(message);
    },
  });
}
