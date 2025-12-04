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
          <h2 className="mb-6 text-xl font-bold">Dirección de Envío</h2>

          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <Input type="email" className="w-full" />
              <p className="mt-1 text-xs text-gray-500">
                Puedes crear una cuenta después de realizar el pago.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Nombre <span className="text-red-500">*</span>
              </label>
              <Input type="text" className="w-full" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Apellido <span className="text-red-500">*</span>
              </label>
              <Input type="text" className="w-full" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Empresa</label>
              <Input type="text" className="w-full" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Dirección <span className="text-red-500">*</span>
              </label>
              <Input type="text" className="mb-2 w-full" />
              <Input type="text" className="w-full" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Ciudad <span className="text-red-500">*</span>
              </label>
              <Input type="text" className="w-full" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Estado/Provincia <span className="text-red-500">*</span>
              </label>
              <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
                <option>Por favor, selecciona una región, estado o provincia</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Código Postal <span className="text-red-500">*</span>
              </label>
              <Input type="text" className="w-full" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                País <span className="text-red-500">*</span>
              </label>
              <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
                <option>Estados Unidos</option>
                <option>Australia</option>
                <option>Reino Unido</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Número de Teléfono <span className="text-red-500">*</span>
              </label>
              <Input type="tel" className="w-full" />
            </div>

            {/* Shipping Methods */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="mb-4 font-semibold">Tarifa Estándar</h3>
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
                    El precio puede variar según el artículo/destino. El personal de la tienda se pondrá en contacto contigo. $21.00
                  </span>
                  <span className="font-semibold">$21.00</span>
                </div>
              </label>

              <h3 className="mb-4 font-semibold">Recoger en tienda</h3>
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
                    Calle 1234, Ciudad, 1234
                  </span>
                  <span className="font-semibold">$0.00</span>
                </div>
              </label>
            </div>

            <Button className="mt-6 h-12 w-full bg-blue-600 text-white hover:bg-blue-700">
              Siguiente
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShippingForm;
