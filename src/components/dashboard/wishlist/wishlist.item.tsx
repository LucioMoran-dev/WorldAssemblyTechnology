import { Heart, ShoppingCart, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useWishlist, useRemoveFromWishlist } from "@/hooks";
import type { WishlistItem as IWishlistItem } from "@/types";

function WishlistItem() {
  const { data: wishlist, isLoading } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  // Obtener los items de la wishlist
  const wishlistItems: IWishlistItem[] = wishlist?.items || [];

  const handleRemoveItem = async (productId: string) => {
    removeFromWishlist.mutate(productId);
  };

  const handleAddToCart = async (_item: IWishlistItem) => {
    // Aquí implementa tu lógica para agregar al carrito
    // Por ejemplo:
    // addToCart.mutate({ productId: item.id, quantity: 1 });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-200 p-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      {wishlistItems.length > 0 ? (
        <div className="space-y-4">
          {wishlistItems.map((item: IWishlistItem) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex gap-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.url || "/placeholder.svg"}
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
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={removeFromWishlist.isPending}
                    >
                      {removeFromWishlist.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {item.description && (
                    <p className="mb-3 text-sm text-gray-600">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      $
                      {item.price.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Agregar al Carrito
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Agregado el{" "}
                    {new Date(item.addedAt).toLocaleDateString("es-AR")}
                  </p>
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
            <Link href="/products/catalog/products">Explorar Productos</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default WishlistItem;
