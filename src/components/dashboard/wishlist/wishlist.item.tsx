import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { IWishlistItems } from "@/types";

function WishlistItem() {
  const wishlistItems: IWishlistItems[] = [];
  return (
    <>
      {wishlistItems.length > 0 ? (
        <div className="space-y-4">
          {wishlistItems.map((item: IWishlistItems) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="flex gap-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mb-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      {item.price}
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Agregar al Carrito
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Tu lista de deseos está vacía
          </h3>
          <p className="mb-6 text-gray-600">
            Guarda tus productos favoritos aquí para comprarlos más tarde
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/">Explorar Productos</Link>
          </Button>
        </div>
      )}
    </>
  );
}
export default WishlistItem;
