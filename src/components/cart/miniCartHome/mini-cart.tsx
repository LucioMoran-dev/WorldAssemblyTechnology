"use client";

import { X, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCartQuery, useRemoveCartItem } from "@/hooks";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  // 1. Obtenemos los datos y la mutación para eliminar
  const { data: cart, isLoading } = useCartQuery();
  const removeItemMutation = useRemoveCartItem();

  if (!isOpen) return null;

  const items = cart?.items || [];
  const itemCount = cart?.itemCount || 0;
  const total = cart?.total || 0;

  // Función para manejar la eliminación desde el minicart
  const handleRemove = (id: string) => {
    removeItemMutation.mutate(id);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Mini Cart Container */}
      <div className="animate-in fade-in zoom-in fixed top-16 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-2xl duration-200">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-center text-lg font-bold">Mi Carrito</h3>
          <p className="text-center text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "artículo" : "artículos"} en el
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

          {/* Cart Items List */}
          <div className="mb-4 max-h-[300px] space-y-2 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="space-y-2 py-4">
                <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
              </div>
            ) : items.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Tu carrito está vacío
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded border border-gray-100 p-2 transition-colors hover:bg-gray-50"
                >
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={item.product.imgUrls?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="rounded bg-gray-50 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-semibold text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Cant: {item.quantity} • $
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
                      <X className="h-3.5 w-3.5 text-gray-400 group-hover:text-red-500" />
                    </button>
                    <Link href="/cart" onClick={onClose}>
                      <button
                        className="group rounded p-1 hover:bg-blue-50"
                        title="Editar"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-500" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal Section */}
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pt-1 pb-3">
            <span className="text-sm font-medium text-gray-600">Subtotal:</span>
            <span className="text-lg font-bold text-blue-600">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Action Button */}
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
