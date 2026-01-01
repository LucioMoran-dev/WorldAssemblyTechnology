"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useCartQuery } from "@/hooks";

function OrderSummarySidebar() {
  const { data: cart } = useCartQuery();
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(true);

  const items = cart?.items || [];
  const itemCount = cart?.itemCount || 0;

  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
          <button
            onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
            className="mb-4 flex w-full items-center justify-between"
          >
            <h2 className="text-xl font-bold">Resumen del Pedido</h2>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${orderSummaryExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {orderSummaryExpanded && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 text-sm">
                <span className="font-medium">
                  {itemCount} {itemCount === 1 ? "Artículo" : "Artículos"} en
                  el Carrito
                </span>
                <button className="text-blue-600 hover:underline">-</button>
              </div>

              {items.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-500">
                  Tu carrito está vacío
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-gray-200 pb-4"
                  >
                    <Image
                      src={item.product.imgUrls[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded bg-gray-50 object-contain"
                    />
                    <div className="flex-1">
                      <p className="mb-1 text-sm text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Cant: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        ${item.subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderSummarySidebar;
