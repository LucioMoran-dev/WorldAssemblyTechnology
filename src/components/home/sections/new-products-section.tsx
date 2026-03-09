"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { ProductCarousel } from "../product-carousel";

export function NewProductsSection() {
  const { data, isLoading } = useProducts({ limit: 12 });

  if (isLoading) {
    return (
      <section className="border-border bg-card border-b py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="bg-muted h-8 w-48 animate-pulse rounded" />
            <div className="bg-muted h-6 w-64 animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-muted h-64 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const products = data?.items || [];
  const mappedProducts = products.map((product) =>
    mapProductToCardProps(product)
  );

  return (
    <section
      className="border-border bg-card border-b py-12 pt-24"
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-bold">
            Nuevos Productos
          </h2>
          <Link href="/products/catalog/products">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700"
            >
              Ver Todos los Nuevos Productos destacados
            </Button>
          </Link>
        </div>

        <ProductCarousel products={mappedProducts} sectionId="new-products" />
      </div>
    </section>
  );
}
