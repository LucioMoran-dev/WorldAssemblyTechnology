"use client";

import Link from "next/link";

import { useWishlist } from "@/hooks";
import type { IWishlistItem as IWishlistItem } from "@/types";

function MyWishList() {
  const { data: wishlist, isLoading } = useWishlist();

  const wishlistItems: IWishlistItem[] = wishlist?.items || [];

  return (
    <>
      <section className="border-border rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-bold">
            Mi Lista de Deseos
          </h2>
          {wishlistItems && wishlistItems.length > 0 && (
            <Link
              href="/wishlist"
              className="text-sm text-blue-600 hover:underline"
            >
              Ver Todos ({wishlistItems.length})
            </Link>
          )}
        </div>
        {isLoading ? (
          <div className="bg-muted h-16 animate-pulse rounded" />
        ) : wishlistItems && wishlistItems.length > 0 ? (
          <div className="space-y-3">
            {wishlistItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="border-border flex items-center gap-4 rounded-lg border p-3"
              >
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    ${item.product.basePrice}
                  </p>
                </div>
                <Link
                  href={`/products/${item.product.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No tienes productos en tu lista de deseos.
          </p>
        )}
      </section>
    </>
  );
}

export default MyWishList;
