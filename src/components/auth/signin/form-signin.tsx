"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CollectionSection from "@/components/auth/signin/collection-section";
import NewCostumer from "@/components/auth/signin/new-costumer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Por favor ingresa una dirección de email válida"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function FormSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.info("[v0] Login data:", data);
    // Handle login logic here
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">
            Inicio de Sesión del Cliente
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Formulario de Login */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">
                Clientes Registrados
              </h2>
              <p className="mb-6 text-gray-600">
                Si tienes una cuenta, inicia sesión con tu dirección de email.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Tu email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Contraseña <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña"
                    {...register("password")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 px-8 hover:bg-blue-700"
                  >
                    Iniciar Sesión
                  </Button>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </form>
            </div>

            <NewCostumer />
          </div>
        </div>

        <CollectionSection />
      </main>
    </div>
  );
}

export default FormSignin;
