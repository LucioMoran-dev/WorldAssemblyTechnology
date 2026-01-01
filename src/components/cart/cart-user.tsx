"use client";

import { useCartQuery } from "@/hooks";
import { useCart } from "@/hooks/use-cart";

import CartHeader from "./cart-header";
import CartItemsList from "./cart-items-list";
import { SummarySidebar } from "./summary-sidebar";

function CartUser() {
  const { data: cart, isLoading } = useCartQuery();

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

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = shippingMethod === "standard" ? 21.0 : 0.0;
  const tax = subtotal * 0.05; // 5% tax
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + shipping + tax + gst;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-1/3 rounded bg-gray-200" />
            <div className="h-64 rounded bg-gray-200" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <CartHeader />

        <div className="grid gap-8 lg:grid-cols-3">
          <CartItemsList
            items={items}
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
