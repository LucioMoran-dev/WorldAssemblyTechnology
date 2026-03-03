"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-xl">
      <div className="mx-auto max-w-7xl px-8 py-12 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="z-10 space-y-6">
            <Badge
              className={`gradient-accent border-0 px-4 py-1.5 font-bold text-white transition-all duration-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              OFERTA EXCLUSIVA
            </Badge>

            <h1
              className={`text-3xl leading-tight font-bold text-balance text-white transition-all delay-75 duration-500 lg:text-5xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              CONSIGUE UN MONITOR GAMING DE REGALO
            </h1>

            <p
              className={`text-base leading-relaxed text-gray-300 transition-all delay-150 duration-500 lg:text-lg ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              AL COMPRAR CUALQUIER DESKTOP GAMING MSI SELECCIONADO
            </p>

            <div
              className={`flex flex-wrap gap-3 transition-all delay-200 duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Button
                size="lg"
                className="bg-blue-600 px-8 font-semibold text-white shadow-lg hover:bg-blue-700"
              >
                COMPRAR AHORA
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent px-8 font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                MÁS INFORMACIÓN
              </Button>
            </div>

            <p
              className={`text-xs text-gray-400 transition-all delay-300 duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              *Promoción válida hasta el 31 de Diciembre 2025
            </p>
          </div>

          {/* Right Image */}
          <div
            className={`relative h-64 transition-all delay-150 duration-700 lg:h-80 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <Image
              src="/msi-gaming-laptop-with-rgb-lighting.jpg"
              alt="Gaming Setup"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain drop-shadow-2xl"
            />
            <div className="absolute top-4 right-4 rounded-lg bg-white p-3 shadow-lg">
              <div className="text-xs font-bold text-blue-600">
                Intel® Core™
              </div>
              <div className="text-lg font-bold text-gray-900">i9</div>
              <div className="text-xs text-gray-600">13th Gen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
