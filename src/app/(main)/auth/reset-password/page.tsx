"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Minimo 8 caracteres")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
        message:
          "Debe incluir mayuscula, minuscula, numero y caracter especial",
      }),
    confirmPassword: z.string().min(8, "Confirma tu contrasena"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contrasenas no coinciden",
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPassword = useResetPassword();

  const token = searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    if (!token) {
      return;
    }

    resetPassword.mutate(
      { token, newPassword: values.newPassword },
      {
        onSuccess: () => {
          router.push("/auth/signin");
        },
      }
    );
  };

  if (!token) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-10">
        <div className="w-full rounded-xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-red-700">
            Token invalido
          </h1>
          <p className="mb-6 text-sm text-gray-700">
            El enlace de recuperacion no es valido o ya vencio.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/forgot-password">Solicitar nuevo enlace</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-10">
      <div className="w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Restablecer contrasena
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Ingresa tu nueva contrasena para continuar.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">Nueva contrasena</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            {errors.newPassword ? (
              <p className="mt-1 text-xs text-red-600">
                {errors.newPassword.message}
              </p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar contrasena</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={resetPassword.isPending}
          >
            {resetPassword.isPending
              ? "Actualizando..."
              : "Actualizar contrasena"}
          </Button>
        </form>
      </div>
    </main>
  );
}
