"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useMyAddresses } from "@/hooks";
import { cartService } from "@/services";
import type { ICheckoutAddressDto } from "@/types";

const CHECKOUT_SHIPPING_STORAGE_KEY = "checkout_shipping_address";

const addressSchema = z.object({
  label: z.string().min(2, "Etiqueta requerida"),
  street: z.string().min(5, "Dirección requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  province: z.string().min(2, "Provincia requerida"),
  postalCode: z.string().min(3, "Código postal requerido"),
  country: z.string().min(2, "País requerido"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

function ShippingForm() {
  const router = useRouter();
  const authUser = useAuth((state) => state.user);
  const { data: addresses = [], isLoading } = useMyAddresses();

  const hasSavedAddresses = addresses.length > 0;
  const [mode, setMode] = useState<"existing" | "new" | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAddressId = useMemo(() => {
    const preferred = addresses.find((address) => address.isDefault);
    return preferred?.id ?? addresses[0]?.id ?? "";
  }, [addresses]);

  useEffect(() => {
    if (isLoading) return;
    if (hasSavedAddresses) {
      setMode((current) => (current === "new" ? current : "existing"));
      setSelectedAddressId((current) => current || defaultAddressId);
    } else {
      setMode("new");
      setSelectedAddressId("");
    }
  }, [isLoading, hasSavedAddresses, defaultAddressId]);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "Casa",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "Argentina",
    },
  });

  const saveShippingAddressAndContinue = (address: ICheckoutAddressDto) => {
    sessionStorage.setItem(CHECKOUT_SHIPPING_STORAGE_KEY, JSON.stringify(address));
    router.push("/cart/review-payment");
  };

  const handleContinue = async () => {
    setIsSubmitting(true);

    try {
      if (mode === "existing") {
        if (!selectedAddressId) {
          toast.error("Selecciona una direccion para continuar");
          return;
        }

        const selectedAddress = addresses.find(
          (address) => address.id === selectedAddressId
        );

        if (!selectedAddress) {
          toast.error("La direccion seleccionada no es valida");
          return;
        }

        await cartService.selectAddress({ addressId: selectedAddressId });

        saveShippingAddressAndContinue({
          label: selectedAddress.label,
          street: selectedAddress.street,
          city: selectedAddress.city,
          province: selectedAddress.province,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country,
          isDefault: selectedAddress.isDefault,
        });

        return;
      }

      const isValid = await trigger();
      if (!isValid) {
        return;
      }

      const values = getValues();
      saveShippingAddressAndContinue(values);
    } catch {
      toast.error("No se pudo guardar la direccion de envio");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-foreground">Direccion de envio</h2>
        {authUser?.email && (
          <p className="mb-6 text-sm text-muted-foreground">Sesion: {authUser.email}</p>
        )}

        {isLoading || mode === null ? (
          <div className="space-y-3">
            <div className="h-16 animate-pulse rounded-lg bg-muted" />
            <div className="h-16 animate-pulse rounded-lg bg-muted" />
            <div className="h-16 animate-pulse rounded-lg bg-muted" />
          </div>
        ) : (
          <div className="space-y-6">
            {hasSavedAddresses && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={mode === "existing" ? "default" : "outline"}
                    onClick={() => setMode("existing")}
                  >
                    Usar direccion guardada
                  </Button>
                  <Button
                    type="button"
                    variant={mode === "new" ? "default" : "outline"}
                    onClick={() => setMode("new")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Usar direccion nueva
                  </Button>
                </div>

                {mode === "existing" && (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4"
                      >
                        <input
                          type="radio"
                          name="saved-address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={(event) => setSelectedAddressId(event.target.value)}
                          className="mt-1"
                        />
                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="font-semibold text-foreground">
                            {address.label}
                            {address.isDefault ? " (Predeterminada)" : ""}
                          </p>
                          <p className="text-muted-foreground">{address.street}</p>
                          <p className="text-muted-foreground">
                            {address.city}, {address.province} {address.postalCode}
                          </p>
                          <p className="text-muted-foreground">{address.country}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {mode === "new" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="label">Etiqueta</Label>
                    <Input id="label" placeholder="Casa" {...register("label")} />
                    {errors.label && (
                      <p className="mt-1 text-xs text-red-600">{errors.label.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Pais</Label>
                    <Input id="country" placeholder="Argentina" {...register("country")} />
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="street">Direccion</Label>
                  <Input id="street" placeholder="Calle 123" {...register("street")} />
                  {errors.street && (
                    <p className="mt-1 text-xs text-red-600">{errors.street.message}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" placeholder="Buenos Aires" {...register("city")} />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="province">Provincia</Label>
                    <Input id="province" placeholder="CABA" {...register("province")} />
                    {errors.province && (
                      <p className="mt-1 text-xs text-red-600">{errors.province.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Codigo postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="1001"
                      {...register("postalCode")}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Button
              type="button"
              className="h-12 w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleContinue}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Continuar a revision y pago"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShippingForm;

