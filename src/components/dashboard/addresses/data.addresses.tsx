"use client";

import { Edit, MapPin, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";

import { ActionDialog } from "@/components/ui/action-dialog";
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
  const [editDialog, setEditDialog] = useState<{
    addressId: string;
    label: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  } | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    addressId: string;
    label: string;
  } | null>(null);

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
    setEditDialog({
      addressId,
      ...current,
    });
  };

  const handleConfirmEdit = async () => {
    if (!editDialog || !editDialog.street.trim()) return;

    await updateAddress.mutateAsync({
      addressId: editDialog.addressId,
      data: {
        label: editDialog.label,
        street: editDialog.street,
        city: editDialog.city,
        province: editDialog.province,
        postalCode: editDialog.postalCode,
        country: editDialog.country,
      },
    });
    setEditDialog(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog) return;
    await deleteAddress.mutateAsync(deleteDialog.addressId);
    setDeleteDialog(null);
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="bg-muted h-48 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-semibold">
          Direcciones guardadas
        </h2>
        <Button onClick={() => setShowCreateForm((current) => !current)}>
          <Plus className="mr-2 h-4 w-4" />
          {showCreateForm ? "Cancelar" : "Agregar direccion"}
        </Button>
      </div>

      {showCreateForm ? (
        <div className="border-border bg-card rounded-lg border p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="border-border rounded border px-3 py-2"
              placeholder="Etiqueta"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <input
              className="border-border rounded border px-3 py-2"
              placeholder="Pais"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            <input
              className="border-border rounded border px-3 py-2 md:col-span-2"
              placeholder="Direccion"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
            <input
              className="border-border rounded border px-3 py-2"
              placeholder="Ciudad"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              className="border-border rounded border px-3 py-2"
              placeholder="Provincia"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            />
            <input
              className="border-border rounded border px-3 py-2"
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
            <div
              key={address.id}
              className="border-border relative rounded-lg border p-6"
            >
              {address.isDefault ? (
                <span className="absolute top-4 right-4 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Predeterminada
                </span>
              ) : null}

              <div className="mb-4 flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-1 h-5 w-5" />
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">
                    {address.label}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {address.street}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {address.country}
                  </p>
                </div>
              </div>

              <div className="border-border flex flex-wrap gap-2 border-t pt-4">
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
                  onClick={() =>
                    setDeleteDialog({
                      addressId: address.id,
                      label: address.label,
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-border rounded-lg border p-12 text-center">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            No hay direcciones guardadas
          </h3>
          <p className="text-muted-foreground mb-6">
            Agrega tu primera direccion para facilitar tus compras.
          </p>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar direccion
          </Button>
        </div>
      )}

      <ActionDialog
        open={Boolean(editDialog)}
        onOpenChange={(open) => {
          if (!open) setEditDialog(null);
        }}
        title="Editar direccion"
        description="Actualiza la calle de la direccion seleccionada."
        confirmLabel="Guardar"
        isPending={updateAddress.isPending}
        confirmDisabled={!editDialog?.street.trim()}
        onConfirm={handleConfirmEdit}
      >
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-medium">
            Direccion
          </label>
          <input
            type="text"
            value={editDialog?.street || ""}
            onChange={(event) =>
              setEditDialog((prev) =>
                prev
                  ? {
                      ...prev,
                      street: event.target.value,
                    }
                  : prev
              )
            }
            className="border-border focus:ring-ring w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
            placeholder="Calle y numero"
          />
        </div>
      </ActionDialog>

      <ActionDialog
        open={Boolean(deleteDialog)}
        onOpenChange={(open) => {
          if (!open) setDeleteDialog(null);
        }}
        title="Eliminar direccion"
        description={
          deleteDialog
            ? `Se eliminara la direccion "${deleteDialog.label}".`
            : undefined
        }
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteAddress.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DataAddresses;
