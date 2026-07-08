"use client";

import { Grid3x3, List, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState, Suspense } from "react";

import { FiltersSidebar } from "@/components/filters/filters-sidebar";
import { Pagination } from "@/components/filters/pagination";
import { ProductCard } from "@/components/home/product-card-home";
import { Button } from "@/components/ui/button";
import { useProducts, useCategories, useFilters } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";
import { features } from "@/seeds";
import type { IReviews } from "@/types";

interface PageProps {
  params: Promise<{ brand: string }>;
}

const getAverageRating = (reviews?: IReviews[]): number => {
  if (!reviews?.length) return 0;
  const sum = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
  return Math.round(sum / reviews.length);
};

function CatalogBrandContent({ brandSlug }: { brandSlug: string }) {
  const { filters, page, limit, setFilter, setFilters, setPage, clearAllFilters, activeFilterCount } = useFilters({
    defaults: {
      name: "", categoryId: "", color: "", minPrice: "", maxPrice: "",
      ram: "", storage: "", processor: "", vram: "",
      screen_size: "", resolution: "", refresh_rate: "",
      connectivity: "", condition: "",
      inStock: "", discounted: "", featured: "",
    },
    defaultLimit: 24,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Resolve selected categoryId to slug for conditional spec filters
  const { data: categoriesData } = useCategories({ limit: 100 });
  const selectedCategory = categoriesData?.items?.find((c) => c.id === filters.categoryId);
  const resolvedCategorySlug = selectedCategory
    ? (selectedCategory.category_name ?? selectedCategory.name ?? "").toLowerCase().replace(/\s+/g, "-")
    : undefined;

  // Server-side products query: brand from URL + additional filters
  const { data: productsData, isLoading } = useProducts({
    page,
    limit,
    brand: brandSlug,
    categoryId: filters.categoryId || undefined,
    name: filters.name || undefined,
    color: filters.color || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    // Variant filters
    ram: filters.ram || undefined,
    storage: filters.storage || undefined,
    processor: filters.processor || undefined,
    vram: filters.vram || undefined,
    screen_size: filters.screen_size || undefined,
    resolution: filters.resolution || undefined,
    refresh_rate: filters.refresh_rate || undefined,
    connectivity: filters.connectivity || undefined,
    condition: filters.condition || undefined,
    // Boolean filters
    inStock: filters.inStock === "true" ? true : undefined,
    discounted: filters.discounted === "true" ? true : undefined,
    featured: filters.featured === "true" ? true : undefined,
  });

  const products = productsData?.items ?? [];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="relative h-50 w-full overflow-hidden rounded-lg">
            <Image
              src="/adobeStock_769630229.jpeg"
              alt="ASUS TUF Gaming Banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
          <FiltersSidebar
            filters={filters}
            setFilter={setFilter}
            setFilters={setFilters}
            clearAllFilters={clearAllFilters}
            activeFilterCount={activeFilterCount}
            showBrands={false}
            categorySlug={resolvedCategorySlug}
          />

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Productos de Marca: {brandSlug} ({productsData?.total ?? 0} productos)
              </h1>
              <Link href="/" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                ← Volver
              </Link>
            </div>

            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-sm text-gray-600">
                Mostrando {products.length} de {productsData?.total ?? 0} productos
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-gray-900 hover:bg-gray-800" : "border-gray-300"}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gray-900 hover:bg-gray-800" : "border-gray-300"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-100" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} {...mapProductToCardProps(product)} />
                    ))}
                  </div>
                ) : (
                  <div className="mb-8 space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                        <div className="relative h-32 w-32 flex-shrink-0">
                          <Image
                            src={product.imgUrls?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="rounded object-cover"
                          />
                          {product.isActive && (
                            <div className="absolute top-2 right-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                              En stock
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h3>
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`h-4 w-4 ${i < getAverageRating(product.reviews) ? "fill-current text-yellow-400" : "text-gray-300"}`} viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">Reseñas ({product.reviews?.length || 0})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">${product.basePrice.toFixed(2)}</span>
                            <Button variant="outline" size="sm" className="border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white">
                              <ShoppingCart className="mr-1 h-4 w-4" />
                              Agregar al Carrito
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Pagination
                  variant="catalog"
                  page={page}
                  pages={productsData?.pages ?? 1}
                  total={productsData?.total ?? 0}
                  itemsShown={products.length}
                  onPageChange={setPage}
                  itemLabel="productos"
                  isLoading={isLoading}
                />
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">No se encontraron productos</p>
                {activeFilterCount > 0 && (
                  <Button variant="link" onClick={clearAllFilters} className="mt-2 text-blue-600">
                    Limpiar filtros
                  </Button>
                )}
              </div>
            )}

            {/* Product Description */}
            <div className="mt-12 text-sm leading-relaxed text-gray-600">
              <p className="mb-4">
                MSI ha revelado la nueva faceta de su insignia Serie Prestige,
                Trident y otras series, presentando las últimas y más poderosas
                notebooks gaming. Diseñadas para la exactitud creativa y el
                máximo rendimiento de juegos, estas PCs Prestige Series
                aprovechan True Pixel Technologies, que ofrecen pantallas de
                alto nivel calibradas para su perfil para una precisión de color
                increíble.
              </p>
              <p className="mb-4">
                Consulte diferentes perfiles gráficos a través de Gamut Display
                and Creator Center para tareas creativas, incluyendo edición de
                video, edición de imágenes fotográficas y diseño, dejando
                espacio libre para tareas cotidianas, incluido el escritorio
                básico, navegación web, reproducción de video y programas de
                oficina, y dejando suficiente potencia gráfica para el modo
                Juego más tarde: todo lo que puede hacer con la notebook más
                colorida del mundo.
              </p>
              <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-700">
                Más
              </Button>
            </div>
          </main>
        </div>

        {/* Features Section */}
        <section className="mt-12 border-t border-gray-200 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function CatalogPage({ params }: PageProps) {
  const { brand } = use(params);

  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando productos…</p>
      </div>
    }>
      <CatalogBrandContent brandSlug={brand} />
    </Suspense>
  );
}
