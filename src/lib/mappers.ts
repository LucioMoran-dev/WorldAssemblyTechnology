/**
 * Mappers para convertir tipos del backend a tipos del frontend
 * Mantiene compatibilidad con componentes existentes
 */

import type { IProduct, ICartItem, IReviews } from "@/types";

/**
 * Convierte Product del backend a ProductCardProps del frontend
 */
export function mapProductToCardProps(product: IProduct) {
  const categoryName =
    product.category?.name ?? product.category?.category_name ?? "Sin categoría";

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    model: product.model ?? "—",
    category: categoryName,
    basePrice: product.basePrice, // Propiedad correcta segun ProductCardProps
    originalPrice: undefined, // Calcular si hay descuento
    rating: product.averageRating || 0,
    reviews: product.reviewCount || 0,
    image: product.imgUrls[0],
    images: product.imgUrls,
    imgUrls: product.imgUrls, // Agregado para compatibilidad
    badge: product.featured ? "Destacado" : undefined,
    inStock: product.baseStock > 0,
  };
}

/**
 * Convierte CartItem del backend a ICartItems del frontend
 */
export function mapCartItemToFrontend(cartItem: ICartItem) {
  return {
    id: cartItem.id,
    name: cartItem.product.name,
    price: cartItem.priceAtAddition,
    image: cartItem.product.imgUrls[0],
  };
}

/**
 * Convierte Review del backend a IReviews del frontend
 */
export function mapReviewToFrontend(review: IReviews) {
  return {
    id: review.id,
    productName: review.product?.name,
    rating: review.rating,
    date: new Date(review.createdAt).toLocaleDateString(),
    comment: review.message,
  };
}

/**
 * Calcula el rating promedio de un array de reviews
 */
export function calculateAverageRating(reviews: IReviews[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Convierte Product del backend a formato para vista de detalle
 */
export function mapProductToDetailView(
  product: IProduct,
  reviews?: IReviews[]
) {
  const categoryName = product.category?.name ?? product.category?.category_name;
  const averageRating = reviews ? calculateAverageRating(reviews) : 0;
  const reviewCount = reviews?.length || 0;

  // Extraer caracteristicas del objeto specifications
  const features = product.specifications
    ? Object.entries(product.specifications)
        .filter(([key]) => key !== "ports")
        .map(([key, value]) => `${key}: ${value}`)
    : [];

  return {
    id: product.id,
    name: product.name,
    price: product.basePrice as number,
    originalPrice: undefined as number | undefined, // Backend podria agregar precio original para descuentos
    stock: product.baseStock,
    stockCount: product.baseStock,
    images: product.imgUrls,
    image: product.imgUrls[0],
    brand: product.brand,
    model: product.model,
    description: product.description,
    specifications: product.specifications,
    rating: averageRating,
    reviews: reviewCount,
    inStock: product.baseStock > 0,
    sku: product.model || product.id.slice(0, 8).toUpperCase(),
    badge: product.featured ? "DESTACADO" : undefined,
    features,
    category: categoryName || "Sin categoría",
    variants: product.variants,
    hasVariants: product.hasVariants,
  };
}
