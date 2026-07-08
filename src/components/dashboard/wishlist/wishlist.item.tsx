"use client";

import { ArrowRight, Heart, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useRemoveFromWishlist, useWishlist } from "@/hooks";
import type { IWishlistItem } from "@/types";

function WishlistItem() {
  const { data: wishlist, isLoading } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const wishlistItems: IWishlistItem[] = wishlist?.items || [];

  const handleRemoveItem = (itemId: string) => {
    const item = wishlistItems.find((candidate) => candidate.id === itemId);
    if (!item) return;
    removeFromWishlist.mutate(item.product.id);
  };

  if (isLoading) {
    return (
      <div className="border-border flex items-center justify-center rounded-lg border p-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      {wishlistItems.length > 0 ? (
        <div className="space-y-4">
          {wishlistItems.map((item) => {
            const { product } = item;
            const imageUrl = product.imgUrls?.[0] || "/placeholder.svg";

            return (
              <div
                key={item.id}
                className="border-border rounded-lg border p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex gap-6">
                  <div className="bg-muted relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
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
                        <h3 className="text-foreground font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {product.brand} - {product.model}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-red-600"
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
                    {product.description ? (
                      <p className="text-muted-foreground mb-3 text-sm">
                        {product.description}
                      </p>
                    ) : null}
                    <div className="mb-2">
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        {product.category_name ||
                          product.category?.category_name ||
                          product.category?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground text-2xl font-bold">
                          $
                          {product.basePrice.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        {/* Stock efectivo: con variantes el stock real viene en totalStock */}
                        <p className="text-muted-foreground text-xs">
                          Stock: {product.totalStock ?? product.baseStock}{" "}
                          unidades
                        </p>
                      </div>
                      {/* Al detalle: ahí se eligen las variantes y se compra */}
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href={`/products/${product.id}`}>
                          Ver producto
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
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
        <div className="border-border rounded-lg border p-12 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            Tu wishlist esta vacia
          </h3>
          <p className="text-muted-foreground mb-6">
            Guarda tus productos favoritos aqui para comprarlos mas tarde.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/products/catalog/products">Explorar productos</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default WishlistItem;
