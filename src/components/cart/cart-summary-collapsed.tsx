import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CartSummaryCollapsedProps } from "@/types";

function CartSummaryCollapsed({
  subtotal,
  shipping,
  tax,
  gst,
  total,
  onExpandShipping,
  onExpandDiscount,
}: CartSummaryCollapsedProps) {
  return (
    <div className="sticky top-24 rounded-lg bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Resumen</h2>

      {/* Estimate Shipping and Tax - Collapsed */}
      <div className="mb-4 border-b border-border pb-4">
        <button
          onClick={onExpandShipping}
          className="flex w-full items-center justify-between text-left font-medium"
        >
          <span>Estimar Envío e Impuestos</span>
          <span className="text-xl font-light">-</span>
        </button>
        <p className="mt-2 text-sm text-muted-foreground">
          Ingresa tu destino para obtener una estimación de envío.
        </p>
      </div>

      {/* Apply Discount Code - Collapsed */}
      <div className="mb-4 border-b border-border pb-4">
        <button
          onClick={onExpandDiscount}
          className="flex w-full items-center justify-between text-left font-medium"
        >
          <span>Aplicar Código de Descuento</span>
          <span className="text-xl font-light">-</span>
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Envío</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          (Tarifa Estándar - El precio puede variar según el artículo/destino.
          El personal de la tienda se pondrá en contacto contigo.)
        </p>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Impuesto</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">GST (10%)</span>
          <span className="font-semibold">${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
          <span>Total del Pedido</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Buttons */}
      <div className="space-y-3">
        <Link href="/cart/checkout">
          <Button className="h-12 w-full bg-blue-600 text-white hover:bg-blue-700">
            Proceder al Pago
          </Button>
        </Link>
        <Button className="h-12 w-full bg-yellow-400 font-semibold text-foreground hover:bg-yellow-500">
          Pagar con <span className="ml-1 font-bold">PayPal</span>
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full border-border bg-transparent"
        >
          Pagar con Múltiples Direcciones
        </Button>
      </div>

      {/* Zip Payment Info */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="flex h-4 w-8 items-center justify-center rounded bg-gradient-to-r from-purple-400 to-blue-400 text-[10px] font-bold text-white">
            zip
          </div>
          <span>cómpralo ahora, hasta 6 meses sin intereses</span>
          <Link href="#" className="text-blue-600 underline">
            más información
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryCollapsed;


