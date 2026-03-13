"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/hooks";
import type { FormValues } from "@/types/auth.types";
import { schemaForgot } from "@/types/auth.types";

export default function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaForgot),
  });

  const onSubmit = (values: FormValues) => {
    forgotPassword.mutate(values.email);
  };

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-10">
      <div className="border-border bg-card w-full rounded-xl border p-8 shadow-sm">
        <h1 className="text-foreground mb-2 text-2xl font-bold">
          Recuperar contraseña
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Ingresa tu email y te enviaremos instrucciones para restablecer tu
          contraseña.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={forgotPassword.isPending}
          >
            {forgotPassword.isPending
              ? "Enviando..."
              : "Enviar Email de Recuperación"}
          </Button>
        </form>

        <p className="text-muted-foreground mt-5 text-center text-sm">
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
