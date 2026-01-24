"use client";

import { Heart, ShoppingCart, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useWishlist, useRemoveFromWishlist } from "@/hooks";
import type { IWishlistItem as IWishlistItem } from "@/types";

function WishlistItem() {
  const { data: wishlist, isLoading } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  // Obtener los items de la wishlist
  const wishlistItems: IWishlistItem[] = wishlist?.items || [];

  const handleRemoveItem = async (itemId: string) => {
    // Usar el ID del producto, no el ID del item de wishlist
    const item = wishlistItems.find((i) => i.id === itemId);
    if (item) {
      removeFromWishlist.mutate(item.product.id);
    }
  };

  const handleAddToCart = async (_item: IWishlistItem) => {
    // Aquí implementa tu lógica para agregar al carrito
    // addToCart.mutate({ productId: item.product.id, quantity: 1 });
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
          {wishlistItems.map((item: IWishlistItem) => {
            const { product } = item;
            const imageUrl = product.imgUrls?.[0] || "/placeholder.svg";

            return (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex gap-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.brand} - {product.model}
                        </p>
                      </div>
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
                    {product.description && (
                      <p className="mb-3 text-sm text-gray-600">
                        {product.description}
                      </p>
                    )}
                    <div className="mb-2">
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        {product.category.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          $
                          {product.basePrice.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stock: {product.baseStock} unidades
                        </p>
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleAddToCart(item)}
                        disabled={product.baseStock === 0}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {product.baseStock > 0
                          ? "Agregar al Carrito"
                          : "Sin Stock"}
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Agregado el{" "}
                      {new Date(item.addedAt).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
