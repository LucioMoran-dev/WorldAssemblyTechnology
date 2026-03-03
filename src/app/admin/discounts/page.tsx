"use client";

import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

  const handleEditProductDiscount = (id: string, currentValue: number) => {
    const newValue = window.prompt("Nuevo valor de descuento", String(currentValue));
    if (!newValue) return;

    updateProductDiscount.mutate({
      id,
      data: { value: Number(newValue) },
    });
  };

  const handleEditPromoCode = (id: string, currentValue: number) => {
    const newValue = window.prompt("Nuevo valor de promo", String(currentValue));
    if (!newValue) return;

    updatePromoCode.mutate({
      id,
      data: { value: Number(newValue) },
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Gestion de descuentos</h1>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Descuento por producto</h2>

        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Product ID"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
          />
          <select
            className="rounded border border-gray-300 px-3 py-2"
            value={discountType}
            onChange={(event) => setDiscountType(event.target.value as DiscountType)}
          >
            <option value="percentage">Porcentaje</option>
            <option value="fixed">Monto fijo</option>
          </select>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Valor"
            type="number"
            value={discountValue}
            onChange={(event) => setDiscountValue(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
            type="date"
            value={discountStartDate}
            onChange={(event) => setDiscountStartDate(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
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
              <tr className="border-b border-gray-200 text-left text-gray-600">
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
                  <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                    Cargando...
                  </td>
                </tr>
              ) : productDiscounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                    No hay descuentos cargados
                  </td>
                </tr>
              ) : (
                productDiscounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-gray-100">
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
                            handleEditProductDiscount(discount.id, discount.value)
                          }
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteProductDiscount.mutate(discount.id)}
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

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Codigos promocionales</h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="PROMO10"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
          />
          <select
            className="rounded border border-gray-300 px-3 py-2"
            value={promoType}
            onChange={(event) => setPromoType(event.target.value as DiscountType)}
          >
            <option value="percentage">Porcentaje</option>
            <option value="fixed">Monto fijo</option>
          </select>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Valor"
            type="number"
            value={promoValue}
            onChange={(event) => setPromoValue(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Max usos"
            type="number"
            value={promoMaxUses}
            onChange={(event) => setPromoMaxUses(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Usos por usuario"
            type="number"
            value={promoUsesPerUser}
            onChange={(event) => setPromoUsesPerUser(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
            type="date"
            value={promoStartDate}
            onChange={(event) => setPromoStartDate(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
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
              <tr className="border-b border-gray-200 text-left text-gray-600">
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
                  <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                    Cargando...
                  </td>
                </tr>
              ) : promoCodes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                    No hay codigos cargados
                  </td>
                </tr>
              ) : (
                promoCodes.map((promo) => (
                  <tr key={promo.id} className="border-b border-gray-100">
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
                          onClick={() => handleEditPromoCode(promo.id, promo.value)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePromoCode.mutate(promo.id)}
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
    </div>
  );
}
