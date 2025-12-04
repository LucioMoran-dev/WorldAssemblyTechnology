"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cartItemsCheckout } from "@/seeds";

function OrderSummarySidebar() {
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(true);

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
                <span className="font-medium">2 Artículos en el Carrito</span>
                <button className="text-blue-600 hover:underline">-</button>
              </div>

              {cartItemsCheckout.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-200 pb-4"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded bg-gray-50 object-contain"
                  />
                  <div className="flex-1">
                    <p className="mb-1 text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      Cant: {item.quantity}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderSummarySidebar;
