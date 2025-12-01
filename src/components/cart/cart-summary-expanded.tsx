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
      <h2 className="mb-6 text-xl font-bold">Summary</h2>

      {/* Estimate Shipping and Tax - Expanded */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          onClick={onCollapseShipping}
          className="flex w-full items-center justify-between text-left font-medium"
        >
          <span>Estimate Shipping and Tax</span>
          <span className="text-xl font-light">-</span>
        </button>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Australia</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              State/Province
            </label>
            <Input type="text" className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Zip/Postal Code
            </label>
            <Input type="text" className="w-full" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Standard Rate</p>
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
                Price may vary depending on the item/destination. Shop Staff
                will contact you. $21.00
              </span>
            </label>
            <p className="mt-3 text-sm font-medium">Pickup from store</p>
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
          <span>Apply Discount Code</span>
          <span className="text-xl font-light">-</span>
        </button>
        {discountExpanded && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600">Enter discount code</p>
            <Input
              type="text"
              placeholder="Enter Discount Code"
              className="w-full"
            />
            <Button
              variant="outline"
              className="w-full border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50"
            >
              Apply Discount
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
          <span className="font-medium">Shipping</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500">
          (Standard Rate - Price may vary depending on the item/destination.
          Shop Staff will contact you.)
        </p>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Tax</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">GST (10%)</span>
          <span className="font-semibold">${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold">
          <span>Order Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Buttons */}
      <div className="space-y-3">
        <Link href="/checkout">
          <Button className="h-12 w-full bg-blue-600 text-white hover:bg-blue-700">
            Proceed to Checkout
          </Button>
        </Link>
        <Button className="h-12 w-full bg-yellow-400 font-semibold text-gray-900 hover:bg-yellow-500">
          Check out with <span className="ml-1 font-bold">PayPal</span>
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full border-gray-300 bg-transparent"
        >
          Check Out with Multiple Addresses
        </Button>
      </div>

      {/* Zip Payment Info */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="flex h-4 w-8 items-center justify-center rounded bg-gradient-to-r from-purple-400 to-blue-400 text-[10px] font-bold text-white">
            zip
          </div>
          <span>own it now, up to 6 months interest free</span>
          <Link href="#" className="text-blue-600 underline">
            learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryExpanded;
