"use client";

import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateProductDiscount,
  useCreatePromoCode,
  useDeleteProductDiscount,
  useDeletePromoCode,
  useProductDiscounts,
  usePromoCodes,
  useUpdateProductDiscount,
  useUpdatePromoCode,
} from "@/hooks";
import type { DiscountType } from "@/types";

export default function AdminDiscountsPage() {
  const [discountType, setDiscountType] = useState<DiscountType>("percentage");
  const [promoType, setPromoType] = useState<DiscountType>("percentage");

  const [productId, setProductId] = useState("");
  const [discountValue, setDiscountValue] = useState("10");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountEndDate, setDiscountEndDate] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoValue, setPromoValue] = useState("10");
  const [promoMaxUses, setPromoMaxUses] = useState("100");
  const [promoUsesPerUser, setPromoUsesPerUser] = useState("1");
  const [promoStartDate, setPromoStartDate] = useState("");
  const [promoEndDate, setPromoEndDate] = useState("");

  const [editProductDiscount, setEditProductDiscount] = useState<{
    id: string;
    value: string;
  } | null>(null);
  const [editPromoDialog, setEditPromoDialog] = useState<{
    id: string;
    value: string;
  } | null>(null);
  const [deleteProductDiscountId, setDeleteProductDiscountId] = useState<
    string | null
  >(null);
  const [deletePromoCodeId, setDeletePromoCodeId] = useState<string | null>(
    null
  );

  const { data: productDiscounts = [], isLoading: isLoadingDiscounts } =
    useProductDiscounts();
  const { data: promoCodes = [], isLoading: isLoadingPromoCodes } =
    usePromoCodes();

  const createProductDiscount = useCreateProductDiscount();
  const updateProductDiscount = useUpdateProductDiscount();
  const deleteProductDiscount = useDeleteProductDiscount();

  const createPromoCode = useCreatePromoCode();
  const updatePromoCode = useUpdatePromoCode();
  const deletePromoCode = useDeletePromoCode();

  const handleCreateProductDiscount = () => {
    if (!productId || !discountStartDate || !discountEndDate) return;

    createProductDiscount.mutate({
      productId,
      discountType,
      value: Number(discountValue),
      startDate: new Date(discountStartDate).toISOString(),
      endDate: new Date(discountEndDate).toISOString(),
      isActive: true,
    });
  };

  const handleCreatePromoCode = () => {
    if (!promoCode || !promoStartDate || !promoEndDate) return;

    createPromoCode.mutate({
      code: promoCode.trim().toUpperCase(),
      discountType: promoType,
      value: Number(promoValue),
      maxUses: Number(promoMaxUses),
      usesPerUser: Number(promoUsesPerUser),
      startDate: new Date(promoStartDate).toISOString(),
      endDate: new Date(promoEndDate).toISOString(),
      isActive: true,
    });
  };

  const isEditProductDiscountValueValid =
    !!editProductDiscount &&
    editProductDiscount.value.trim() !== "" &&
    Number.isFinite(Number(editProductDiscount.value));

  const isEditPromoValueValid =
    !!editPromoDialog &&
    editPromoDialog.value.trim() !== "" &&
    Number.isFinite(Number(editPromoDialog.value));

  const handleConfirmEditProductDiscount = async () => {
    if (!editProductDiscount) return;
    await updateProductDiscount.mutateAsync({
      id: editProductDiscount.id,
      data: { value: Number(editProductDiscount.value) },
    });
    setEditProductDiscount(null);
  };

  const handleConfirmEditPromoCode = async () => {
    if (!editPromoDialog) return;
    await updatePromoCode.mutateAsync({
      id: editPromoDialog.id,
      data: { value: Number(editPromoDialog.value) },
    });
    setEditPromoDialog(null);
  };

  const handleConfirmDeleteProductDiscount = async () => {
    if (!deleteProductDiscountId) return;
    await deleteProductDiscount.mutateAsync(deleteProductDiscountId);
    setDeleteProductDiscountId(null);
  };

  const handleConfirmDeletePromoCode = async () => {
    if (!deletePromoCodeId) return;
    await deletePromoCode.mutateAsync(deletePromoCodeId);
    setDeletePromoCodeId(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Gestion de descuentos</h1>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Descuento por producto
        </h2>

        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Product ID"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
          />
          <select
            className="rounded border border-border px-3 py-2"
            value={discountType}
            onChange={(event) => setDiscountType(event.target.value as DiscountType)}
          >
            <option value="percentage">Porcentaje</option>
            <option value="fixed">Monto fijo</option>
          </select>
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Valor"
            type="number"
            value={discountValue}
            onChange={(event) => setDiscountValue(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            type="date"
            value={discountStartDate}
            onChange={(event) => setDiscountStartDate(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            type="date"
            value={discountEndDate}
            onChange={(event) => setDiscountEndDate(event.target.value)}
          />
          <Button
            onClick={handleCreateProductDiscount}
            disabled={createProductDiscount.isPending}
            className="h-10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Crear descuento
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-3 py-2">Producto</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Valor</th>
                <th className="px-3 py-2">Activo</th>
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingDiscounts ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                    Cargando...
                  </td>
                </tr>
              ) : productDiscounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                    No hay descuentos cargados
                  </td>
                </tr>
              ) : (
                productDiscounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-border">
                    <td className="px-3 py-2 font-mono text-xs">{discount.productId}</td>
                    <td className="px-3 py-2">{discount.discountType}</td>
                    <td className="px-3 py-2">{discount.value}</td>
                    <td className="px-3 py-2">{discount.isActive ? "Si" : "No"}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditProductDiscount({
                              id: discount.id,
                              value: String(discount.value),
                            })
                          }
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteProductDiscountId(discount.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Codigos promocionales
        </h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="PROMO10"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
          />
          <select
            className="rounded border border-border px-3 py-2"
            value={promoType}
            onChange={(event) => setPromoType(event.target.value as DiscountType)}
          >
            <option value="percentage">Porcentaje</option>
            <option value="fixed">Monto fijo</option>
          </select>
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Valor"
            type="number"
            value={promoValue}
            onChange={(event) => setPromoValue(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Max usos"
            type="number"
            value={promoMaxUses}
            onChange={(event) => setPromoMaxUses(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Usos por usuario"
            type="number"
            value={promoUsesPerUser}
            onChange={(event) => setPromoUsesPerUser(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            type="date"
            value={promoStartDate}
            onChange={(event) => setPromoStartDate(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            type="date"
            value={promoEndDate}
            onChange={(event) => setPromoEndDate(event.target.value)}
          />
          <Button
            onClick={handleCreatePromoCode}
            disabled={createPromoCode.isPending}
            className="h-10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Crear codigo
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-3 py-2">Codigo</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Valor</th>
                <th className="px-3 py-2">Usos</th>
                <th className="px-3 py-2">Activo</th>
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingPromoCodes ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                    Cargando...
                  </td>
                </tr>
              ) : promoCodes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                    No hay codigos cargados
                  </td>
                </tr>
              ) : (
                promoCodes.map((promo) => (
                  <tr key={promo.id} className="border-b border-border">
                    <td className="px-3 py-2 font-mono text-xs">{promo.code}</td>
                    <td className="px-3 py-2">{promo.discountType}</td>
                    <td className="px-3 py-2">{promo.value}</td>
                    <td className="px-3 py-2">
                      {promo.currentUses}/{promo.maxUses}
                    </td>
                    <td className="px-3 py-2">{promo.isActive ? "Si" : "No"}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditPromoDialog({
                              id: promo.id,
                              value: String(promo.value),
                            })
                          }
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeletePromoCodeId(promo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ActionDialog
        open={Boolean(editProductDiscount)}
        onOpenChange={(open) => {
          if (!open) setEditProductDiscount(null);
        }}
        title="Actualizar descuento"
        description="Ingresa el nuevo valor para el descuento."
        confirmLabel="Guardar"
        isPending={updateProductDiscount.isPending}
        confirmDisabled={!isEditProductDiscountValueValid}
        onConfirm={handleConfirmEditProductDiscount}
      >
        <input
          type="number"
          value={editProductDiscount?.value || ""}
          onChange={(event) =>
            setEditProductDiscount((prev) =>
              prev
                ? {
                    ...prev,
                    value: event.target.value,
                  }
                : prev
            )
          }
          className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          placeholder="Valor de descuento"
        />
      </ActionDialog>

      <ActionDialog
        open={Boolean(editPromoDialog)}
        onOpenChange={(open) => {
          if (!open) setEditPromoDialog(null);
        }}
        title="Actualizar valor del codigo"
        description="Ingresa el nuevo valor para el codigo promocional."
        confirmLabel="Guardar"
        isPending={updatePromoCode.isPending}
        confirmDisabled={!isEditPromoValueValid}
        onConfirm={handleConfirmEditPromoCode}
      >
        <input
          type="number"
          value={editPromoDialog?.value || ""}
          onChange={(event) =>
            setEditPromoDialog((prev) =>
              prev
                ? {
                    ...prev,
                    value: event.target.value,
                  }
                : prev
            )
          }
          className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          placeholder="Valor del codigo"
        />
      </ActionDialog>

      <ActionDialog
        open={Boolean(deleteProductDiscountId)}
        onOpenChange={(open) => {
          if (!open) setDeleteProductDiscountId(null);
        }}
        title="Desactivar descuento"
        description="Esta accion desactivara el descuento del producto."
        confirmLabel="Desactivar"
        variant="destructive"
        isPending={deleteProductDiscount.isPending}
        onConfirm={handleConfirmDeleteProductDiscount}
      />

      <ActionDialog
        open={Boolean(deletePromoCodeId)}
        onOpenChange={(open) => {
          if (!open) setDeletePromoCodeId(null);
        }}
        title="Desactivar codigo promocional"
        description="Esta accion desactivara el codigo promocional."
        confirmLabel="Desactivar"
        variant="destructive"
        isPending={deletePromoCode.isPending}
        onConfirm={handleConfirmDeletePromoCode}
      />
    </div>
  );
}

