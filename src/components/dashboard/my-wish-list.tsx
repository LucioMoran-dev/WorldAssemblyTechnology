"use client";

import Link from "next/link";

import { useWishlist } from "@/hooks";
import type { IWishlistItem as IWishlistItem } from "@/types";

function MyWishList() {
  const { data: wishlist, isLoading } = useWishlist();

  // Obtener los items de la wishlist
  const wishlistItems: IWishlistItem[] = wishlist?.items || [];

  return (
    <>
      <section className="rounded-lg border border-gray-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
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
          <div className="h-16 animate-pulse rounded bg-gray-200" />
        ) : wishlistItems && wishlistItems.length > 0 ? (
          <div className="space-y-3">
            {wishlistItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-600">
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
          <p className="text-gray-600">
            No tienes productos en tu lista de deseos.
          </p>
        )}
      </section>
    </>
  );
}

export default MyWishList;
