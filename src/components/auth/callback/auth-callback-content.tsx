import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { authService, userService } from "@/services";
import type { IUser } from "@/types";
import type { ExchangeCodeResponse } from "@/types/auth.types";

export function AuthCallbackContent() {
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
        const exchangeResult = (await authService.exchangeCode(
          code
        )) as ExchangeCodeResponse;

        if (!exchangeResult.success || !exchangeResult.userId) {
          throw new Error("No se pudo completar el intercambio OAuth");
        }

        if (exchangeResult.accessToken) {
          authService.saveToken(exchangeResult.accessToken);
        }

        let user: IUser | null = null;

        if (exchangeResult.user && exchangeResult.user.id) {
          user = exchangeResult.user;
        }
        if (!user) {
          try {
            user = await userService.getUserById(exchangeResult.userId);
          } catch {
            // probable erro, ya controlado
          }
        }

        if (!user) {
          throw new Error(
            "La autenticacion con Google fue exitosa pero no se pudo obtener tu perfil. " +
              "Por favor inicia sesion con email y contraseña."
          );
        }

        const token = exchangeResult.accessToken || null;
        login(token, user);

        setStatus("success");
        toast.success(`Bienvenido ${user.name}`);

        const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
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
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Completando inicio de sesion...
            </h2>
            <p className="text-muted-foreground">Espera un momento</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Inicio de sesion exitoso
            </h2>
            <p className="text-muted-foreground">Redirigiendo...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Error de autenticacion
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">{errorMessage}</p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/auth/signin">Iniciar sesion</Link>
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
