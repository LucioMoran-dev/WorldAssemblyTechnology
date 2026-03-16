"use client";

import { Heart, BarChart3, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useAddToCart,
  useCheckWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
  useAuth,
} from "@/hooks";
import type { IProductCardProps } from "@/types";
import { productLogger, wishlistLogger } from "@/utils/logger";

export function ProductCard({
  id,
  name,
  description,
  brand,
  model,
  category,
  basePrice,
  originalPrice,
  rating,
  reviews,
  image,
  images,
  imgUrls,
  badge,
  inStock = true,
}: IProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addToCart = useAddToCart();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  // Wishlist hooks
  const { data: wishlistCheck } = useCheckWishlist(id);
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isInWishlist = wishlistCheck?.isInWishlist || false;

  const imageArray =
    imgUrls?.length && imgUrls.length > 0
      ? imgUrls
      : images?.length && images.length > 0
        ? images
        : image
          ? [image]
          : ["/placeholder.svg"];
  const hasDiscountBadge = Boolean(originalPrice && originalPrice > basePrice);
  const hasTopBadge = Boolean(hasDiscountBadge || badge);
  const discountPercent =
    typeof originalPrice === "number" && originalPrice > basePrice
      ? Math.round(((originalPrice - basePrice) / originalPrice) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita que el Link se active
    e.stopPropagation(); // Evita que el evento suba al contenedor

    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar el producto a el carrito");
      return;
    }

    if (!inStock) {
      toast.error("Producto fuera de stock");
      return;
    }
    productLogger.debug("Agregando producto al carrito", { id });

    addToCart.mutate(
      {
        productId: id, // Asegúrate de que este 'id' sea el string de Mongo/Postgres
        quantity: 1,
      },
      {
        onSuccess: () => {
          productLogger.info("Producto añadido al carrito", { id });
        },
        onError: (error) => {
          productLogger.info("Error al añadir al carrito", error);
          productLogger.error("Error al añadir producto al carrito", error);
        },
      }
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar a favoritos");
      return;
    }

    // Los toasts ya se muestran en los hooks, solo registramos en el logger
    if (isInWishlist) {
      removeFromWishlist.mutate(id, {
        onSuccess: () => {
          wishlistLogger.info("Producto removido de favoritos", { id });
        },
        onError: (error) => {
          wishlistLogger.error("Error al remover de favoritos", error);
        },
      });
    } else {
      addToWishlist.mutate(
        { productId: id },
        {
          onSuccess: () => {
            wishlistLogger.info("Producto agregado a favoritos", { id });
          },
          onError: (error) => {
            wishlistLogger.error("Error al agregar a favoritos", error);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (!isHovered || imageArray.length <= 1) {
      setCurrentImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered, imageArray.length]);

  return (
    // Wrapper con altura fija - mantiene el espacio en el layout
    <div className="relative min-h-[340px]">
      {/* Card flotante - completamente aislada del layout */}
      <div
        className="group absolute top-0 right-0 left-0 flex flex-col rounded-xl border transition-all duration-300 ease-out"
        style={{
          backgroundColor: "white",
          borderColor: isHovered
            ? "rgba(59, 130, 246, 0.3)"
            : "rgba(229, 231, 235, 1)",
          boxShadow: isHovered
            ? "0 24px 48px -18px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(59, 130, 246, 0.45), 0 10px 24px rgba(59, 130, 246, 0.18)"
            : "0 1px 3px rgba(0, 0, 0, 0.08)",
          zIndex: isHovered ? 20 : 1, // Por debajo del CategoryCard (30) y navbar (50)
          transform: isHovered
            ? "translateY(-12px) scale(1.04)"
            : "translateY(0) scale(1)",
          minHeight: isHovered ? "450px" : "340px",
          height: isHovered ? "auto" : "340px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge tiene prioridad sobre badge normal */}
        {hasDiscountBadge ? (
          <Badge className="animate-in fade-in zoom-in absolute top-3 left-3 z-10 border-0 bg-gradient-to-r from-red-500 to-pink-500 px-2 py-0.5 text-[11px] font-bold leading-none text-white shadow-md shadow-red-500/20 duration-200">
            -{discountPercent}%
          </Badge>
        ) : badge ? (
          <Badge className="gradient-accent animate-in fade-in zoom-in absolute top-3 left-3 z-10 border-0 px-2 py-0.5 text-[11px] font-bold leading-none text-white shadow-md duration-200">
            {badge}
          </Badge>
        ) : null}

        {inStock && (
          <div
            className={`absolute left-3 z-10 flex items-center gap-1 rounded-full border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-0.5 text-[11px] text-green-600 shadow-sm ${
              hasTopBadge ? "top-11" : "top-3"
            }`}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="font-semibold">En Stock</span>
          </div>
        )}

        <div
          className={`absolute top-12 right-3 z-10 flex flex-col gap-2 transition-all duration-500 ease-out ${
            isHovered
              ? "translate-x-0 scale-100 opacity-100"
              : "pointer-events-none translate-x-8 scale-90 opacity-0"
          }`}
        >
          <Button
            size="icon"
            variant="secondary"
            className={`border bg-card/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
              isInWishlist
                ? "border-red-200 text-red-500 shadow-red-500/20 hover:border-red-300 hover:bg-red-50"
                : "border-border hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/30"
            }`}
            onClick={handleToggleWishlist}
            disabled={addToWishlist.isPending || removeFromWishlist.isPending}
          >
            <Heart
              className={`h-4 w-4 transition-all ${isInWishlist ? "scale-110 fill-current" : ""}`}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="border border-border bg-card/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/30 active:scale-95"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Image */}
        <Link
          href={`/products/${id}`}
          className="relative block rounded-t-xl bg-muted/40"
        >
          <div
            className={`relative aspect-square overflow-hidden transition-all duration-300 ${isHovered ? "p-3" : "p-4"}`}
          >
            <Image
              src={
                imageArray[currentImageIndex] ||
                "modern-office-showroom-with-computers.jpg"
              }
              alt={name}
              fill
              className="object-contain transition-opacity duration-500"
              key={currentImageIndex}
            />
          </div>

          {isHovered && imageArray.length > 1 && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {imageArray.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-4 bg-blue-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${isHovered ? "p-3" : "p-2.5"}`}
        >
          {/* Rating - Solo en hover */}
          {isHovered && (
            <div className="animate-in fade-in mb-1 flex items-center gap-2 duration-200">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Reseñas ({reviews})</span>
            </div>
          )}

          {/* Brand & Category - Solo en hover */}
          {isHovered && (brand || category) && (
            <div className="animate-in fade-in mb-1 flex items-center gap-2 text-xs duration-200">
              {brand && (
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 font-semibold text-blue-600">
                  {brand}
                </span>
              )}
              {brand && category && <span className="text-gray-300">•</span>}
              {category && (
                <span className="font-medium text-muted-foreground">{category}</span>
              )}
            </div>
          )}

          {/* Product Name */}
          <Link href={`/products/${id}`}>
            <h3
              className={`line-clamp-2 font-medium text-foreground transition-all hover:text-blue-600 ${
                isHovered
                  ? "mb-1 text-sm leading-snug"
                  : "mb-2 text-sm leading-tight"
              }`}
            >
              {name}
            </h3>
          </Link>

          {/* Description - Solo visible en hover */}
          {description && (
            <p
              className={`text-xs leading-relaxed text-muted-foreground transition-all duration-300 ${
                isHovered
                  ? "mb-1 line-clamp-2 opacity-100"
                  : "h-0 overflow-hidden opacity-0"
              }`}
            >
              {description}
            </p>
          )}

          {/* Model - Solo visible en hover */}
          {model && isHovered && (
            <div className="mb-1 text-xs text-muted-foreground">
              <span className="font-medium">Modelo:</span> {model}
            </div>
          )}

          {/* Spacer to push price and button to bottom */}
          <div className="flex-1" />

          {/* Price - Always at bottom */}
          <div
            className={`flex items-center gap-2 ${isHovered ? "mb-2" : "mb-0"}`}
          >
            {originalPrice && (
              <span className="text-sm font-medium text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span
              className={`bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text font-bold text-transparent ${
                isHovered ? "text-xl" : "text-lg"
              }`}
            >
              ${basePrice}
            </span>
          </div>

          {/* Add to Cart / Stock State */}
          {inStock ? (
            <Button
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transition-all duration-500 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 ${
                isHovered
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-4 scale-95 !opacity-0"
              }`}
              size="sm"
              onClick={handleAddToCart}
              disabled={addToCart.isPending}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {addToCart.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Agregando...
                </span>
              ) : (
                "Agregar al Carrito"
              )}
            </Button>
          ) : (
            <div
              className={`flex h-9 w-full items-center justify-center rounded-md border border-border bg-muted text-sm font-semibold text-muted-foreground transition-all duration-500 ${
                isHovered
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-4 scale-95 !opacity-0"
              }`}
            >
              Sin stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

