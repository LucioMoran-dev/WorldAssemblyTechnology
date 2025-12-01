import type { SummarySidebarProps } from "@/types";

import CartSummaryCollapsed from "./cart-summary-collapsed";
import CartSummaryExpanded from "./cart-summary-expanded";

export function SummarySidebar({
  subtotal,
  shipping,
  tax,
  gst,
  total,
  selectedCountry,
  shippingMethod,
  discountExpanded,
  shippingExpanded,
  onCountryChange,
  onShippingMethodChange,
  onCollapseShipping,
  onToggleDiscount,
  onExpandShipping,
  onExpandDiscount,
}: SummarySidebarProps) {
  return (
    <div className="lg:col-span-1">
      {!shippingExpanded ? (
        <CartSummaryCollapsed
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          gst={gst}
          total={total}
          onExpandShipping={onExpandShipping}
          onExpandDiscount={onExpandDiscount}
        />
      ) : (
        <CartSummaryExpanded
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          gst={gst}
          total={total}
          selectedCountry={selectedCountry}
          shippingMethod={shippingMethod}
          discountExpanded={discountExpanded}
          onCountryChange={onCountryChange}
          onShippingMethodChange={onShippingMethodChange}
          onCollapseShipping={onCollapseShipping}
          onToggleDiscount={onToggleDiscount}
        />
      )}
    </div>
  );
}
