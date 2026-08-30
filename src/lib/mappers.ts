import type { IProduct, ICartItem, IReviews } from "@/types";

/**
 * Convierte Product del backend a ProductCardProps del frontend
 */
export function mapProductToCardProps(product: IProduct) {
  const categoryName =
    product.category_name ??
    product.category?.category_name ??
    product.category?.name ??
    "Sin categoría";

  const effectiveStock = product.totalStock ?? product.baseStock;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    model: product.model ?? "—",
    category: categoryName,
    basePrice: product.finalPrice ?? product.basePrice,
    originalPrice: product.hasActiveDiscount
      ? product.originalPrice
      : undefined,
    rating: Number(product.averageRating ?? 0),
    reviews: Number(product.reviewCount ?? 0),
    image: product.imgUrls[0],
    images: product.imgUrls,
    imgUrls: product.imgUrls,
    badge: product.featured ? "Destacado" : undefined,
    inStock: effectiveStock > 0,
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
  const categoryName =
    product.category_name ??
    product.category?.category_name ??
    product.category?.name;
  const averageRating = reviews ? calculateAverageRating(reviews) : 0;
  const reviewCount = reviews?.length || 0;

  const effectiveStock = product.totalStock ?? product.baseStock;

  const features = product.specifications
    ? Object.entries(product.specifications)
        .filter(([key]) => key !== "ports")
        .map(([key, value]) => `${key}: ${value}`)
    : [];

  return {
    id: product.id,
    name: product.name,
    price: (product.finalPrice ?? product.basePrice) as number,
    originalPrice: (product.hasActiveDiscount
      ? product.originalPrice
      : undefined) as number | undefined,
    stock: effectiveStock,
    stockCount: effectiveStock,
    images: product.imgUrls,
    image: product.imgUrls[0],
    brand: product.brand,
    model: product.model,
    description: product.description,
    specifications: product.specifications,
    rating: averageRating,
    reviews: reviewCount,
    inStock: effectiveStock > 0,
    sku: product.model || product.id.slice(0, 8).toUpperCase(),
    badge: product.featured ? "DESTACADO" : undefined,
    features,
    category: categoryName || "Sin categoría",
    variants: product.variants,
    hasVariants: product.hasVariants,
  };
}
