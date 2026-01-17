"use client";

import { Edit, MapPin, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMyAddresses } from "@/hooks";

function DataAddresses() {
  const { data: addresses, isLoading } = useMyAddresses();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <>
      {addresses && addresses.length > 0 ? (
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
                    {address.label}
                  </h3>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
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
    </>
  );
}

export default DataAddresses;
