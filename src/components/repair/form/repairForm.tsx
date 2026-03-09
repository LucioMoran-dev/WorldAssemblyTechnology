"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmitRepair } from "@/hooks";
import { deviceTypes } from "@/seeds";
import {
  repairSchema,
  type ICreateRepairDto,
  type RepairFormData,
} from "@/types";

export function RepairForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const repairMutation = useSubmitRepair();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RepairFormData>({
    resolver: zodResolver(repairSchema),
  });

  const onSubmit = (data: RepairFormData) => {
    repairMutation.mutate(data as unknown as ICreateRepairDto, {
      onSuccess: () => {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          reset();
        }, 3000);
      },
    });
  };

  return (
    <div className="lg:col-span-2">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Solicitar Reparación
        </h2>
        <p className="mb-6 text-muted-foreground">
          Completa el formulario y nos contactaremos contigo en menos de 24
          horas.
        </p>

        {isSubmitted ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h3 className="mb-2 text-xl font-bold text-green-900">
              Solicitud Enviada
            </h3>
            <p className="text-green-700">
              Hemos recibido tu solicitud. Te contactaremos pronto para
              coordinar la reparación.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Información de Contacto
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Nombre Completo *
                  </label>
                  <Input
                    {...register("fullName")}
                    placeholder="Juan Pérez"
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Email *
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Teléfono *
                </label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="+54 11 1234 5678"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Device Type Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Tipo de Dispositivo *
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {deviceTypes.map((device) => (
                  <label
                    key={device.value}
                    className="relative flex cursor-pointer flex-col items-center rounded-lg border-2 p-4 transition-colors hover:border-blue-500"
                  >
                    <input
                      type="radio"
                      {...register("deviceType")}
                      value={device.value}
                      className="peer sr-only"
                    />
                    <device.icon className="mb-2 h-8 w-8 text-muted-foreground peer-checked:text-blue-600" />
                    <span className="text-sm font-medium text-muted-foreground peer-checked:text-blue-600">
                      {device.name}
                    </span>
                    <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-blue-600" />
                  </label>
                ))}
              </div>
              {errors.deviceType && (
                <p className="text-sm text-red-500">
                  {errors.deviceType.message}
                </p>
              )}
            </div>

            {/* Device Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Detalles del Dispositivo
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Marca *
                  </label>
                  <Input
                    {...register("brand")}
                    placeholder="MSI, ASUS, HP, etc."
                    className={errors.brand ? "border-red-500" : ""}
                  />
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Modelo *
                  </label>
                  <Input
                    {...register("model")}
                    placeholder="GF63 Thin, ROG Strix, etc."
                    className={errors.model ? "border-red-500" : ""}
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.model.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Issue Description */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Descripción del Problema
              </h3>
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Describe el problema *
                </label>
                <textarea
                  {...register("issueDescription")}
                  rows={4}
                  placeholder="Por ejemplo: La pantalla no enciende, se calienta mucho, hace ruidos extraños, etc."
                  className={`w-full resize-none rounded-lg border px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none ${
                    errors.issueDescription
                      ? "border-red-500"
                      : "border-border"
                  }`}
                />
                {errors.issueDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.issueDescription.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Urgencia *
                </label>
                <select
                  {...register("urgency")}
                  className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none ${
                    errors.urgency ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="low">Baja - Puedo esperar 5-7 días</option>
                  <option value="medium">Media - Necesito en 2-3 días</option>
                  <option value="high">Alta - Urgente (24-48 horas)</option>
                </select>
                {errors.urgency && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.urgency.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-blue-600 text-lg text-white hover:bg-blue-700"
            >
              Enviar Solicitud de Reparación
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

