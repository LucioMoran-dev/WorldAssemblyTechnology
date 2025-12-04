"use client";

import {
  ShoppingCart,
  Heart,
  BarChart3,
  Truck,
  Shield,
  RefreshCw,
  Star,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { ProductCard } from "@/components/home/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { relatedProducts } from "@/seeds";

// Mock product data - in a real app, this would come from an API
const getProductData = (id: string) => ({
  id,
  name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
  price: 499.0,
  originalPrice: 599.0,
  rating: 4.5,
  reviews: 42,
  inStock: true,
  stockCount: 15,
  sku: "MSI-PRO16-036AU",
  brand: "MSI",
  badge: "INTEL i5",
  images: [
    "/msi-desktop-front.jpg",
    "/msi-desktop-side.jpg",
    "/msi-desktop-back.jpg",
    "/msi-desktop-detail.jpg",
  ],
  description:
    "El MSI Pro 16 Flex es una potente estación de trabajo todo en uno diseñada para profesionales y entusiastas. Con su pantalla táctil de 15.6 pulgadas y procesador Intel Core i5, ofrece un rendimiento excepcional para multitarea, diseño gráfico y productividad general.",
  features: [
    "Procesador Intel Core i5 de 11ª generación",
    "16GB RAM DDR4",
    "512GB SSD NVMe",
    "Pantalla táctil Full HD de 15.6 pulgadas",
    "Gráficos Intel Iris Xe integrados",
    "Windows 11 Pro",
  ],
  specifications: {
    Procesador: "Intel Core i5-1135G7",
    Memoria: "16GB DDR4 3200MHz",
    Almacenamiento: "512GB NVMe SSD",
    Pantalla: '15.6" Full HD (1920x1080) Táctil',
    Gráficos: "Intel Iris Xe Graphics",
    "Sistema Operativo": "Windows 11 Pro",
    Conectividad: "WiFi 6, Bluetooth 5.1",
    Puertos: "4x USB 3.2, 2x USB-C, HDMI, Audio Jack",
    Dimensiones: "380 x 260 x 45 mm",
    Peso: "4.2 kg",
  },
});

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductData(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockCount) setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Product Detail Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
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

            {/* Thumbnail Images */}
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

              {/* Rating */}
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

              {/* SKU and Brand */}
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

              {/* Stock Status */}
              {product.inStock ? (
                <div className="mb-6 flex items-center gap-2 text-green-600">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  <span className="font-medium">
                    En Stock ({product.stockCount} disponibles)
                  </span>
                </div>
              ) : (
                <div className="mb-6 flex items-center gap-2 text-red-600">
                  <div className="h-2 w-2 rounded-full bg-red-600" />
                  <span className="font-medium">Agotado</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <Badge className="border-0 bg-red-100 text-red-700">
                    Ahorra ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

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

              <div className="flex gap-3">
                <Button className="h-12 flex-1 bg-blue-600 text-base text-white hover:bg-blue-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al Carrito
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-gray-300 bg-transparent"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-gray-300 bg-transparent"
                >
                  <BarChart3 className="h-5 w-5" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="h-12 w-full border-gray-300 bg-transparent"
              >
                Comprar Ahora
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
                    <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
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
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-200 pb-3">
                    <span className="w-1/2 font-medium text-gray-900">
                      {key}:
                    </span>
                    <span className="w-1/2 text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
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
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-8 text-center text-gray-600">
                  <p>No hay reseñas todavía. ¡Sé el primero en dejar una!</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Escribir una Reseña
                  </Button>
                </div>
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
              href="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Ver Todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
