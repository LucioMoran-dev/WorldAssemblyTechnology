/**
 * Tipos relacionados con productos, variantes y categorías
 */

import type { IReviews } from "./review.types";

// Variant Type Enum
export enum VariantType {
  RAM = "ram",
  STORAGE = "storage",
  PROCESSOR = "processor",
  VRAM = "vram",
  COLOR = "color",
  CONNECTIVITY = "connectivity",
  SCREEN_SIZE = "screen_size",
  RESOLUTION = "resolution",
  REFRESH_RATE = "refresh_rate",
  WARRANTY = "warranty",
  CONDITION = "condition",
  SWITCH = "switch",
}

// Category
export interface ICategory {
  id: string;
  name: string;
  category_name?: string;
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
  // Stock total calculado por el back: para productos con variantes suma el
  // stock de las variantes (baseStock queda en 0). Usar SIEMPRE
  // `totalStock ?? baseStock` para decidir disponibilidad.
  totalStock?: number;
  // Precios calculados por el back cuando hay descuentos activos
  finalPrice?: number;
  originalPrice?: number;
  hasActiveDiscount?: boolean;
  discountAmount?: number;
  discountPercentage?: number | null;
  discountEndDate?: string | null;
  imgUrls: string[];
  specifications?: IProductSpecifications;
  isActive: boolean;
  hasVariants: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  // El back devuelve el nombre de la categoría como string de nivel superior.
  // El objeto `category` anidado solo viene en algunos endpoints (no en la lista).
  category_name?: string;
  category?: ICategory;
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
  isActive?: boolean;
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
  // Filtro de categoría por NOMBRE (match exacto, case-insensitive).
  // El viejo `categoryId` ya no existe en el back: mandarlo da 400.
  category_name?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
  // Variant filters (match parcial case-insensitive sobre el nombre de la variante)
  ram?: string;
  storage?: string;
  processor?: string;
  vram?: string;
  screen_size?: string;
  resolution?: string;
  refresh_rate?: string;
  connectivity?: string;
  condition?: string;
  switch?: string;
  // Filtro genérico de variantes: se usan LOS DOS juntos (si va uno solo, el
  // back lo ignora). Sirve para tipos sin filtro propio, ej. warranty.
  variantType?: string;
  variantValue?: string;
  // Boolean filters
  inStock?: boolean;
  discounted?: boolean;
  isActive?: boolean;
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

// Respuesta REAL de GET /products/:id/price?variants=...
// (ver docs/frontend-variants-guide.md §3: NO devuelve tax/subtotal/desglose;
// finalPrice = basePrice + Σ priceModifier, con descuento ya aplicado)
export interface IPriceCalculation {
  productId: string;
  variantIds: string[];
  finalPrice: number;
}

// Respuesta REAL de GET /products/:id/stock?variants=...
// (ver docs/frontend-variants-guide.md §4: availableStock = min(stock de las
// variantes elegidas); sin variants = stock total del producto)
export interface IStockInfo {
  productId: string;
  variantIds: string[];
  availableStock: number;
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
