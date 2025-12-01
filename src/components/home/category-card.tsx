import Image from "next/image";

import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  buttonText?: string;
}

export function CategoryCard({
  imageSrc,
  imageAlt,
  title,
  buttonText = "See All Products",
}: CategoryCardProps) {
  return (
    <div className="h-fit rounded-lg bg-gray-900 p-6">
      <div className="mb-6 text-center">
        <div className="relative mx-auto mb-4 h-24 w-24">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
      </div>
      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
        {buttonText}
      </Button>
    </div>
  );
}
