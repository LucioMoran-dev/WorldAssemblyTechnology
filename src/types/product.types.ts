/**
 * Tipos relacionados con productos, variantes y categorías
 */

import type { Review } from "./review.types";

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
export interface Category {
  id: string;
  name: string;
  description?: string;
  products?: Product[];
}

// Product Specifications
export interface ProductSpecifications {
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
export interface ProductVariant {
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
export interface ProductFile {
  id: string;
  url: string;
  publicId: string;
  format: string;
  createdAt: string;
}

// Product
export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  model?: string;
  basePrice: number;
  baseStock: number;
  imgUrls: string[];
  specifications?: ProductSpecifications;
  isActive: boolean;
  hasVariants: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  variants?: ProductVariant[];
  files?: ProductFile[];
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
}

// DTOs
export interface CreateProductDto {
  name: string;
  description: string;
  brand: string;
  model?: string;
  basePrice: number;
  baseStock: number;
  categoryName: string;
  imgUrls?: string[];
  featured?: boolean;
  specifications?: ProductSpecifications;
  hasVariants?: boolean;
  variants?: CreateVariantDto[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  brand?: string;
  model?: string;
  basePrice?: number;
  baseStock?: number;
  categoryName?: string;
  imgUrls?: string[];
  featured?: boolean;
  specifications?: ProductSpecifications;
}

export interface CreateVariantDto {
  type: string;
  name: string;
  description?: string;
  priceModifier: number;
  stock: number;
  isAvailable?: boolean;
  sortOrder?: number;
}

export interface UpdateVariantDto {
  type?: string;
  name?: string;
  description?: string;
  priceModifier?: number;
  stock?: number;
  isAvailable?: boolean;
  sortOrder?: number;
}

// Search & Filters
export interface ProductsSearchQuery {
  name?: string;
  price?: number;
  brand?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  pages: number;
}

// Categories
export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

// Legacy compatibility
export type ProductFilters = ProductsSearchQuery;

// UI Props (for components)
export interface ProductCardProps {
  id: string;
  name: string;
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
