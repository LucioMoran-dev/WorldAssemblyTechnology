"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks";
import { userService } from "@/services";
import type { User } from "@/types";

/**
 * Página de callback para OAuth (Google, etc.)
 * Maneja la redirección después del login social
 * Espera recibir: ?token=xxx&userId=xxx
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extraer parámetros de la URL
        const token =
          searchParams.get("token") || searchParams.get("accessToken");
        const userId = searchParams.get("userId") || searchParams.get("id");

        if (!token) {
          throw new Error(
            "Token de autenticación no encontrado en la URL de redirección"
          );
        }

        if (!userId) {
          throw new Error(
            "ID de usuario no encontrado en la URL de redirección"
          );
        }

        // Guardar token temporalmente para que el interceptor lo use
        localStorage.setItem("accessToken", token);

        // Obtener datos completos del usuario desde la API
        const user: User = await userService.getUserById(userId);

        // Guardar en el store de autenticación
        login(token, user);

        setStatus("success");
        toast.success(`¡Bienvenido, ${user.name}!`);

        // Redirigir al home después de 1 segundo
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        console.error("Error en callback de autenticación:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Error al procesar la autenticación"
        );
        toast.error("Error al completar el inicio de sesión");

        // Limpiar token del localStorage si falló
        localStorage.removeItem("accessToken");

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push("/auth/singin");
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Completando inicio de sesión...
            </h2>
            <p className="text-gray-600">Por favor espera un momento</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              ¡Inicio de sesión exitoso!
            </h2>
            <p className="text-gray-600">Redirigiendo a la página principal...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Error al iniciar sesión
            </h2>
            <p className="mb-4 text-gray-600">{errorMessage}</p>
            <p className="text-sm text-gray-500">
              Redirigiendo a la página de inicio de sesión...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
