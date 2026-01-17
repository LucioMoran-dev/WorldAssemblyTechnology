"use client";

import { useState } from "react";

export function useCart() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 1,
    "2": 1,
  });
  const [shippingExpanded, setShippingExpanded] = useState(false);
  const [discountExpanded, setDiscountExpanded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  return {
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
  };
}
