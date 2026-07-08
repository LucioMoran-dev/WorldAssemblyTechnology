"use client";

import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RefreshCw,
  Star,
  ChevronRight,
  Minus,
  Plus,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ProductCard } from "@/components/home/product-card-home";
import { VariantSelector } from "@/components/products/variant-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useProduct,
  useRelatedProducts,
  useAddToCart,
  useProductReviewsPublic,
  useCheckWishlist,
  useToggleWishlist,
  useCreateReview,
  useCanReview,
  useAuth,
  useProductPrice,
  useProductStock,
} from "@/hooks";
import { mapProductToCardProps, mapProductToDetailView } from "@/lib/mappers";
import { Rating } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const { data: productData, isLoading: isLoadingProduct } =
    useProduct(productId);
  const { data: reviewsData } = useProductReviewsPublic(productId);
  const { data: relatedProductsData } = useRelatedProducts(productId, 4);
  const { data: wishlistCheck } = useCheckWishlist(productId);
  const { data: canReviewData } = useCanReview(productId);
  const { toggle: toggleWishlist, isLoading: isWishlistLoading } =
    useToggleWishlist();
  const addToCart = useAddToCart();
  const createReview = useCreateReview();

  const product = productData
    ? mapProductToDetailView(productData, reviewsData || [])
    : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const hasVariants = Boolean(
    productData?.hasVariants && productData.variants?.length
  );

  const variantTypes = useMemo(() => {
    if (!hasVariants) return [];
    return Array.from(new Set(productData!.variants!.map((v) => v.type)));
  }, [hasVariants, productData]);

  const isSelectionComplete =
    !hasVariants || variantTypes.every((t) => Boolean(selectedVariants[t]));

  const variantIds = useMemo(
    () => variantTypes.map((t) => selectedVariants[t]).filter(Boolean) as string[],
    [variantTypes, selectedVariants]
  );

  const { data: selectionPrice } = useProductPrice(
    hasVariants && isSelectionComplete ? productId : "",
    variantIds
  );
  const { data: selectionStock } = useProductStock(
    hasVariants && isSelectionComplete ? productId : "",
    variantIds
  );

  const handleSelectVariant = (type: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: variantId }));
    setQuantity(1);
  };

  const reviewDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
    const reviews = Array.isArray(reviewsData) ? reviewsData : [];
    for (const review of reviews) {
      const r = review.rating;
      if (r >= 1 && r <= 5) dist[r] = (dist[r] ?? 0) + 1;
    }
    return dist;
  }, [reviewsData]);

  const totalReviews = useMemo(() => {
    return Object.values(reviewDistribution).reduce((a, b) => a + b, 0);
  }, [reviewDistribution]);

  const isInWishlist = wishlistCheck?.isInWishlist ?? false;

  const effectiveStock =
    hasVariants && isSelectionComplete && selectionStock
      ? selectionStock.availableStock
      : product?.stockCount || 0;

  const effectivePrice =
    hasVariants && isSelectionComplete && selectionPrice
      ? selectionPrice.finalPrice
      : product?.price || 0;

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < effectiveStock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!productData) {
      toast.error("Producto no disponible");
      return;
    }
    if (hasVariants && !isSelectionComplete) {
      toast.error("Elegí una opción de cada tipo antes de agregar al carrito");
      return;
    }

    addToCart.mutate({
      productId: productData.id,
      quantity,
      variantIds: hasVariants ? variantIds : undefined,
    });
  };

  const handleBuyNow = () => {
    if (!productData) {
      toast.error("Producto no disponible");
      return;
    }
    if (hasVariants && !isSelectionComplete) {
      toast.error("Elegí una opción de cada tipo antes de comprar");
      return;
    }

    addToCart.mutate(
      {
        productId: productData.id,
        quantity,
        variantIds: hasVariants ? variantIds : undefined,
      },
      {
        onSuccess: () => {
          router.push("/cart");
        },
      }
    );
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Inicia sesión para agregar a favoritos");
      return;
    }
    toggleWishlist(productId, isInWishlist);
  };

  const handleSubmitReview = () => {
    if (!reviewMessage.trim()) {
      toast.error("Escribe un comentario para tu reseña");
      return;
    }

    const ratingMap: Record<number, Rating> = {
      1: Rating.ONE,
      2: Rating.TWO,
      3: Rating.THREE,
      4: Rating.FOUR,
      5: Rating.FIVE,
    };

    createReview.mutate(
      {
        productId,
        rating: ratingMap[reviewRating]!,
        message: reviewMessage,
      },
      {
        onSuccess: () => {
          setShowReviewForm(false);
          setReviewMessage("");
          setReviewRating(5);
        },
      }
    );
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="h-96 rounded-lg bg-gray-200" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded bg-gray-200" />
                <div className="h-24 w-full rounded bg-gray-200" />
                <div className="h-12 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="rounded-lg bg-white p-8 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Producto no encontrado
            </h1>
            <p className="mb-6 text-gray-600">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Link href="/products">
              <Button>Volver a productos</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const reviewsList = Array.isArray(reviewsData) ? reviewsData : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg border border-gray-200 bg-white p-8">
              {product.badge && (
                <Badge className="gradient-accent absolute top-4 left-4 z-10 border-0 text-white">
                  {product.badge}
                </Badge>
              )}
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg border-2 bg-white p-3 transition-all hover:border-blue-600 ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-3 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                <span>
                  SKU:{" "}
                  <span className="font-medium text-gray-900">
                    {product.sku}
                  </span>
                </span>
                <span>|</span>
                <span>
                  Marca:{" "}
                  <span className="font-medium text-gray-900">
                    {product.brand}
                  </span>
                </span>
              </div>

              {effectiveStock > 0 ? (
                <div className="mb-6 flex items-center gap-2 text-green-600">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  <span className="font-medium">
                    En Stock ({effectiveStock} disponibles
                    {hasVariants && isSelectionComplete
                      ? " de esta combinación"
                      : ""}
                    )
                  </span>
                </div>
              ) : (
                <div className="mb-6 flex items-center gap-2 text-red-600">
                  <div className="h-2 w-2 rounded-full bg-red-600" />
                  <span className="font-medium">
                    {hasVariants && isSelectionComplete
                      ? "Combinación sin stock"
                      : "Agotado"}
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                {/* Con variantes sin elegir, el precio del producto es un "desde" */}
                {hasVariants && !isSelectionComplete && (
                  <span className="text-lg font-medium text-gray-500">
                    Desde
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-bold text-gray-900">
                  ${effectivePrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <Badge className="border-0 bg-red-100 text-red-700">
                    Ahorra ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Selector de variantes (solo productos con variantes) */}
            {hasVariants && productData?.variants && (
              <div className="rounded-lg border border-gray-200 p-4">
                <VariantSelector
                  variants={productData.variants}
                  selected={selectedVariants}
                  onSelect={handleSelectVariant}
                />
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Cantidad:
                </span>
                <div className="flex items-center rounded-lg border border-gray-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stockCount}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Aviso cuando falta completar la selección de variantes */}
              {hasVariants && !isSelectionComplete && (
                <p className="text-sm text-orange-600">
                  Elegí una opción de cada tipo para ver el precio final y
                  poder comprar.
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={
                    addToCart.isPending ||
                    !productData ||
                    (hasVariants && !isSelectionComplete) ||
                    effectiveStock === 0
                  }
                  className="h-12 flex-1 bg-blue-600 text-base text-white hover:bg-blue-700"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {addToCart.isPending ? "Agregando..." : "Agregar al Carrito"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 border-gray-300 bg-transparent ${
                    isInWishlist
                      ? "border-red-300 text-red-500 hover:text-red-600"
                      : ""
                  }`}
                  onClick={handleToggleWishlist}
                  disabled={isWishlistLoading}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? "fill-red-500" : ""}`}
                  />
                </Button>
              </div>

              <Button
                variant="outline"
                className="h-12 w-full border-gray-300 bg-transparent"
                onClick={handleBuyNow}
                disabled={
                  addToCart.isPending ||
                  !productData ||
                  (hasVariants && !isSelectionComplete) ||
                  effectiveStock === 0
                }
              >
                {addToCart.isPending ? "Procesando..." : "Comprar Ahora"}
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">
                Características Principales:
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Envío Gratis</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Garantía 3 Años</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Devolución 30 Días</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12 rounded-lg border border-gray-200 bg-white p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="h-auto w-full justify-start rounded-none border-b border-gray-200 bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Especificaciones
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Reseñas ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.entries(product.specifications ?? {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex border-b border-gray-200 pb-3"
                    >
                      <span className="w-1/2 font-medium text-gray-900">
                        {key}:
                      </span>
                      <span className="w-1/2 text-gray-700">{value}</span>
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-8 border-b border-gray-200 pb-6">
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-gray-900">
                      {product.rating}
                    </div>
                    <div className="mb-1 flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-orange-400 text-orange-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.reviews} reseñas
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="w-12 text-sm text-gray-600">
                          {stars} estrellas
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full bg-orange-400"
                            style={{
                              width:
                                totalReviews > 0
                                  ? `${((reviewDistribution[stars] ?? 0) / totalReviews) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>
                        <span className="w-8 text-right text-sm text-gray-500">
                          {reviewDistribution[stars]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review List */}
                {reviewsList.length > 0 ? (
                  <div className="space-y-4">
                    {reviewsList.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {review.user?.name || "Usuario"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString(
                                "es-AR"
                              )}
                            </p>
                          </div>
                          <div className="ml-auto flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < review.rating
                                    ? "fill-orange-400 text-orange-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="pl-11 text-sm text-gray-700">
                          {review.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">
                    No hay reseñas todavía.
                  </p>
                )}

                {/* Write Review */}
                {canReviewData?.canReview && !showReviewForm && (
                  <div className="pt-2 text-center">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Escribir una Reseña
                    </Button>
                  </div>
                )}

                {showReviewForm && (
                  <div className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-gray-900">Tu reseña</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Calificación:
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewRating(star)}
                          >
                            <Star
                              className={`h-6 w-6 cursor-pointer ${
                                star <= reviewRating
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                      placeholder="Escribe tu opinión sobre este producto..."
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSubmitReview}
                        disabled={createReview.isPending}
                      >
                        {createReview.isPending
                          ? "Enviando..."
                          : "Enviar Reseña"}
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => {
                          setShowReviewForm(false);
                          setReviewMessage("");
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                {!canReviewData?.canReview &&
                  reviewsList.length === 0 &&
                  isAuthenticated && (
                    <p className="text-center text-sm text-gray-500">
                      Compra este producto para dejar una reseña.
                    </p>
                  )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Productos Relacionados
            </h2>
            <Link
              href="/products/catalog/products"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Ver Todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {relatedProductsData?.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                {...mapProductToCardProps(relatedProduct)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
