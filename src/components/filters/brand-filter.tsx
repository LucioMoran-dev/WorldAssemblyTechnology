"use client";

import Image from "next/image";

const BRANDS = [
  { name: "MSI", src: "/msi-logo.jpg" },
  { name: "Razer", src: "/razer-logo.png" },
  { name: "HP", src: "/hp-logo-abstract.png" },
  { name: "ASUS", src: "/asus-logo.jpg" },
  { name: "Intel", src: "/intel-logo.png" },
  { name: "Gigabyte", src: "/gigabyte-logo.jpg" },
];

interface BrandFilterProps {
  value: string;
  onChange: (brand: string) => void;
  /** Botón "Todas las Marcas" para resetear */
  showAllButton?: boolean;
}

export function BrandFilter({ value, onChange, showAllButton = true }: BrandFilterProps) {
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
      <div className="grid grid-cols-3 gap-3">
        {BRANDS.map((brand) => {
          const isSelected = normalizedValue === brand.name.toLowerCase();

          return (
            <button
              key={brand.name}
              onClick={() => onChange(isSelected ? "" : brand.name)}
              title={brand.name}
              className={`flex aspect-square items-center justify-center rounded-lg border p-2 transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
