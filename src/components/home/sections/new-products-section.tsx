"use client";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";
import { ProductCard } from "../product-card";

export function NewProductsSection() {
  const { data, isLoading } = useProducts({ limit: 12 });

  if (isLoading) {
    return (
      <section className="border-b border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const products = data?.items || [];

  return (
    <section className="border-b border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Nuevos Productos</h2>
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-700"
          >
            Ver Todos los Nuevos Productos →
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...mapProductToCardProps(product)} />
          ))}
        </div>
      </div>
    </section>
  );
}
