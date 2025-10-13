"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProductCard } from "@/components/home/product-card";

import { BrandShowcase } from "../components/home/brand-showcase";

import { Button } from "@/components/ui/button";

const newProducts = [
  {
    id: "1",
    name: "MSI Katana 15 Gaming Laptop - RTX 4070, Intel i7-13620H",
    price: 1299.0,
    originalPrice: 1499.0,
    rating: 5,
    reviews: 12,
    image: "/msi-laptop.jpg",
    inStock: true,
  },
  {
    id: "2",
    name: "MSI Cyborg 15 Gaming Laptop - RTX 4060, Intel i5-12450H",
    price: 899.0,
    originalPrice: 1099.0,
    rating: 4,
    reviews: 8,
    image: "/gaming-laptop.png",
    inStock: true,
  },
  {
    id: "3",
    name: "MSI MAG Infinite S3 Gaming Desktop - RTX 4060 Ti",
    price: 1599.0,
    originalPrice: 1799.0,
    rating: 5,
    reviews: 15,
    image: "/desktop-pc.jpg",
    inStock: true,
  },
  {
    id: "4",
    name: "MSI Thin GF63 Gaming Laptop - RTX 4050, Intel i5-12450H",
    price: 799.0,
    originalPrice: 999.0,
    rating: 4,
    reviews: 6,
    image: "/gaming-laptop-red.jpg",
    inStock: true,
  },
  {
    id: "5",
    name: "MSI Aegis RS Gaming Desktop - RTX 4070, Intel i7-13700F",
    price: 1899.0,
    originalPrice: 2199.0,
    rating: 5,
    reviews: 10,
    image: "/desktop-tower.jpg",
    inStock: true,
  },
];

const customBuilds = [
  {
    id: "6",
    name: "Custom Gaming PC - RTX 4080, AMD Ryzen 9 7900X",
    price: 2499.0,
    rating: 5,
    reviews: 20,
    image: "/custom-gaming-pc.jpg",
    badge: "CUSTOM BUILD",
    inStock: true,
  },
  {
    id: "7",
    name: "Charlie 12 Custom Build - RTX 4070 Ti, Intel i7-13700K",
    price: 2199.0,
    rating: 5,
    reviews: 14,
    image: "/gaming-pc-orange.jpg",
    badge: "CHARLIE 12",
    inStock: true,
  },
  {
    id: "8",
    name: "Bravo 15 Custom Build - RTX 4060 Ti, AMD Ryzen 7 7700X",
    price: 1799.0,
    rating: 4,
    reviews: 11,
    image: "/gaming-pc-red.jpg",
    badge: "BRAVO 15",
    inStock: true,
  },
  {
    id: "9",
    name: "Alpha 12 Custom Build - RTX 4090, Intel i9-13900K",
    price: 3499.0,
    rating: 5,
    reviews: 25,
    image: "/gaming-pc-purple.jpg",
    badge: "ALPHA 12",
    inStock: true,
  },
];

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [customBuildsTab, setCustomBuildsTab] = useState("MSI GS Series");
  const [laptopsTab, setLaptopsTab] = useState("MSI GS Series");
  const [desktopsTab, setDesktopsTab] = useState("MSI Infinite Series");
  const [monitorsTab, setMonitorsTab] = useState("All Monitors");

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <HeroBanner />
          </div>
        </section>

        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Products</h2>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700"
              >
                See All New Products →
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {newProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
              <div className="bg-gray-900 rounded-lg p-6 h-fit">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                      src="/custom-pc-build-icon.jpg"
                      alt="Custom Builds"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Custom Builds
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {customBuilds.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
              <div className="bg-gray-900 rounded-lg p-6 h-fit">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                      src="/msi-dragon-logo-red.jpg"
                      alt="MSI Laptops"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    MSI Laptops
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="flex gap-4 mb-6 border-b border-gray-300 overflow-x-auto">
                  {[
                    "MSI GS Series",
                    "MSI GT Series",
                    "MSI GL Series",
                    "MSI GE Series",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLaptopsTab(tab)}
                      className={`pb-3 px-2 text-sm font-medium whitespace-nowrap transition-colors ${
                        laptopsTab === tab
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {newProducts.map((product) => (
                    <ProductCard key={`laptop-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
              <div className="bg-gray-900 rounded-lg p-6 h-fit">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                      src="/desktop-tower.jpg"
                      alt="Desktops"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Desktops
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="flex gap-4 mb-6 border-b border-gray-300 overflow-x-auto">
                  {[
                    "MSI Infinite Series",
                    "MSI Trident",
                    "MSI GL Series",
                    "MSI Nightblade",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDesktopsTab(tab)}
                      className={`pb-3 px-2 text-sm font-medium whitespace-nowrap transition-colors ${
                        desktopsTab === tab
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {newProducts.map((product) => (
                    <ProductCard key={`desktop-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
              <div className="bg-gray-900 rounded-lg p-6 h-fit">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                      src="/msi-logo-white.jpg"
                      alt="Gaming Monitors"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Gaming Monitors
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {newProducts.map((product) => (
                    <ProductCard key={`monitor-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandShowcase />

        <section className="max-w-7xl mx-auto px-4 py-12 animate-on-scroll opacity-0">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "15K+", label: "Clientes Satisfechos" },
              { number: "98%", label: "Tasa de Satisfacción" },
              { number: "24/7", label: "Soporte Técnico" },
              { number: "500+", label: "Productos Disponibles" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-lg p-6 text-center hover-lift opacity-0 animate-scale-in stagger-${
                  index + 1
                }`}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 animate-on-scroll opacity-0">
            <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center border border-gray-200">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                <h3>
                  &quot;Mi primera orden llegó hoy en perfectas condiciones.
                  Desde que envié una pregunta sobre el producto hasta realizar
                  la compra, el envío y ahora la entrega, TechStore se mantuvo
                  en contacto. Un servicio excepcional. Espero comprar
                  nuevamente y lo recomiendo ampliamente.
                </h3>
                Mi primera orden llegó hoy en perfectas condiciones. Desde que
                envié una pregunta sobre el producto hasta realizar la compra,
                el envío y ahora la entrega, TechStore se mantuvo en contacto.
                Un servicio excepcional. Espero comprar nuevamente y lo
                recomiendo ampliamente.&quot;
              </blockquote>
              <cite className="text-sm font-semibold text-blue-600">
                — Tama Brown
              </cite>
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
              <Button
                variant="outline"
                className="mt-6 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
              >
                Déjanos tu Reseña
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Soporte de Producto",
                  description:
                    "Hasta 3 años de garantía en sitio disponible para tu tranquilidad.",
                },
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
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
                  ),
                  title: "Cuenta Personal",
                  description:
                    "Con grandes descuentos, envío gratis y un especialista de soporte dedicado.",
                },
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Ahorros Increíbles",
                  description:
                    "Hasta 70% de descuento en productos nuevos, garantizamos el mejor precio.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white border border-gray-200 rounded-lg p-8 text-center hover-lift opacity-0 animate-scale-in stagger-${
                    index + 1
                  }`}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
