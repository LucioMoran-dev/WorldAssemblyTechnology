import Image from "next/image";

import { brands } from "@/seeds";

export function BrandShowcase() {
  return (
    <div className="border-border border-y bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-7">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
