/**
 * Tipos relacionados con productos, variantes y categorías
 */

import type { IReviews } from "./review.types";

// Variant Type Enum
export enum VariantType {
  RAM = "RAM",
  STORAGE = "STORAGE",
  PROCESSOR = "PROCESSOR",
  COLOR = "COLOR",
  WARRANTY = "WARRANTY",
  SIZE = "SIZE",
}

// Category
export interface ICategory {
  id: string;
  name: string;
  description?: string;
  products?: IProduct[];
}

// Product Specifications
export interface IProductSpecifications {
  screenSize?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  batteryLife?: string;
  weight?: string;
  ports?: string[];
  [key: string]: string | string[] | undefined;
}

// Product Variant
export interface IProductVariant {
  id: string;
  type: string;
  name: string;
  description?: string;
  priceModifier: number;
  stock: number;
  isAvailable: boolean;
  sortOrder: number;
}

// Product File
export interface IProductFile {
  id: string;
  url: string;
  publicId: string;
  format: string;
  createdAt: string;
}

// Product
export interface IProduct {
  id: string;
  name: string;
  description: string;
  brand: string;
  model?: string;
  basePrice: number;
  baseStock: number;
  imgUrls: string[];
  specifications?: IProductSpecifications;
  isActive: boolean;
  hasVariants: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  variants?: IProductVariant[];
  files?: IProductFile[];
  reviews?: IReviews[];
  averageRating?: number;
  reviewCount?: number;
}

// DTOs
export interface ICreateProductDto {
  name: string;
  description: string;
  brand: string;
  model?: string;
  basePrice: number;
  baseStock: number;
  categoryName: string;
  imgUrls?: string[];
  featured?: boolean;
  specifications?: IProductSpecifications;
  hasVariants?: boolean;
  variants?: ICreateVariantDto[];
}

export interface IUpdateProductDto {
  name?: string;
  description?: string;
  brand?: string;
  model?: string;
  basePrice?: number;
  baseStock?: number;
  categoryName?: string;
  imgUrls?: string[];
  featured?: boolean;
  specifications?: IProductSpecifications;
}

export interface ICreateVariantDto {
  type: string;
  name: string;
  description?: string;
  priceModifier: number;
  stock: number;
  isAvailable?: boolean;
  sortOrder?: number;
}

export interface IUpdateVariantDto {
  type?: string;
  name?: string;
  description?: string;
  priceModifier?: number;
  stock?: number;
  isAvailable?: boolean;
  sortOrder?: number;
}

// Search & Filters
export interface IProductsSearchQuery {
  name?: string;
  basePrice?: number;
  brand?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface IPaginatedProducts {
  items: IProduct[];
  total: number;
  pages: number;
}

// Categories
export interface ICreateCategoryDto {
  name: string;
  description?: string;
}

export interface IUpdateCategoryDto {
  name?: string;
  description?: string;
}

export interface ICategoryWithProducts extends ICategory {
  products: IProduct[];
}

// Hybrid Search Types (Búsqueda instantánea + IA)
export interface IAutocompleteResult {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  image: string | null;
  category: string | null;
}

// SSE Stream Payload (GET /products/search/hybrid)
export interface IHybridSearchStreamPayload {
  source: "local" | "ai";
  results: IAutocompleteResult[];
  message?: string;
}

// REST Response (GET /products/search)
export interface IHybridSearchResponse {
  results: IAutocompleteResult[];
  aiResults?: IAutocompleteResult[];
  aiMessage?: string;
  source: "local" | "hybrid";
}

// Legacy compatibility
export type ProductFilters = IProductsSearchQuery;

// Price Calculation Response (GET /products/:id/price)
export interface IPriceCalculation {
  productId: string;
  basePrice: number;
  variantModifiers: number;
  subtotal: number;
  tax: number;
  total: number;
  selectedVariants?: {
    id: string;
    type: string;
    name: string;
    priceModifier: number;
  }[];
}

// Stock Information Response (GET /products/:id/stock)
export interface IStockInfo {
  productId: string;
  productName: string;
  baseStock: number;
  variantStock: number | null;
  availableStock: number;
  isAvailable: boolean;
  selectedVariants?: {
    id: string;
    type: string;
    name: string;
    stock: number;
  }[];
}

// UI Props (for components)
export interface IProductCardProps {
  id: string;
  name: string;
  description?: string;
  brand?: string;
  model?: string;
  category?: string;
  basePrice: number;
  originalPrice?: number;
  rating: number;
  reviews: string | number;
  image?: string;
  images?: string[];
  imgUrls?: string[];
  badge?: string;
  inStock?: boolean;
}
