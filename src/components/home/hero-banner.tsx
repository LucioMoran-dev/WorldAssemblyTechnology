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
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden shadow-xl">
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <Badge
              className={`gradient-accent text-white border-0 font-bold px-4 py-1.5 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              OFERTA EXCLUSIVA
            </Badge>

            <h1
              className={`text-3xl lg:text-5xl font-bold leading-tight text-white text-balance transition-all duration-500 delay-75 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              CONSIGUE UN MONITOR GAMING DE REGALO
            </h1>

            <p
              className={`text-base lg:text-lg text-gray-300 leading-relaxed transition-all duration-500 delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              AL COMPRAR CUALQUIER DESKTOP GAMING MSI SELECCIONADO
            </p>

            <div
              className={`flex flex-wrap gap-3 transition-all duration-500 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 shadow-lg"
              >
                COMPRAR AHORA
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 bg-transparent"
              >
                MÁS INFORMACIÓN
              </Button>
            </div>

            <p
              className={`text-xs text-gray-400 transition-all duration-500 delay-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              *Promoción válida hasta el 31 de Diciembre 2025
            </p>
          </div>

          {/* Right Image */}
          <div
            className={`relative h-64 lg:h-80 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Image
              src="/msi-gaming-laptop-with-rgb-lighting.jpg"
              alt="Gaming Setup"
              fill
              className="object-contain drop-shadow-2xl"
            />
            <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
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
