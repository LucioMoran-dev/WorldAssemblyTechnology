"use client";

import { useCart } from "@/hooks/use-cart";
import { cartItems } from "@/seeds";

import CartHeader from "./cart-header";
import CartItemsList from "./cart-items-list";
import { SummarySidebar } from "./summary-sidebar";

function CartUser() {
  const {
    quantities,
    updateQuantity,
    shippingExpanded,
    discountExpanded,
    selectedCountry,
    shippingMethod,
    setShippingExpanded,
    setDiscountExpanded,
    setSelectedCountry,
    setShippingMethod,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );
  const shipping = shippingMethod === "standard" ? 21.0 : 0.0;
  const tax = 1.91;
  const gst = 1.91;
  const total = subtotal + shipping + tax + gst;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <CartHeader />

        <div className="grid gap-8 lg:grid-cols-3">
          <CartItemsList
            items={cartItems}
            quantities={quantities}
            onUpdateQuantity={updateQuantity}
          />

          <SummarySidebar
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            gst={gst}
            total={total}
            selectedCountry={selectedCountry}
            shippingMethod={shippingMethod}
            discountExpanded={discountExpanded}
            shippingExpanded={shippingExpanded}
            onCountryChange={setSelectedCountry}
            onShippingMethodChange={setShippingMethod}
            onCollapseShipping={() => setShippingExpanded(false)}
            onToggleDiscount={() => setDiscountExpanded(!discountExpanded)}
            onExpandShipping={() => setShippingExpanded(true)}
            onExpandDiscount={() => setDiscountExpanded(!discountExpanded)}
          />
        </div>
      </main>
    </div>
  );
}

export default CartUser;
