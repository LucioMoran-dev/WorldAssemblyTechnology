"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendContactMessage } from "@/hooks";
import type { ContactFormData } from "@/types";
import { contactSchema } from "@/types";

export function FormContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const contactMutation = useSendContactMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      },
    });
  };

  const isSubmitting = contactMutation.isPending;

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Enviar un Mensaje
      </h2>
      <p className="mb-8 text-gray-500">
        Completa el formulario y nuestro equipo te respondera lo antes posible.
      </p>

      {isSubmitted && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-green-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            Tu mensaje fue enviado correctamente. Te contactaremos pronto.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Nombre */}
          <div>
            <Label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nombre Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              {...register("name")}
              className={`h-12 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Correo Electronico <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
              className={`h-12 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Telefono */}
        <div>
          <Label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Telefono <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+54 11 1234 5678"
            {...register("phone")}
            className={`h-12 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Motivo */}
        <div>
          <Label
            htmlFor="reason"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Motivo de Contacto <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            placeholder="Describenos el motivo de tu consulta..."
            rows={5}
            {...register("reason")}
            className={`resize-none ${errors.reason ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
          />
          {errors.reason && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.reason.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 gap-2 bg-blue-600 px-8 text-white hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Enviar Mensaje
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
