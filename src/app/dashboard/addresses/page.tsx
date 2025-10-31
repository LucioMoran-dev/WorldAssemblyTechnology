"use client";

import { Plus, MapPin, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addresses } from "@/seeds";

export default function AddressesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Libreta de Direcciones
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Nueva Dirección
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="relative rounded-lg border border-gray-200 p-6"
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Predeterminada
                </span>
              )}

              <div className="mb-4 flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {address.type}
                  </h3>
                  <p className="text-sm text-gray-700">{address.name}</p>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Tel: {address.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 border-t border-gray-200 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No hay direcciones guardadas
          </h3>
          <p className="mb-6 text-gray-600">
            Agrega tu primera dirección para facilitar tus compras
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Dirección
          </Button>
        </div>
      )}
    </div>
  );
}
