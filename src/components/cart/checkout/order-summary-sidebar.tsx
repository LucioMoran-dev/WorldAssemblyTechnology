"use client";

import { ChevronDown, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { CartItemVariants } from "@/components/cart/cart-item-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartQuery } from "@/hooks";
import type { ICartDiscountPreview } from "@/types";

interface OrderSummarySidebarProps {
  discountPreview?: ICartDiscountPreview | null;
  promoCode?: string;
  onPromoCodeChange?: (value: string) => void;
  onApplyPromo?: () => void;
  isApplyingPromo?: boolean;
}

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function OrderSummarySidebar({
  discountPreview,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  isApplyingPromo = false,
}: OrderSummarySidebarProps) {
  const { data: cart } = useCartQuery();
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(true);

  const items = cart?.items || [];
  const itemCount = cart?.itemCount || items.length;
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  const subtotalWithDiscount =
    discountPreview?.subtotalWithDiscount ?? subtotal;
  const totalDiscount = discountPreview?.totalDiscount ?? 0;
  const shipping = discountPreview?.shipping ?? 0;
  const tax = discountPreview?.tax ?? 0;
  const total = discountPreview?.total ?? cart?.total ?? subtotal;

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-lg bg-card p-6 shadow-sm">
        <button
          onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
          className="mb-4 flex w-full items-center justify-between"
        >
          <h2 className="text-xl font-bold">Resumen del pedido</h2>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${orderSummaryExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {orderSummaryExpanded && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4 text-sm">
              <span className="font-medium">
                {itemCount} {itemCount === 1 ? "articulo" : "articulos"} en el
                carrito
              </span>
            </div>

            {items.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Tu carrito esta vacio
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-border pb-4"
                >
                  <Image
                    src={item.product.imgUrls[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="rounded bg-muted/40 object-contain"
                  />
                  <div className="flex-1">
                    <p className="mb-1 line-clamp-2 text-sm text-foreground">
                      {item.product.name}
                    </p>
                    <CartItemVariants variants={item.selectedVariants} />
                    <p className="text-xs text-muted-foreground">
                      Cant: {item.quantity}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formatMoney(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {onApplyPromo && onPromoCodeChange && (
              <div className="rounded-lg border border-dashed border-border p-3">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  Codigo promocional
                </label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode ?? ""}
                    onChange={(event) => onPromoCodeChange(event.target.value)}
                    placeholder="PROMO10"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onApplyPromo}
                    disabled={isApplyingPromo || !(promoCode || "").trim()}
                  >
                    {isApplyingPromo ? "Aplicando..." : "Aplicar"}
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatMoney(subtotal)}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-700">
                  <span>Descuento</span>
                  <span className="font-semibold">
                    -{formatMoney(totalDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal final</span>
                <span className="font-semibold">
                  {formatMoney(subtotalWithDiscount)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envio</span>
                <span className="font-semibold">
                  {discountPreview ? formatMoney(shipping) : "-"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Impuestos</span>
                <span className="font-semibold">
                  {discountPreview ? formatMoney(tax) : "-"}
                </span>
              </div>

              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">{formatMoney(total)}</span>
              </div>
            </div>

            {discountPreview?.promoErrors?.length ? (
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
                {discountPreview.promoErrors.join(" ")}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSummarySidebar;
