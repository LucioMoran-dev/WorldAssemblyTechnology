import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks";
import type { FormValuesReset } from "@/types/auth.types";
import { schemaReset } from "@/types/auth.types";

export function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPassword = useResetPassword();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesReset>({
    resolver: zodResolver(schemaReset),
  });

  const onSubmit = (values: FormValuesReset) => {
    if (!token || !email) return;

    resetPassword.mutate(
      {
        token,
        email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      },
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
        <div className="w-full rounded-xl border border-red-200 bg-card p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-red-700">
            Token inválido
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            El enlace de recuperación no es válido o ya venció.
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
      <div className="w-full rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Restablecer contraseña
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Ingresa tu nueva contraseña para continuar.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={resetPassword.isPending}
          >
            {resetPassword.isPending
              ? "Actualizando..."
              : "Actualizar contraseña"}
          </Button>
        </form>
      </div>
    </main>
  );
}
