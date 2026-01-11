"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";

/**
 * Guard para proteger rutas de administrador
 * Verifica que el usuario esté autenticado y tenga rol ADMIN o SUPER_ADMIN
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Si no está autenticado, redirigir al login
      if (!isAuthenticated) {
        router.push("/auth/signin");
        return;
      }

      // Si no tiene rol de admin, redirigir al home
      if (user && user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
        router.push("/");
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado o no es admin, no mostrar nada (se está redirigiendo)
  if (!isAuthenticated || !user || (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)) {
    return null;
  }

  // Usuario autenticado y con permisos correctos
  return <>{children}</>;
}
