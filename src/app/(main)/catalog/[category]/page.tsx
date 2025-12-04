"use client";

import { ChevronDown, Grid3x3, List, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";
import { ProductCard } from "@/components/home/product-card";
import { features } from "@/seeds";

const categoryConfig: Record<string, { title: string; breadcrumb: string }> = {
  laptops: { title: "Laptops", breadcrumb: "Laptops" },
  "desktop-pcs": {
    title: "PCs de Escritorio",
    breadcrumb: "PCs de Escritorio",
  },
  networking: {
    title: "Dispositivos de Red",
    breadcrumb: "Dispositivos de Red",
  },
  printers: {
    title: "Impresoras y Escáneres",
    breadcrumb: "Impresoras y Escáneres",
  },
  "pc-parts": { title: "Partes de PC", breadcrumb: "Partes de PC" },
  products: {
    title: "Todos los demás productos",
    breadcrumb: "Todos los demás productos",
  },
  repairs: { title: "Reparaciones", breadcrumb: "Reparaciones" },
  "all-products": {
    title: "Todos los Productos",
    breadcrumb: "Todos los Productos",
  },
  "new-products": { title: "Nuevos Productos", breadcrumb: "Nuevos Productos" },
  "custom-builds": { title: "Personalizados", breadcrumb: "Personalizados" },
  "msi-laptops": { title: "Laptops MSI", breadcrumb: "Laptops MSI" },
  desktops: { title: "Escritorios", breadcrumb: "Escritorios" },
  monitors: { title: "Monitores Gaming", breadcrumb: "Monitores Gaming" },
};

const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  sku: `14U-${i + 1}GR564`,
  name: `MSI MEG Trident X 10SD-1012AU Intel i7-10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty`,
  price: 4349.0,
  originalPrice: i % 3 === 0 ? 4999.0 : undefined,
  rating: 4 + (i % 2),
  reviews: Math.floor(Math.random() * 10) + 1,
  image:
    i % 5 === 0
      ? "/gaming-laptop-with-rgb-keyboard.jpg"
      : i % 5 === 1
        ? "/msi-desktop-front.jpg"
        : i % 5 === 2
          ? "/msi-laptop.jpg"
          : i % 5 === 3
            ? "/msi-gaming-pc.jpg"
            : "/msi-monitor.jpg",
  inStock: i % 5 !== 0,
  specs: {
    cpu: "N/A",
    featured: "N/A",
    ports: "N/A",
  },
}));

interface PageProps {
  params: { category: string };
}

export default function CatalogPage({ params }: PageProps) {
  const category = params.category;
  const config = categoryConfig[category] || {
    title: "Productos",
    breadcrumb: "Productos",
  };

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("position");
  const [perPage, setPerPage] = useState(31);

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    brands: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearFilter = (type: string, value: string) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    } else if (type === "price") {
      setPriceRange((prev) => prev.filter((p) => p !== value));
    } else if (type === "color") {
      setSelectedColors((prev) => prev.filter((c) => c !== value));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([]);
    setSelectedColors([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="relative h-24 w-full overflow-hidden rounded-lg">
            <Image
              src="/asus-tuf-gaming-banner-with-yellow-and-black-gamin.jpg"
              alt="ASUS TUF Gaming Banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-gray-900">{config.breadcrumb}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="flex-shrink-0 lg:w-64">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Limpiar Filtros
                </Button>
              </div>

              {/* Category Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("category")}
                  className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
                >
                  Categoría
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.category ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.category && (
                  <div className="space-y-2">
                    {["CUSTOM PCS", "MSI All-In-One PCS", "HP/COMPAQ PCS"].map(
                      (cat) => (
                        <label
                          key={cat}
                          className="flex cursor-pointer items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  cat,
                                ]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter((c) => c !== cat)
                                );
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                          />
                          <span className="text-gray-700">{cat}</span>
                          <span className="ml-auto text-xs text-gray-500">
                            {cat === "CUSTOM PCS"
                              ? 15
                              : cat === "MSI All-In-One PCS"
                                ? 45
                                : 1}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("price")}
                  className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
                >
                  Precio
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.price && (
                  <div className="space-y-2">
                    {[
                      {
                        label: "$0.00 - $1,000.00",
                        value: "0-1000",
                        count: 19,
                      },
                      {
                        label: "$1,000.00 - $2,000.00",
                        value: "1000-2000",
                        count: 21,
                      },
                      {
                        label: "$2,000.00 - $3,000.00",
                        value: "2000-3000",
                        count: 9,
                      },
                      {
                        label: "$3,000.00 - $4,000.00",
                        value: "3000-4000",
                        count: 6,
                      },
                      {
                        label: "$4,000.00 - $5,000.00",
                        value: "4000-5000",
                        count: 3,
                      },
                      {
                        label: "$5,000.00 - $6,000.00",
                        value: "5000-6000",
                        count: 1,
                      },
                      {
                        label: "$6,000.00 - $7,000.00",
                        value: "6000-7000",
                        count: 1,
                      },
                      { label: "$7,000.00 y más", value: "7000+", count: 1 },
                    ].map((range) => (
                      <label
                        key={range.value}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={priceRange.includes(range.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPriceRange([...priceRange, range.value]);
                            } else {
                              setPriceRange(
                                priceRange.filter((p) => p !== range.value)
                              );
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <span className="text-gray-700">{range.label}</span>
                        <span className="ml-auto text-xs text-gray-500">
                          {range.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("color")}
                  className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
                >
                  Color
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.color ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.color && (
                  <div className="flex flex-wrap gap-2">
                    {["black", "blue"].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          if (selectedColors.includes(color)) {
                            setSelectedColors(
                              selectedColors.filter((c) => c !== color)
                            );
                          } else {
                            setSelectedColors([...selectedColors, color]);
                          }
                        }}
                        className={`h-8 w-8 rounded-full border-2 ${
                          selectedColors.includes(color)
                            ? "border-blue-600 ring-2 ring-blue-200"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Name */}
              <div className="pb-4">
                <button className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-900">
                  Nombre del Filtro
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Brands */}
              <div className="pb-4">
                <button
                  onClick={() => toggleSection("brands")}
                  className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
                >
                  Marcas
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedSections.brands ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSections.brands && (
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 bg-transparent text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Todas las Marcas
                  </Button>
                )}
              </div>

              {/* Brand Logos */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { src: "/msi-logo.jpg", alt: "MSI" },
                  { src: "/razer-logo.png", alt: "Razer" },
                  { src: "/hp-logo-abstract.png", alt: "HP" },
                  { src: "/asus-logo.jpg", alt: "ASUS" },
                  { src: "/intel-logo.png", alt: "Intel" },
                  { src: "/gigabyte-logo.jpg", alt: "Gigabyte" },
                ].map((brand, i) => (
                  <div
                    key={i}
                    className="flex aspect-square cursor-pointer items-center justify-center rounded border border-gray-200 bg-white p-2 transition-colors hover:border-blue-500"
                  >
                    <Image
                      src={brand.src || "/placeholder.svg"}
                      alt={brand.alt}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Apply Filters Button */}
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Aplicar Filtros (2)
              </Button>

              {/* Compare Products & Wishlist */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="text-sm font-semibold text-gray-900">
                  Comparar Productos
                </div>
                <p className="text-xs text-gray-600">
                  No tienes artículos para comparar.
                </p>

                <div className="pt-3 text-sm font-semibold text-gray-900">
                  Mi Lista de Deseos
                </div>
                <p className="text-xs text-gray-600">
                  No tienes artículos en tu lista de deseos.
                </p>
              </div>

              {/* Sidebar Banner */}
              <div className="mt-6">
                <Image
                  src="/gaming-chair-promotional-banner.jpg"
                  alt="Banner"
                  width={220}
                  height={400}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Title and Back Button */}
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {config.title} ({mockProducts.length})
              </h1>
              <Link
                href="/"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                ← Volver
              </Link>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 ||
              priceRange.length > 0 ||
              selectedColors.length > 0) && (
              <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
                <span className="text-sm text-gray-600">
                  Artículos 1-20 de 20
                </span>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs text-white"
                  >
                    {cat}
                    <button
                      onClick={() => clearFilter("category", cat)}
                      className="hover:text-gray-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedColors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs text-white"
                  >
                    {color}
                    <button
                      onClick={() => clearFilter("color", color)}
                      className="hover:text-gray-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 underline hover:text-blue-700"
                >
                  Limpiar Todo
                </button>
              </div>
            )}

            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="position">Posición</option>
                    <option value="name">Nombre</option>
                    <option value="price">Precio</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Mostrar:</span>
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value={31}>31 por página</option>
                    <option value={50}>50 por página</option>
                    <option value={100}>100 por página</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "border-gray-300"
                  }
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "border-gray-300"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {mockProducts.slice(0, perPage).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="mb-8 space-y-4">
                {mockProducts.slice(0, perPage).map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <div className="relative h-32 w-32 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="rounded object-cover"
                      />
                      {product.inStock && (
                        <div className="absolute top-2 right-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                          En stock
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="mb-1 text-xs text-gray-500">
                        {product.sku}
                      </p>
                      <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>

                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < product.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          Reseñas ({product.reviews})
                        </span>
                      </div>

                      <div className="mb-3 grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">CPU:</span>
                          <span className="ml-1 text-gray-900">
                            {product.specs.cpu}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Destacado:</span>
                          <span className="ml-1 text-gray-900">
                            {product.specs.featured}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Puertos I/O:</span>
                          <span className="ml-1 text-gray-900">
                            {product.specs.ports}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          {product.originalPrice && (
                            <span className="mr-2 text-sm text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            <ShoppingCart className="mr-1 h-4 w-4" />
                            Agregar al Carrito
                          </Button>
                          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-50">
                            <svg
                              className="h-4 w-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                              />
                            </svg>
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-50">
                            <svg
                              className="h-4 w-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="h-8 w-8 rounded-full bg-transparent p-0"
              >
                ←
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-8 w-8 rounded-full bg-gray-900 p-0"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full bg-transparent p-0"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full bg-transparent p-0"
              >
                ...
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full bg-transparent p-0"
              >
                35
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full bg-transparent p-0"
              >
                →
              </Button>
            </div>

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
              <Button
                variant="link"
                className="h-auto p-0 text-blue-600 hover:text-blue-700"
              >
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
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
