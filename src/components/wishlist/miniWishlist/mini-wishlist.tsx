"use client";

import { X, ShoppingCart, Trash2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  useWishlist,
  useRemoveFromWishlist,
  useClearWishlist,
  useAddToCart,
} from "@/hooks";

interface MiniWishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniWishlist({ isOpen, onClose }: MiniWishlistProps) {
  const { data: wishlist, isLoading } = useWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const clearWishlistMutation = useClearWishlist();
  const addToCartMutation = useAddToCart();

  if (!isOpen) return null;

  const items = wishlist?.items || [];
  const itemCount = items.length;

  const handleRemove = (productId: string) => {
    removeFromWishlistMutation.mutate(productId);
  };

  const handleClearAll = () => {
    if (items.length > 0) {
      clearWishlistMutation.mutate();
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate({
      productId,
      quantity: 1,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Mini Wishlist Container */}
      <div className="animate-in fade-in zoom-in fixed top-16 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-2xl duration-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <h3 className="text-lg font-bold">Mi Lista de Deseos</h3>
          </div>
          <p className="text-center text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "artículo" : "artículos"} guardados
          </p>
        </div>

        <div className="p-4">
          {/* Ver wishlist completa */}
          <Link href="/dashboard/wishlist" onClick={onClose}>
            <Button
              variant="outline"
              className="mb-4 h-10 w-full border-red-500 bg-transparent text-sm text-red-500 hover:bg-red-50"
            >
              Ver Lista Completa
            </Button>
          </Link>

          {/* Wishlist Items List */}
          <div className="mb-4 max-h-[300px] space-y-2 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="space-y-2 py-4">
                <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
              </div>
            ) : items.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Tu lista de deseos está vacía
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded border border-gray-100 p-2 transition-colors hover:bg-gray-50"
                >
                  {/* Imagen del producto */}
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={item.product.imgUrls?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="rounded bg-gray-50 object-contain"
                    />
                  </div>

                  {/* Info del producto */}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-semibold text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      ${item.product.basePrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-1">
                    {/* Agregar al carrito */}
                    <button
                      onClick={() => handleAddToCart(item.product.id)}
                      disabled={addToCartMutation.isPending}
                      className="group rounded p-1 hover:bg-blue-50"
                      title="Agregar al carrito"
                    >
                      <ShoppingCart className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-500" />
                    </button>
                    {/* Eliminar de wishlist */}
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      disabled={removeFromWishlistMutation.isPending}
                      className="group rounded p-1 hover:bg-red-50"
                      title="Eliminar de favoritos"
                    >
                      <X className="h-3.5 w-3.5 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* Limpiar todo */}
            {items.length > 0 && (
              <Button
                onClick={handleClearAll}
                disabled={clearWishlistMutation.isPending}
                variant="outline"
                className="h-10 w-full border-gray-300 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Vaciar Lista de Deseos
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
