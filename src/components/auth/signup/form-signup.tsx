"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AxiosError } from "axios";

import AccountCostumer from "@/components/auth/signup/account-costumer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre completo debe tener al menos 3 caracteres"),
    email: z.string().email("Por favor ingresa una dirección de email válida"),
    phone: z
      .string()
      .min(10, "Por favor ingresa un número de teléfono válido")
      .regex(/^\+?\d+$/, "El teléfono solo debe contener números"),
    birthdate: z.string().min(1, "La fecha de nacimiento es requerida"),
    address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales"
      ),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function FormSignup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      await authService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        birthDate: data.birthdate,
        username: data.username,
        phone: data.phone,
        address: data.address,
      });

      toast.success("¡Cuenta creada exitosamente! Por favor inicia sesión.");
      router.push("/auth/signin");
    } catch (error: unknown) {
      const message =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "Error al crear la cuenta";
      toast.error(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Registro de Cliente</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Formulario de Registro */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">Crear Nueva Cuenta</h2>
              <p className="mb-6 text-gray-600">
                Completa tu información para crear tu cuenta.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Nombre Completo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium"
                    >
                      Nombre de Usuario <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Tu nombre de usuario"
                      {...register("username")}
                      className={errors.username ? "border-red-500" : ""}
                    />
                    {errors.username && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Dirección de Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Tu email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium"
                    >
                      Número de Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Tu teléfono"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="birthdate"
                      className="mb-2 block text-sm font-medium"
                    >
                      Fecha de Nacimiento{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="birthdate"
                      type="date"
                      {...register("birthdate")}
                      className={errors.birthdate ? "border-red-500" : ""}
                    />
                    {errors.birthdate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.birthdate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium"
                  >
                    Dirección <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Tu dirección"
                    {...register("address")}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address.message}
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
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium"
                  >
                    Confirmar Contraseña <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmar contraseña"
                    {...register("confirmPassword")}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
                >
                  Crear Cuenta
                </Button>
              </form>
            </div>

            <AccountCostumer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormSignup;
