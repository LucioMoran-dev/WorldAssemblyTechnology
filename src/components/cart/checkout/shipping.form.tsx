"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ShippingForm() {
  const [shippingMethod, setShippingMethod] = useState("standard");

  return (
    <>
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
              <label className="mb-1 block text-sm font-medium">Company</label>
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
                    Price may vary depending on the item/destination. Shop Staff
                    will contact you. $21.00
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
    </>
  );
}

export default ShippingForm;
