"use client";

import { Heart, BarChart3, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  images?: string[];
  badge?: string;
  inStock?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  images,
  badge,
  inStock = true,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageArray = images || [image, image, image];

  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered, imageArray.length]);

  return (
    <div
      className="group relative overflow-visible rounded-lg border border-gray-200 bg-white transition-all duration-300"
      style={{
        transformOrigin: "top center",
        transform: isHovered
          ? "translateY(-35px) scale(1.06)"
          : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 25px 50px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(0, 102, 255, 0.15)"
          : "0 1px 3px rgba(0, 0, 0, 0.1)",
        zIndex: isHovered ? 20 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {badge && (
        <Badge className="gradient-accent absolute top-3 left-3 z-10 border-0 text-xs font-bold text-white">
          {badge}
        </Badge>
      )}

      {/* Stock Status */}
      {inStock && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs text-green-600">
          <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
          <span className="font-medium">En Stock</span>
        </div>
      )}

      {/* Hover Actions */}
      <div
        className={`absolute top-12 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
          isHovered
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md hover:bg-blue-600 hover:text-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md hover:bg-blue-600 hover:text-white"
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Image */}
      <Link href={`/products/${id}`} className="block bg-gray-50">
        <div
          className={`relative aspect-square transition-all duration-300 ${isHovered ? "p-3" : "p-6"}`}
        >
          <Image
            src={imageArray[currentImageIndex] || "/placeholder.svg"}
            alt={name}
            fill
            className="object-contain transition-opacity duration-500"
            key={currentImageIndex}
          />
        </div>
      </Link>

      {isHovered && imageArray.length > 1 && (
        <div className="absolute bottom-[135px] left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {imageArray.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "w-4 bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Product Info */}
      <div
        className={`transition-all duration-300 ${isHovered ? "p-2.5" : "p-4"}`}
      >
        {/* Rating */}
        <div className="mb-2 flex items-center gap-2">
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
          <span className="text-xs text-gray-500">Reseñas ({reviews})</span>
        </div>

        {/* Product Name */}
        <Link href={`/products/${id}`}>
          <h3
            className={`line-clamp-2 text-sm leading-snug font-medium text-gray-900 transition-all hover:text-blue-600 ${isHovered ? "mb-2" : "mb-3"}`}
          >
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${isHovered ? "mb-1.5" : "mb-3"}`}
        >
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="relative h-0">
          <Button
            className={`w-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
