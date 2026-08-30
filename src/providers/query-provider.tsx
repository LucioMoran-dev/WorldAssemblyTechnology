"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Toaster } from "sonner";

import { AuthInitializer } from "@/components/auth-initializer";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* Inicializar auth desde localStorage */}
      <AuthInitializer />

      {/* Toaster para notificaciones */}
      <Toaster
        position="top-right"
        richColors
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />

      {children}

      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
