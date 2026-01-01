"use client";

import { X, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCartQuery } from "@/hooks";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { data: cart } = useCartQuery();

  if (!isOpen) return null;

  const items = cart?.items || [];
  const itemCount = cart?.itemCount || 0;
  const total = cart?.total || 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Mini Cart - Made smaller and more responsive */}
      <div className="fixed top-16 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-2xl">
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

          {/* Cart Items - Made more compact */}
          <div className="mb-4 max-h-[300px] space-y-2 overflow-y-auto">
            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Tu carrito está vacío
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded border border-gray-200 p-2"
                >
                  <span className="text-xs font-medium">{item.quantity} x</span>
                  <Image
                    src={item.product.imgUrls[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    className="rounded bg-gray-50 object-contain"
                  />
                  <p className="line-clamp-2 flex-1 text-xs text-gray-900">
                    {item.product.name}
                  </p>
                  <div className="flex flex-col gap-1">
                    <button className="rounded p-0.5 hover:bg-gray-100">
                      <X className="h-3 w-3 text-gray-600" />
                    </button>
                    <button className="rounded p-0.5 hover:bg-gray-100">
                      <Edit2 className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal - Made more compact */}
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>

          {/* Checkout Buttons - Made smaller */}
          <div className="space-y-2">
            <Link href="/cart/checkout" onClick={onClose}>
              <Button className="h-10 w-full bg-blue-600 text-sm text-white hover:bg-blue-700">
                Ir al Pago
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
