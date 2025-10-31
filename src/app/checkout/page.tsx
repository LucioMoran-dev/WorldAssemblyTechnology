"use client";

import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartItemsCheckout } from "@/seeds";

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(true);

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
          <Link href="/cart" className="text-gray-600 hover:text-blue-600">
            Shopping Cart
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Checkout Process</span>
        </div>

        {/* Header with Sign In */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Button
            variant="outline"
            className="border-blue-600 bg-transparent px-8 text-blue-600 hover:bg-blue-50"
          >
            Sign In
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center gap-4">
            {/* Step 1 - Active */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                <Check className="h-5 w-5" />
              </div>
              <span className="font-semibold text-blue-600">Shipping</span>
            </div>

            {/* Connector Line */}
            <div className="h-0.5 w-32 bg-gray-300" />

            {/* Step 2 - Inactive */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                2
              </div>
              <span className="text-gray-600">Review & Payments</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold">Shipping Address</h2>

              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input type="email" className="w-full" />
                  <p className="mt-1 text-xs text-gray-500">
                    You can create an account after checkout.
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="w-full" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="w-full" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Company
                  </label>
                  <Input type="text" className="w-full" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="mb-2 w-full" />
                  <Input type="text" className="w-full" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="w-full" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
                    <option>Please, select a region, state or province</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Zip/Postal Code <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="w-full" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
                    <option>United States</option>
                    <option>Australia</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input type="tel" className="w-full" />
                </div>

                {/* Shipping Methods */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="mb-4 font-semibold">Standard Rate</h3>
                  <label className="mb-4 flex items-start gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1 text-blue-600"
                    />
                    <div className="flex flex-1 justify-between">
                      <span className="text-sm text-gray-700">
                        Price may vary depending on the item/destination. Shop
                        Staff will contact you. $21.00
                      </span>
                      <span className="font-semibold">$21.00</span>
                    </div>
                  </label>

                  <h3 className="mb-4 font-semibold">Pickup from store</h3>
                  <label className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shippingMethod === "pickup"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1 text-blue-600"
                    />
                    <div className="flex flex-1 justify-between">
                      <span className="text-sm text-gray-700">
                        1234 Street Adress City Address, 1234
                      </span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                  </label>
                </div>

                <Button className="mt-6 h-12 w-full bg-blue-600 text-white hover:bg-blue-700">
                  Next
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
              <button
                onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
                className="mb-4 flex w-full items-center justify-between"
              >
                <h2 className="text-xl font-bold">Order Summary</h2>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${orderSummaryExpanded ? "rotate-180" : ""}`}
                />
              </button>

              {orderSummaryExpanded && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4 text-sm">
                    <span className="font-medium">2 Items in Cart</span>
                    <button className="text-blue-600 hover:underline">-</button>
                  </div>

                  {cartItemsCheckout.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-gray-200 pb-4"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded bg-gray-50 object-contain"
                      />
                      <div className="flex-1">
                        <p className="mb-1 text-sm text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
