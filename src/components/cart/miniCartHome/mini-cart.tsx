"use client";

import { X, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useCartQuery, useRemoveCartItem } from "@/hooks";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { data: cart, isLoading } = useCartQuery();
  const removeItemMutation = useRemoveCartItem();

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

  const items = cart?.items || [];
  const itemCount = cart?.itemCount || 0;
  const total = cart?.total || 0;

  const handleRemove = (id: string) => {
    removeItemMutation.mutate(id);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 animate-in fade-in bg-black/30 duration-200"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mini-cart-title"
        className="animate-in fade-in zoom-in-95 fixed top-16 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card shadow-2xl duration-200"
      >
        <div className="border-b border-border p-4">
          <h3 id="mini-cart-title" className="text-center text-lg font-bold">
            Mi Carrito
          </h3>
          <p className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "articulo" : "articulos"} en el
            carrito
          </p>
        </div>

        <div className="p-4">
          <Link href="/cart" onClick={onClose}>
            <Button
              variant="outline"
              className="mb-4 h-10 w-full border-blue-600 bg-transparent text-sm text-blue-600 hover:bg-blue-50"
            >
              Ver o Editar Tu Carrito
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
                Tu carrito esta vacio
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
                      Cant: {item.quantity} - $
                      {item.priceAtAddition.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={removeItemMutation.isPending}
                      className="group rounded p-1 hover:bg-red-50"
                      title="Eliminar"
                    >
                      <X className="h-3.5 w-3.5 text-muted-foreground group-hover:text-red-500" />
                    </button>
                    <Link href="/cart" onClick={onClose}>
                      <button
                        className="group rounded p-1 hover:bg-blue-50"
                        title="Editar"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-blue-500" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mb-4 flex items-center justify-between border-b border-border pt-1 pb-3">
            <span className="text-sm font-medium text-muted-foreground">Subtotal:</span>
            <span className="text-lg font-bold text-blue-600">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-2">
            <Link href="/cart/checkout" onClick={onClose}>
              <Button
                disabled={items.length === 0}
                className="h-10 w-full bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Ir al Pago
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

