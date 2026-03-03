"use client";

import { Edit, MapPin, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  useCreateAddress,
  useDeleteAddress,
  useMyAddresses,
  useSetDefaultAddress,
  useUpdateAddress,
} from "@/hooks";

function DataAddresses() {
  const { data: addresses = [], isLoading } = useMyAddresses();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [label, setLabel] = useState("Casa");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Argentina");

  const resetForm = () => {
    setLabel("Casa");
    setStreet("");
    setCity("");
    setProvince("");
    setPostalCode("");
    setCountry("Argentina");
  };

  const handleCreate = () => {
    if (!label || !street || !city || !province || !postalCode || !country) {
      return;
    }

    createAddress.mutate(
      {
        label,
        street,
        city,
        province,
        postalCode,
        country,
      },
      {
        onSuccess: () => {
          setShowCreateForm(false);
          resetForm();
        },
      }
    );
  };

  const handleEdit = (
    addressId: string,
    current: {
      label: string;
      street: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    }
  ) => {
    const nextStreet = window.prompt("Direccion", current.street);
    if (!nextStreet) return;

    updateAddress.mutate({
      addressId,
      data: {
        label: current.label,
        street: nextStreet,
        city: current.city,
        province: current.province,
        postalCode: current.postalCode,
        country: current.country,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Direcciones guardadas</h2>
        <Button onClick={() => setShowCreateForm((current) => !current)}>
          <Plus className="mr-2 h-4 w-4" />
          {showCreateForm ? "Cancelar" : "Agregar direccion"}
        </Button>
      </div>

      {showCreateForm ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded border border-gray-300 px-3 py-2"
              placeholder="Etiqueta"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <input
              className="rounded border border-gray-300 px-3 py-2"
              placeholder="Pais"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            <input
              className="rounded border border-gray-300 px-3 py-2 md:col-span-2"
              placeholder="Direccion"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
            <input
              className="rounded border border-gray-300 px-3 py-2"
              placeholder="Ciudad"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              className="rounded border border-gray-300 px-3 py-2"
              placeholder="Provincia"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            />
            <input
              className="rounded border border-gray-300 px-3 py-2"
              placeholder="Codigo postal"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
            />
            <Button
              className="h-10"
              onClick={handleCreate}
              disabled={createAddress.isPending}
            >
              Guardar direccion
            </Button>
          </div>
        </div>
      ) : null}

      {addresses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="relative rounded-lg border border-gray-200 p-6">
              {address.isDefault ? (
                <span className="absolute top-4 right-4 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Predeterminada
                </span>
              ) : null}

              <div className="mb-4 flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">{address.label}</h3>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={() =>
                    handleEdit(address.id, {
                      label: address.label,
                      street: address.street,
                      city: address.city,
                      province: address.province,
                      postalCode: address.postalCode,
                      country: address.country,
                    })
                  }
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                {!address.isDefault ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultAddress.mutate(address.id)}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Predeterminada
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => deleteAddress.mutate(address.id)}
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
            Agrega tu primera direccion para facilitar tus compras.
          </p>
          <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Agregar direccion
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataAddresses;
