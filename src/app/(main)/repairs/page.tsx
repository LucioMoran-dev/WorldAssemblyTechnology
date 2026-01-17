"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Wrench,
  Laptop,
  Monitor,
  HardDrive,
  Cpu,
  Package,
  CheckCircle2,
  Clock,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const repairSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  deviceType: z.string().min(1, "Selecciona un tipo de dispositivo"),
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  issueDescription: z
    .string()
    .min(10, "Describe el problema con al menos 10 caracteres"),
  urgency: z.string().min(1, "Selecciona la urgencia"),
});

type RepairFormData = z.infer<typeof repairSchema>;

export default function RepairsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RepairFormData>({
    resolver: zodResolver(repairSchema),
  });

  const onSubmit = (data: RepairFormData) => {
    console.log("Repair request:", data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  const deviceTypes = [
    { icon: Laptop, name: "Laptop", value: "laptop" },
    { icon: Monitor, name: "Desktop PC", value: "desktop" },
    { icon: Monitor, name: "Monitor", value: "monitor" },
    { icon: HardDrive, name: "Disco Duro", value: "hard-drive" },
    { icon: Cpu, name: "Componente", value: "component" },
    { icon: Package, name: "Otro", value: "other" },
  ];

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <Wrench className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold md:text-5xl">
                  Servicio de Reparaciones
                </h1>
              </div>
              <p className="mb-6 text-xl text-blue-100">
                Expertos certificados para reparar tu equipo tecnológico.
                Diagnóstico gratuito y garantía de 90 días.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>Técnicos Certificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-300" />
                  <span>Reparación Rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-300" />
                  <span>Garantía 90 Días</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Solicitar Reparación
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Completa el formulario y nos contactaremos contigo en menos
                    de 24 horas.
                  </p>

                  {isSubmitted ? (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
                      <h3 className="mb-2 text-xl font-bold text-green-900">
                        Solicitud Enviada
                      </h3>
                      <p className="text-green-700">
                        Hemos recibido tu solicitud. Te contactaremos pronto
                        para coordinar la reparación.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
                          Información de Contacto
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              Nombre Completo *
                            </label>
                            <Input
                              {...register("fullName")}
                              placeholder="Juan Pérez"
                              className={
                                errors.fullName ? "border-red-500" : ""
                              }
                            />
                            {errors.fullName && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.fullName.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                          <label className="mb-1 block text-sm font-medium text-gray-700">
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
                        <h3 className="font-semibold text-gray-900">
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
                              <device.icon className="mb-2 h-8 w-8 text-gray-400 peer-checked:text-blue-600" />
                              <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-600">
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
                        <h3 className="font-semibold text-gray-900">
                          Detalles del Dispositivo
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                        <h3 className="font-semibold text-gray-900">
                          Descripción del Problema
                        </h3>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Describe el problema *
                          </label>
                          <textarea
                            {...register("issueDescription")}
                            rows={4}
                            placeholder="Por ejemplo: La pantalla no enciende, se calienta mucho, hace ruidos extraños, etc."
                            className={`w-full resize-none rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors.issueDescription
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.issueDescription && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.issueDescription.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Urgencia *
                          </label>
                          <select
                            {...register("urgency")}
                            className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors.urgency
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Selecciona una opción</option>
                            <option value="low">
                              Baja - Puedo esperar 5-7 días
                            </option>
                            <option value="medium">
                              Media - Necesito en 2-3 días
                            </option>
                            <option value="high">
                              Alta - Urgente (24-48 horas)
                            </option>
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

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-gray-900">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="mb-1 text-gray-600">Teléfono</p>
                      <p className="font-medium text-gray-900">
                        (00) 1234 5678
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        reparaciones@techstore.com
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-gray-600">Horario</p>
                      <p className="font-medium text-gray-900">
                        Lun-Jue: 9:00 AM - 5:30 PM
                      </p>
                      <p className="font-medium text-gray-900">
                        Vie: 9:00 AM - 6:00 PM
                      </p>
                      <p className="font-medium text-gray-900">
                        Sáb: 11:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                  <h3 className="mb-4 font-bold text-gray-900">
                    Servicios que Ofrecemos
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>Reparación de laptops y notebooks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>Mantenimiento de PCs de escritorio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>Reemplazo de pantallas y teclados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>Recuperación de datos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>Limpieza y optimización</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>Instalación de software</span>
                    </li>
                  </ul>
                </div>

                {/* Warranty */}
                <div className="rounded-xl bg-gray-900 p-6 text-white">
                  <Shield className="mb-3 h-10 w-10 text-blue-400" />
                  <h3 className="mb-2 font-bold">Garantía de 90 Días</h3>
                  <p className="text-sm text-gray-300">
                    Todas nuestras reparaciones incluyen garantía de 90 días en
                    mano de obra y repuestos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">
                  Soporte Técnico Experto
                </h3>
                <p className="text-sm text-gray-600">
                  Técnicos certificados con años de experiencia en reparación de
                  equipos.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">
                  Reparación Rápida
                </h3>
                <p className="text-sm text-gray-600">
                  La mayoría de reparaciones se completan en 2-3 días hábiles.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">
                  Garantía Extendida
                </h3>
                <p className="text-sm text-gray-600">
                  90 días de garantía en todas las reparaciones realizadas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
