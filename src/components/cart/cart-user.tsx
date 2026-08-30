"use client";

import { useState } from "react";

import { useCartQuery, useUpdateCartItem } from "@/hooks";

import CartHeader from "./cart-header";
import CartItemsList from "./cart-items-list";
import { SummarySidebar } from "./summary-sidebar";

function CartUser() {
  const { data: cart, isLoading } = useCartQuery();
  const updateItemMutation = useUpdateCartItem();

  const [shippingExpanded, setShippingExpanded] = useState(false);
  const [discountExpanded, setDiscountExpanded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const items =
    cart?.items.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.priceAtAddition,
      image: item.product.imgUrls?.[0] || "",
      quantity: item.quantity,
      subtotal: item.subtotal,
      selectedVariants: item.selectedVariants,
    })) || [];

  const subtotal = cart?.total || 0;
  const shipping = shippingMethod === "standard" ? 21.0 : 0.0;
  const tax = subtotal * 0.05;
  const gst = subtotal * 0.05;
  const total = subtotal + shipping + tax + gst;

  const quantities = items.reduce(
    (acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    updateItemMutation.mutate({
      itemId,
      data: { quantity: Math.max(0, newQuantity) },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-muted/40">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-1/3 rounded bg-muted" />
            <div className="h-64 rounded bg-muted" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <CartHeader />

        <div className="grid gap-8 lg:grid-cols-3">
          <CartItemsList
            items={items}
            quantities={quantities}
            onUpdateQuantity={handleUpdateQuantity}
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
