"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";

import { useAuth } from "@/hooks";
import { ReactQueryProvider } from "@/lib/react-query";
import { DataInitProvider } from "./data-init-provider";

/**
 * Proveedor de inicialización de autenticación
 */
function AuthInitializer({ children }: { children: ReactNode }) {
  const { initialize } = useAuth();

  useEffect(() => {
    // Inicializar auth desde localStorage al montar la app
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

/**
 * Todos los providers de la aplicación en un solo componente
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <DataInitProvider>
        <AuthInitializer>
          {children}
          {/* Toaster de sonner para notificaciones */}
          <Toaster
            position="top-right"
            expand={false}
            richColors
            closeButton
            duration={4000}
          />
        </AuthInitializer>
      </DataInitProvider>
    </ReactQueryProvider>
  );
}
