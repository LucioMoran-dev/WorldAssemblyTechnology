"use client";

import Image from "next/image";

import { brands } from "@/seeds";

interface BrandFilterProps {
  value: string;
  onChange: (brand: string) => void;
  /** Botón "Todas las Marcas" para resetear */
  showAllButton?: boolean;
}

export function BrandFilter({
  value,
  onChange,
  showAllButton = true,
}: BrandFilterProps) {
  const normalizedValue = value.toLowerCase();

  return (
    <div className="space-y-3">
      {showAllButton && (
        <button
          onClick={() => onChange("")}
          className={`w-full rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            !value
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          }`}
        >
          Todas las Marcas
        </button>
      )}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {brands.map((brand) => {
          const isSelected = normalizedValue === brand.name.toLowerCase();

          return (
            <button
              key={brand.name}
              onClick={() => onChange(isSelected ? "" : brand.name)}
              title={brand.name}
              className={`flex aspect-square items-center justify-center rounded-lg border p-1.5 transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={50}
                height={50}
                className="object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
