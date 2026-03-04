"use client";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { authService, userService } from "@/services";
import type { IUser } from "@/types";

/**
 * Respuesta extendida de exchange-code.
 * La doc dice { userId, success }, pero el backend puede devolver
 * accessToken y/o user en el body tambien.
 */
interface ExchangeCodeResponse {
  userId: string;
  success: boolean;
  accessToken?: string;
  user?: IUser;
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}

function AuthCallbackContent() {
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
        const code = searchParams.get("code");

        if (!code) {
          throw new Error(
            "No se encontró el código de autenticación en la URL"
          );
        }

        // Paso 1: Intercambiar código OAuth por sesión
        const exchangeResult =
          (await authService.exchangeCode(code)) as ExchangeCodeResponse;

        if (!exchangeResult.success || !exchangeResult.userId) {
          throw new Error("No se pudo completar el intercambio OAuth");
        }

        // Paso 2: Si el backend devolvió accessToken en el body, guardarlo
        // Esto permite que las siguientes llamadas usen Bearer token
        if (exchangeResult.accessToken) {
          authService.saveToken(exchangeResult.accessToken);
        }

        // Paso 3: Obtener datos del usuario
        let user: IUser | null = null;

        // Si el exchange devolvió datos del usuario, usarlos directo
        if (exchangeResult.user && exchangeResult.user.id) {
          user = exchangeResult.user;
        }

        // Si no, intentar obtener el perfil del usuario vía API
        if (!user) {
          try {
            user = await userService.getUserById(exchangeResult.userId);
          } catch {
            // getUserById falló — probablemente 401 porque el backend
            // solo lee Bearer token del header, no la cookie HttpOnly
            // que setea exchange-code. Es una limitación conocida del backend.
          }
        }

        if (!user) {
          // Autenticación exitosa pero no podemos obtener el perfil.
          // Esto pasa cuando el AuthGuard del backend no lee cookies.
          throw new Error(
            "La autenticación con Google fue exitosa pero no se pudo obtener tu perfil. " +
              "Por favor iniciá sesión con email y contraseña."
          );
        }

        // Paso 4: Guardar sesión en el store
        const token = exchangeResult.accessToken || null;
        login(token, user);

        setStatus("success");
        toast.success(`Bienvenido ${user.name}`);

        const redirectAfterLogin =
          sessionStorage.getItem("redirectAfterLogin");
        if (redirectAfterLogin) {
          sessionStorage.removeItem("redirectAfterLogin");
        }

        setTimeout(() => {
          router.push(redirectAfterLogin || "/");
        }, 800);
      } catch (error) {
        console.error("Error en callback OAuth:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Error al completar el inicio de sesión"
        );

        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    };

    handleCallback();
  }, [searchParams, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Completando inicio de sesión...
            </h2>
            <p className="text-gray-600">Espera un momento</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Inicio de sesión exitoso
            </h2>
            <p className="text-gray-600">Redirigiendo...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Error de autenticación
            </h2>
            <p className="mb-6 text-sm text-gray-600">{errorMessage}</p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/auth/signin">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/">Ir al inicio</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
