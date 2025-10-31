"use client";

import { ChevronDown, ChevronUp, X, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CartSummaryCollapsed } from "@/components/cart/cart-summary-collapsed";
import { CartSummaryExpanded } from "@/components/cart/cart-summary-expanded";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 1,
    "2": 1,
  });
  const [shippingExpanded, setShippingExpanded] = useState(false);
  const [discountExpanded, setDiscountExpanded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const cartItems = [
    {
      id: "1",
      name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
      price: 4349.0,
      image: "/msi-desktop-front.jpg",
    },
    {
      id: "2",
      name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
      price: 4349.0,
      image: "/msi-laptop.jpg",
    },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

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
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Login</span>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Table Header */}
            <div className="mb-4 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-12 gap-4 border-b border-gray-200 p-4 text-sm font-medium">
                <div className="col-span-5">Item</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Subtotal</div>
                <div className="col-span-1" />
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center gap-4 border-b border-gray-200 p-4"
                >
                  <div className="col-span-5 flex gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded bg-gray-50 object-contain"
                    />
                    <div className="flex-1">
                      <p className="line-clamp-3 text-sm text-gray-900">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-semibold">
                    ${item.price.toLocaleString()}
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <div className="flex items-center rounded border border-gray-300">
                      <Input
                        type="number"
                        value={quantities[item.id] ?? 1}
                        onChange={(e) =>
                          setQuantities((prev) => ({
                            ...prev,
                            [item.id]: Number.parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-16 border-0 text-center focus-visible:ring-0"
                        min="1"
                      />
                      <div className="flex flex-col border-l border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="border-b border-gray-300 px-2 py-0.5 hover:bg-gray-100"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 hover:bg-gray-100"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-semibold">
                    $
                    {(item.price * (quantities[item.id] ?? 1)).toLocaleString()}
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <button className="rounded p-1 hover:bg-gray-100">
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="rounded p-1 hover:bg-gray-100">
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-gray-300 bg-transparent"
              >
                Continue Shopping
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-black bg-black text-white hover:bg-gray-800"
                >
                  Clear Shopping Cart
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Update Shopping Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            {!shippingExpanded ? (
              <CartSummaryCollapsed
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                gst={gst}
                total={total}
                onExpandShipping={() => setShippingExpanded(true)}
                onExpandDiscount={() => setDiscountExpanded(!discountExpanded)}
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
                onCountryChange={setSelectedCountry}
                onShippingMethodChange={setShippingMethod}
                onCollapseShipping={() => setShippingExpanded(false)}
                onToggleDiscount={() => setDiscountExpanded(!discountExpanded)}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
