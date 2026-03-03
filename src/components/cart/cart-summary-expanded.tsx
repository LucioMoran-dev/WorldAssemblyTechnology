import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartSummaryExpandedProps } from "@/types";

function CartSummaryExpanded({
  subtotal,
  shipping,
  tax,
  gst,
  total,
  selectedCountry,
  shippingMethod,
  discountExpanded,
  onCountryChange,
  onShippingMethodChange,
  onCollapseShipping,
  onToggleDiscount,
}: CartSummaryExpandedProps) {
  return (
    <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Resumen</h2>

      {/* Estimate Shipping and Tax - Expanded */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          onClick={onCollapseShipping}
          className="flex w-full items-center justify-between text-left font-medium"
        >
          <span>Estimar EnvÃ­o e Impuestos</span>
          <span className="text-xl font-light">-</span>
        </button>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">PaÃ­s</label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Australia</option>
              <option>Estados Unidos</option>
              <option>Reino Unido</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Estado/Provincia
            </label>
            <Input type="text" className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              CÃ³digo Postal
            </label>
            <Input type="text" className="w-full" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Tarifa EstÃ¡ndar</p>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={(e) => onShippingMethodChange(e.target.value)}
                className="mt-0.5 text-blue-600"
              />
              <span className="text-xs text-gray-600">
                El precio puede variar segÃºn el artÃ­culo/destino. El personal de la tienda se pondrÃ¡ en contacto contigo. $21.00
              </span>
            </label>
            <p className="mt-3 text-sm font-medium">Recoger en tienda</p>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="radio"
                name="shipping"
                value="pickup"
                checked={shippingMethod === "pickup"}
                onChange={(e) => onShippingMethodChange(e.target.value)}
                className="mt-0.5 text-blue-600"
              />
              <span className="text-xs text-gray-600">
                1234 Street Adress City Address, 1234 $0.00
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Apply Discount Code */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          onClick={onToggleDiscount}
          className="flex w-full items-center justify-between text-left font-medium"
        >
          <span>Aplicar CÃ³digo de Descuento</span>
          <span className="text-xl font-light">-</span>
        </button>
        {discountExpanded && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600">Ingresa tu cÃ³digo de descuento</p>
            <Input
              type="text"
              placeholder="Ingresa tu CÃ³digo de Descuento"
              className="w-full"
            />
            <Button
              variant="outline"
              className="w-full border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50"
            >
              Aplicar Descuento
            </Button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">EnvÃ­o</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500">
          (Tarifa EstÃ¡ndar - El precio puede variar segÃºn el artÃ­culo/destino.
          El personal de la tienda se pondrÃ¡ en contacto contigo.)
        </p>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Impuesto</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">GST (10%)</span>
          <span className="font-semibold">${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold">
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
        <Button className="h-12 w-full bg-yellow-400 font-semibold text-gray-900 hover:bg-yellow-500">
          Pagar con <span className="ml-1 font-bold">PayPal</span>
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full border-gray-300 bg-transparent"
        >
          Pagar con MÃºltiples Direcciones
        </Button>
      </div>

      {/* Zip Payment Info */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="flex h-4 w-8 items-center justify-center rounded bg-gradient-to-r from-purple-400 to-blue-400 text-[10px] font-bold text-white">
            zip
          </div>
          <span>cÃ³mpralo ahora, hasta 6 meses sin intereses</span>
          <Link href="#" className="text-blue-600 underline">
            mÃ¡s informaciÃ³n
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryExpanded;

