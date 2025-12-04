"use client";

import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Grid3x3,
  List,
  Heart,
  BarChart3,
  Eye,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProductCard } from "@/components/home/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock product data
const allProducts = Array.from({ length: 20 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
  price: 499.0,
  originalPrice: i % 3 === 0 ? 599.0 : undefined,
  rating: 4,
  reviews: Math.floor(Math.random() * 50) + 1,
  image: `/msi-laptop.jpg`,
  images: [
    "/msi-laptop.jpg",
    "/msi-desktop-front.jpg",
    "/msi-desktop-side.jpg",
  ],
  badge: ["CHARLIE V6", "BRAVO V6", "ALPHA V6", "ZULU V6", "DELTA V6"][i % 5],
  inStock: true,
  category:
    i < 16 ? "CUSTOM PCS" : i < 20 ? "MSI ALL-IN-ONE PCS" : "HP/COMPAQ PCS",
  cpu: "Intel i7 ASUS5-265AU 7.0GHz 4K HDR Thin Bezel Intel 10th Gen i7 1087lat - RTX 2070 SUPER MAX Q 8GB - 16GB RAM - 1TB SSD NAME",
  featured: "N/A",
  ports: "N/A",
}));

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "CUSTOM PCS",
    "HP/COMPAQ PCS",
  ]);
  const [sortBy, setSortBy] = useState("Position");
  const [perPage, setPerPage] = useState(35);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    filterName: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const filteredProducts = allProducts.filter((product) =>
    activeFilters.length === 0 ? true : activeFilters.includes(product.category)
  );

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + perPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ASUS Banner */}
      <div className="w-full">
        <img
          src="/images/attachments-image-attachments-blob-asus-banner-mock.jpg"
          alt="ASUS TUF GAMING FX505"
          className="h-auto w-full"
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder.svg?height=200&width=1200&text=ASUS+TUF+GAMING+FX505";
          }}
        />
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-blue-600">
            Laptops
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-blue-600">
            Portátiles de Uso Diario
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Serie MSI PS</span>
        </nav>

        {/* Page Title */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          MSI PS Series (20)
        </h1>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-60 flex-shrink-0 space-y-6">
            {/* Filters Header */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Filtros</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-blue-600 hover:text-blue-700"
                >
                  Limpiar Filtros
                </Button>
              </div>

              {/* Category */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("category")}
                  className="mb-3 flex w-full items-center justify-between text-left font-semibold text-gray-900"
                >
                  Categoría
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.category ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.category && (
                  <div className="space-y-2 text-sm">
                    <label className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-gray-700">CUSTOM PCS</span>
                      </div>
                      <span className="text-gray-500">(16)</span>
                    </label>
                    <label className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-gray-700">
                          MSI ALL-IN-ONE PCS
                        </span>
                      </div>
                      <span className="text-gray-500">(45)</span>
                    </label>
                    <label className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-gray-700">HP/COMPAQ PCS</span>
                      </div>
                      <span className="text-gray-500">(1)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("price")}
                  className="mb-3 flex w-full items-center justify-between text-left font-semibold text-gray-900"
                >
                  Precio
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.price && (
                  <div className="space-y-2 text-sm">
                    {[
                      ["$0.00 - $1000.00", 19],
                      ["$1000.00 - $2000.00", 21],
                      ["$2000.00 - $3000.00", 9],
                      ["$3000.00 - $4000.00", 4],
                      ["$4000.00 - $5000.00", 3],
                      ["$5000.00 - $6000.00", 1],
                      ["$6000.00 - $7000.00", 1],
                      ["$7000.00 y Más", 0],
                    ].map(([range, count]) => (
                      <label
                        key={range as string}
                        className="flex cursor-pointer items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="text-gray-700">{range}</span>
                        </div>
                        <span className="text-gray-500">({count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("color")}
                  className="mb-3 flex w-full items-center justify-between text-left font-semibold text-gray-900"
                >
                  Color
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.color ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.color && (
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-2">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-black" />
                      <span className="text-sm text-gray-700">Negro</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Filter Name */}
              <div className="pb-4">
                <button
                  onClick={() => toggleSection("filterName")}
                  className="mb-3 flex w-full items-center justify-between text-left font-semibold text-gray-900"
                >
                  Nombre del Filtro
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.filterName ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.filterName && (
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Aplicar Filtros (2)
                  </Button>
                )}
              </div>
            </div>

            {/* Brands */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-4 font-bold text-gray-900">Marcas</h3>
              <Button variant="outline" className="mb-4 w-full bg-transparent">
                Todas las Marcas
              </Button>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    name: "ASUS",
                    logo: "/placeholder.svg?height=40&width=80&text=ASUS",
                  },
                  {
                    name: "MSI",
                    logo: "/placeholder.svg?height=40&width=80&text=MSI",
                  },
                  {
                    name: "TT",
                    logo: "/placeholder.svg?height=40&width=80&text=TT",
                  },
                  {
                    name: "ADATA",
                    logo: "/placeholder.svg?height=40&width=80&text=ADATA",
                  },
                  {
                    name: "HP",
                    logo: "/placeholder.svg?height=40&width=80&text=HP",
                  },
                  {
                    name: "GIGABYTE",
                    logo: "/placeholder.svg?height=40&width=80&text=GIGABYTE",
                  },
                ].map((brand) => (
                  <button
                    key={brand.name}
                    className="rounded-lg border border-gray-200 p-2 transition-colors hover:border-blue-600"
                  >
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      className="h-8 w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Compare Products */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-2 font-bold text-gray-900">
                Comparar Productos
              </h3>
              <p className="text-sm text-gray-600">
                No tienes artículos para comparar.
              </p>
            </div>

            {/* My Wish List */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-2 font-bold text-gray-900">
                Mi Lista de Deseos
              </h3>
              <p className="text-sm text-gray-600">
                No tienes artículos en tu lista de deseos.
              </p>
            </div>

            {/* Ad Banner */}
            <div className="overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=400&width=240&text=Gaming+Chair+Ad"
                alt="Gaming Chair"
                className="h-auto w-full"
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver
                  </Button>
                  <span className="text-sm text-gray-600">
                    Artículos 1-20 de 86
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort By */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded border border-gray-300 px-3 py-1 text-sm"
                    >
                      <option>Posición</option>
                      <option>Precio: Menor a Mayor</option>
                      <option>Precio: Mayor a Menor</option>
                      <option>Nombre: A-Z</option>
                      <option>Nombre: Z-A</option>
                    </select>
                  </div>

                  {/* Per Page */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Mostrar:</span>
                    <select
                      value={perPage}
                      onChange={(e) => setPerPage(Number(e.target.value))}
                      className="rounded border border-gray-300 px-3 py-1 text-sm"
                    >
                      <option value={12}>12 por página</option>
                      <option value={24}>24 por página</option>
                      <option value={35}>35 por página</option>
                      <option value={50}>50 por página</option>
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center gap-1 rounded border border-gray-300">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4">
                  {activeFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant="secondary"
                      className="flex items-center gap-2 bg-orange-100 px-3 py-1 text-orange-700 hover:bg-orange-200"
                    >
                      {filter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="hover:text-orange-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-auto p-0 text-blue-600 hover:text-blue-700"
                  >
                    Limpiar Todo
                  </Button>
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-3 lg:grid-cols-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 w-48 flex-shrink-0 rounded bg-gray-50">
                      {product.badge && (
                        <Badge className="gradient-accent absolute top-2 left-2 z-10 border-0 text-xs text-white">
                          {product.badge}
                        </Badge>
                      )}
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-xs text-gray-500 uppercase">
                            {product.badge}
                          </span>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Rating */}
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-orange-400 text-orange-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              Reseñas ({product.reviews})
                            </span>
                          </div>

                          {/* Specifications Table */}
                          <div className="space-y-1 text-xs">
                            <div className="flex">
                              <span className="w-20 font-medium text-gray-600">
                                CPU
                              </span>
                              <span className="text-gray-900">
                                {product.cpu}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="w-20 font-medium text-gray-600">
                                Destacado
                              </span>
                              <span className="text-gray-900">
                                {product.featured}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="w-20 font-medium text-gray-600">
                                Puertos I/O
                              </span>
                              <span className="text-gray-900">
                                {product.ports}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Stock Status */}
                        {product.inStock && (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                            <span>En Stock</span>
                          </div>
                        )}
                      </div>

                      {/* Price and Actions */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Agregar al Carrito
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 bg-transparent"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 bg-transparent"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={
                    currentPage === i + 1 ? "bg-blue-600 hover:bg-blue-700" : ""
                  }
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Product Description */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                MSI ha revelado lo mejor de las increíbles características que
                han encontrado en portátiles gaming. Las notebooks de la Serie
                Prestige son perfectas tanto para entusiastas de los juegos.
                Cargadas de elogios de la crítica, estas PCs transmiten el
                máximo conocimiento gaming, mientras que las noticias gaming no
                hacen ningún compromiso cuando se trata de rendimiento.
              </p>
              <Button
                variant="ghost"
                className="p-0 text-blue-600 hover:text-blue-700"
              >
                Más
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900">
              Soporte del Producto
            </h3>
            <p className="text-sm text-gray-600">
              Hasta 3 años de garantía en sitio disponible para tu tranquilidad.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900">Cuenta Personal</h3>
            <p className="text-sm text-gray-600">
              Con grandes descuentos, envío gratuito y un especialista de
              soporte dedicado.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900">Ahorros Increíbles</h3>
            <p className="text-sm text-gray-600">
              Hasta 70% de descuento en Productos nuevos, puedes estar seguro
              del mejor precio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
