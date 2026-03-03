"use client";

import { AlertTriangle, Check, ChevronLeft, CreditCard, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import OrderSummarySidebar from "@/components/cart/checkout/order-summary-sidebar";
import { Button } from "@/components/ui/button";
import {
  useCartQuery,
  useCheckout,
  useCreatePreference,
  usePreviewDiscounts,
  useValidatePromoCode,
  useValidateStock,
} from "@/hooks";
import type { ICartDiscountPreview, ICheckoutAddressDto } from "@/types";

const CHECKOUT_SHIPPING_STORAGE_KEY = "checkout_shipping_address";

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function ReviewPaymentPage() {
  const router = useRouter();
  const { data: cart, isLoading: isLoadingCart } = useCartQuery();
  const validateStock = useValidateStock();
  const checkout = useCheckout();
  const createPreference = useCreatePreference();
  const previewDiscounts = usePreviewDiscounts();
  const validatePromoCode = useValidatePromoCode();

  const [shippingAddress, setShippingAddress] = useState<ICheckoutAddressDto | null>(
    null
  );
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [discountPreview, setDiscountPreview] = useState<ICartDiscountPreview | null>(
    null
  );

  useEffect(() => {
    const rawAddress = sessionStorage.getItem(CHECKOUT_SHIPPING_STORAGE_KEY);
    if (!rawAddress) {
      return;
    }

    try {
      const parsed = JSON.parse(rawAddress) as ICheckoutAddressDto;
      setShippingAddress(parsed);
    } catch {
      sessionStorage.removeItem(CHECKOUT_SHIPPING_STORAGE_KEY);
    }
  }, []);

  const isPlacingOrder =
    validateStock.isPending || checkout.isPending || createPreference.isPending;

  const totals = useMemo(() => {
    const subtotal = cart?.items?.reduce((sum, item) => sum + item.subtotal, 0) ?? 0;
    if (discountPreview) {
      return {
        subtotal,
        discount: discountPreview.totalDiscount,
        total: discountPreview.total,
      };
    }

    return {
      subtotal,
      discount: 0,
      total: cart?.total ?? subtotal,
    };
  }, [cart, discountPreview]);

  const handleApplyPromo = async () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) {
      toast.error("Ingresa un codigo promocional");
      return;
    }

    try {
      const validationResult = await validatePromoCode.mutateAsync(code);
      if (!validationResult.valid) {
        toast.error(validationResult.message || "Codigo promocional invalido");
        return;
      }

      const preview = await previewDiscounts.mutateAsync(code);
      setDiscountPreview(preview);
      setAppliedPromoCode(code);

      if (preview.promoValid) {
        toast.success("Codigo promocional aplicado");
      } else if (preview.promoErrors.length > 0) {
        toast.error(preview.promoErrors.join(" "));
      }
    } catch {
      // handled by mutations
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      toast.error("Completa primero la direccion de envio");
      router.push("/cart/checkout");
      return;
    }

    if (!cart?.items.length) {
      toast.error("Tu carrito esta vacio");
      router.push("/cart");
      return;
    }

    try {
      const stockValidation = await validateStock.mutateAsync();
      if (!stockValidation.valid) {
        const firstIssue = stockValidation.issues[0];
        toast.error(
          firstIssue
            ? `${firstIssue.productName}: solicitaste ${firstIssue.requested}, disponible ${firstIssue.available}`
            : "No hay stock suficiente para continuar"
        );
        return;
      }

      const order = await checkout.mutateAsync({
        shippingAddress,
        promoCode: appliedPromoCode || undefined,
      });

      const preference = await createPreference.mutateAsync({
        orderId: order.id,
      });

      const checkoutUrl = preference.initPoint || preference.sandboxInitPoint;
      if (!checkoutUrl) {
        toast.error("No se pudo iniciar el pago en MercadoPago");
        return;
      }

      window.location.href = checkoutUrl;
    } catch {
      // handled by mutation hooks
    }
  };

  if (isLoadingCart) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Revision y pago</h1>
          <Button
            onClick={() => router.push("/cart/checkout")}
            variant="outline"
            className="border-gray-300 bg-transparent px-6 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>

        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                <Check className="h-5 w-5" />
              </div>
              <span className="font-semibold text-gray-900">Envio</span>
            </div>
            <div className="h-0.5 w-32 bg-blue-600" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                2
              </div>
              <span className="font-semibold text-blue-600">Revision y pago</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Direccion de envio</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => router.push("/cart/checkout")}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>

              {shippingAddress ? (
                <div className="grid gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-gray-600">Etiqueta</p>
                    <p className="font-medium">{shippingAddress.label}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-600">Pais</p>
                    <p className="font-medium">{shippingAddress.country || "Argentina"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-1 text-sm text-gray-600">Direccion</p>
                    <p className="font-medium">{shippingAddress.street}</p>
                    <p className="font-medium">
                      {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-semibold">No hay direccion de envio seleccionada</p>
                      <p>Debes completar el paso de envio antes de continuar.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-bold">Pago con MercadoPago</h2>
              <p className="text-sm text-gray-600">
                Al confirmar tu pedido te redirigimos a MercadoPago para completar el pago de forma segura.
              </p>

              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-sm text-blue-900">
                  <CreditCard className="h-4 w-4" />
                  <span>
                    Total a pagar: <strong>{formatMoney(totals.total)}</strong>
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="mt-6 h-14 w-full bg-blue-600 text-lg font-semibold text-white hover:bg-blue-700"
                disabled={isPlacingOrder || !shippingAddress || !cart?.items.length}
              >
                {isPlacingOrder ? "Procesando..." : "Confirmar pedido y pagar"}
              </Button>
            </div>
          </div>

          <OrderSummarySidebar
            promoCode={promoCodeInput}
            onPromoCodeChange={setPromoCodeInput}
            onApplyPromo={handleApplyPromo}
            isApplyingPromo={validatePromoCode.isPending || previewDiscounts.isPending}
            discountPreview={discountPreview}
          />
        </div>
      </main>
    </div>
  );
}
