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
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
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
            "No se encontrÃ³ el cÃ³digo de autenticaciÃ³n en la URL"
          );
        }

        // Paso 1: Intercambiar cÃ³digo OAuth por sesiÃ³n
        const exchangeResult =
          (await authService.exchangeCode(code)) as ExchangeCodeResponse;

        if (!exchangeResult.success || !exchangeResult.userId) {
          throw new Error("No se pudo completar el intercambio OAuth");
        }

        // Paso 2: Si el backend devolviÃ³ accessToken en el body, guardarlo
        // Esto permite que las siguientes llamadas usen Bearer token
        if (exchangeResult.accessToken) {
          authService.saveToken(exchangeResult.accessToken);
        }

        // Paso 3: Obtener datos del usuario
        let user: IUser | null = null;

        // Si el exchange devolviÃ³ datos del usuario, usarlos directo
        if (exchangeResult.user && exchangeResult.user.id) {
          user = exchangeResult.user;
        }

        // Si no, intentar obtener el perfil del usuario vÃ­a API
        if (!user) {
          try {
            user = await userService.getUserById(exchangeResult.userId);
          } catch {
            // getUserById fallÃ³ â€” probablemente 401 porque el backend
            // solo lee Bearer token del header, no la cookie HttpOnly
            // que setea exchange-code. Es una limitaciÃ³n conocida del backend.
          }
        }

        if (!user) {
          // AutenticaciÃ³n exitosa pero no podemos obtener el perfil.
          // Esto pasa cuando el AuthGuard del backend no lee cookies.
          throw new Error(
            "La autenticaciÃ³n con Google fue exitosa pero no se pudo obtener tu perfil. " +
              "Por favor iniciÃ¡ sesiÃ³n con email y contraseÃ±a."
          );
        }

        // Paso 4: Guardar sesiÃ³n en el store
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
            : "Error al completar el inicio de sesiÃ³n"
        );

        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    };

    handleCallback();
  }, [searchParams, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Completando inicio de sesiÃ³n...
            </h2>
            <p className="text-muted-foreground">Espera un momento</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Inicio de sesiÃ³n exitoso
            </h2>
            <p className="text-muted-foreground">Redirigiendo...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Error de autenticaciÃ³n
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">{errorMessage}</p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/auth/signin">Iniciar sesiÃ³n</Link>
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

