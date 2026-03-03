"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "sonner";

import { AuthInitializer } from "@/components/auth-initializer";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuración por defecto para todas las queries
            staleTime: 60 * 1000, // 1 minuto
            refetchOnWindowFocus: false, // No refetch al volver a la ventana
            retry: 1, // Reintentar solo 1 vez en caso de error
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* Inicializar auth desde localStorage */}
      <AuthInitializer />

      {/* Toaster para notificaciones */}
      <Toaster position="top-right" richColors />

      {children}

      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
