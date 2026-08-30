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
          <div key={index} className="h-48 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Direcciones guardadas
        </h2>
        <Button onClick={() => setShowCreateForm((current) => !current)}>
          <Plus className="mr-2 h-4 w-4" />
          {showCreateForm ? "Cancelar" : "Agregar direccion"}
        </Button>
      </div>

      {showCreateForm ? (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded border border-border px-3 py-2"
              placeholder="Etiqueta"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <input
              className="rounded border border-border px-3 py-2"
              placeholder="Pais"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            <input
              className="rounded border border-border px-3 py-2 md:col-span-2"
              placeholder="Direccion"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
            <input
              className="rounded border border-border px-3 py-2"
              placeholder="Ciudad"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              className="rounded border border-border px-3 py-2"
              placeholder="Provincia"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            />
            <input
              className="rounded border border-border px-3 py-2"
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
              className="relative rounded-lg border border-border p-6"
            >
              {address.isDefault ? (
                <span className="absolute top-4 right-4 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Predeterminada
                </span>
              ) : null}

              <div className="mb-4 flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {address.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {address.street}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.country}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
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
        <div className="rounded-lg border border-border p-12 text-center">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No hay direcciones guardadas
          </h3>
          <p className="mb-6 text-muted-foreground">
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
          <label className="text-sm font-medium text-muted-foreground">
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
            className="w-full rounded-lg border border-border px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
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
