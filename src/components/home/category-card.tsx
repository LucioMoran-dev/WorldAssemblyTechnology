import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  buttonText?: string;
  href?: string;
}

export function CategoryCard({
  imageSrc,
  imageAlt,
  title,
  buttonText = "Ver Todos los Productos",
  href = "/products/catalog/products",
}: CategoryCardProps) {
  return (
    <div className="relative h-70 overflow-hidden rounded-lg">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-between bg-black/40 p-6">
        <div className="flex-1 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
        </div>
        <Link href={href}>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
