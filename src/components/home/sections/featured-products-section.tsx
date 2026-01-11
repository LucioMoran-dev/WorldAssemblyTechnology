"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { ProductCard } from "../product-card";

export function FeaturedProductsSection() {
  const { data, isLoading } = useFeaturedProducts(20);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  if (isLoading) {
    return (
      <section className="border-b border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Productos Destacados
            </h2>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-hidden py-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 w-64 flex-shrink-0 animate-pulse rounded-lg bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Productos Destacados
          </h2>
          <Link href="/products/catalog/featured">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700"
            >
              Ver Todos →
            </Button>
          </Link>
        </div>

        <div className="relative">
          {/* Botón de scroll izquierdo */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
          )}

          {/* Contenedor del carrusel */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth py-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {data.map((product) => (
              <div key={product.id} className="w-64 flex-shrink-0">
                <ProductCard {...mapProductToCardProps(product)} />
              </div>
            ))}
          </div>

          {/* Botón de scroll derecho */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
