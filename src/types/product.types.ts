/**
 * Tipos relacionados con productos, variantes y categorías
 */

export interface Category {
  id: string;
  categoryName: string;
}

export interface ProductSpecifications {
  screenSize?: string;
  resolution?: string;
  batteryLife?: string;
  weight?: string;
  ports?: string[];
  [key: string]: any;
}

export interface ProductVariant {
  id: string;
  type: string;
  name: string;
  priceModifier: number;
  stock: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  basePrice: number;
  baseStock: number;
  imgUrls: string[];
  specifications: ProductSpecifications;
  isActive: boolean;
  hasVariants: boolean;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  category: Category;
  variants: ProductVariant[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  name?: string;
  brand?: string;
  price?: number;
  featured?: boolean;
}

export interface CreateProductDto {
  name: string;
  description: string;
  brand: string;
  model?: string;
  basePrice: number;
  baseStock: number;
  categoryId: string;
  specifications?: ProductSpecifications;
  featured?: boolean;
  variants?: CreateVariantDto[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  brand?: string;
  model?: string;
  basePrice?: number;
  baseStock?: number;
  categoryId?: string;
  specifications?: ProductSpecifications;
  featured?: boolean;
}

export interface CreateVariantDto {
  type: string;
  name: string;
  priceModifier: number;
  stock: number;
}

export interface UpdateVariantDto {
  type?: string;
  name?: string;
  priceModifier?: number;
  stock?: number;
  isAvailable?: boolean;
}

export interface PriceCalculation {
  productId: string;
  variantIds: string[];
  finalPrice: number;
}

export interface StockInfo {
  productId: string;
  variantIds: string[];
  availableStock: number;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface CreateCategoryDto {
  categoryName: string;
}
