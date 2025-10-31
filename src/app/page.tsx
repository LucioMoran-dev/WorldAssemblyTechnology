"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui/button";
import { newProducts, customBuilds, customer } from "@/seeds";

import { BrandShowcase } from "../components/home/brand-showcase";

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
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <HeroBanner />
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">New Products</h2>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700"
              >
                See All New Products →
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
              <div className="h-fit rounded-lg bg-gray-900 p-6">
                <div className="mb-6 text-center">
                  <div className="relative mx-auto mb-4 h-24 w-24">
                    <Image
                      src="/custom-pc-build-icon.jpg"
                      alt="Custom Builds"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Custom Builds
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {customBuilds.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
              <div className="h-fit rounded-lg bg-gray-900 p-6">
                <div className="mb-6 text-center">
                  <div className="relative mx-auto mb-4 h-24 w-24">
                    <Image
                      src="/msi-dragon-logo-red.jpg"
                      alt="MSI Laptops"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    MSI Laptops
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="mb-6 flex gap-4 overflow-x-auto border-b border-gray-300">
                  {[
                    "MSI GS Series",
                    "MSI GT Series",
                    "MSI GL Series",
                    "MSI GE Series",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLaptopsTab(tab)}
                      className={`px-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        laptopsTab === tab
                          ? "border-b-2 border-gray-900 text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {newProducts.map((product) => (
                    <ProductCard key={`laptop-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
              <div className="h-fit rounded-lg bg-gray-900 p-6">
                <div className="mb-6 text-center">
                  <div className="relative mx-auto mb-4 h-24 w-24">
                    <Image
                      src="/desktop-tower.jpg"
                      alt="Desktops"
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Desktops
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="mb-6 flex gap-4 overflow-x-auto border-b border-gray-300">
                  {[
                    "MSI Infinite Series",
                    "MSI Trident",
                    "MSI GL Series",
                    "MSI Nightblade",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDesktopsTab(tab)}
                      className={`px-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        desktopsTab === tab
                          ? "border-b-2 border-gray-900 text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {newProducts.map((product) => (
                    <ProductCard key={`desktop-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
              <div className="h-fit rounded-lg bg-gray-900 p-6">
                <div className="mb-6 text-center">
                  <div className="relative mx-auto mb-4 h-24 w-24">
                    <Image
                      src="/msi-logo-white.jpg"
                      alt="Gaming Monitors"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Gaming Monitors
                  </h3>
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  See All Products
                </Button>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {newProducts.map((product) => (
                    <ProductCard key={`monitor-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandShowcase />

        <section className="animate-on-scroll mx-auto max-w-7xl px-4 py-12 opacity-0">
          <div className="grid gap-6 md:grid-cols-4">
            {customer.map((stat, index) => (
              <div
                key={index}
                className={`hover-lift animate-scale-in rounded-lg border border-gray-200 bg-white p-6 text-center opacity-0 stagger-${index + 1}`}
              >
                <div className="mb-2 text-3xl font-bold text-blue-600">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-gray-200 bg-white py-12">
          <div className="animate-on-scroll mx-auto max-w-4xl px-4 opacity-0">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center md:p-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="mb-6 text-lg leading-relaxed text-gray-700">
                &quot;Mi primera orden llegó hoy en perfectas condiciones. Desde
                que envié una pregunta sobre el producto hasta realizar la
                compra, el envío y ahora la entrega, TechStore se mantuvo en
                contacto. Un servicio excepcional. Espero comprar nuevamente y
                lo recomiendo ampliamente.&quot;
              </blockquote>
              <cite className="text-sm font-semibold text-blue-600">
                — Tama Brown
              </cite>
              <div className="mt-4 flex justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div className="h-2 w-2 rounded-full bg-gray-300" />
              </div>
              <Button
                variant="outline"
                className="mt-6 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Déjanos tu Reseña
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: (
                    <svg
                      className="h-10 w-10"
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
                      className="h-10 w-10"
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
                      className="h-10 w-10"
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
                  className={`hover-lift animate-scale-in rounded-lg border border-gray-200 bg-white p-8 text-center opacity-0 stagger-${index + 1}`}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
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
