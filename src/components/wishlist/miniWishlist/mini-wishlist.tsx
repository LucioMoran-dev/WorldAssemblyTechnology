"use client";

import { X, ArrowRight, Trash2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useWishlist, useRemoveFromWishlist, useClearWishlist } from "@/hooks";

interface MiniWishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniWishlist({ isOpen, onClose }: MiniWishlistProps) {
  const { data: wishlist, isLoading } = useWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const clearWishlistMutation = useClearWishlist();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

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

  return (
    <>
      <div
        className="fixed inset-0 z-40 animate-in bg-black/30 duration-200 fade-in"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mini-wishlist-title"
        className="fixed top-16 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] animate-in rounded-lg border border-border bg-card shadow-2xl duration-200 zoom-in-95 fade-in"
      >
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            <h3 id="mini-wishlist-title" className="text-lg font-bold">
              Mi Lista de Deseos
            </h3>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "articulo" : "articulos"} guardados
          </p>
        </div>

        <div className="p-4">
          <Link href="/dashboard/wishlist" onClick={onClose}>
            <Button
              variant="outline"
              className="mb-4 h-10 w-full border-red-500 bg-transparent text-sm text-red-500 hover:bg-red-50"
            >
              Ver Lista Completa
            </Button>
          </Link>

          <div className="mb-4 max-h-[300px] space-y-2 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="space-y-2 py-4">
                <div className="h-12 w-full animate-pulse rounded bg-muted" />
                <div className="h-12 w-full animate-pulse rounded bg-muted" />
              </div>
            ) : items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Tu lista de deseos esta vacia
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded border border-border p-2 transition-colors hover:bg-muted/40"
                >
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={item.product.imgUrls?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="rounded bg-muted/40 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-semibold text-foreground">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      ${item.product.basePrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/products/${item.product.id}`}
                      onClick={onClose}
                      className="group rounded p-1 hover:bg-blue-50"
                      title="Ver producto"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-blue-500" />
                    </Link>
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      disabled={removeFromWishlistMutation.isPending}
                      className="group rounded p-1 hover:bg-red-50"
                      title="Eliminar de favoritos"
                    >
                      <X className="h-3.5 w-3.5 text-muted-foreground group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2">
            {items.length > 0 && (
              <Button
                onClick={handleClearAll}
                disabled={clearWishlistMutation.isPending}
                variant="outline"
                className="h-10 w-full border-border text-sm text-muted-foreground hover:bg-muted/40 hover:text-red-500"
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
