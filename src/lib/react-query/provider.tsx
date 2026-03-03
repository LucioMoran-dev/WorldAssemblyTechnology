'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * React Query Provider
 * Configuración global de React Query para toda la aplicación
 */
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tiempo de stale time por defecto (datos se consideran "frescos" durante este tiempo)
            staleTime: 60 * 1000, // 1 minuto
            // No refetch automático cuando el usuario regresa a la ventana
            refetchOnWindowFocus: false,
            // Retry automático en caso de error
            retry: 1,
            // Tiempo de cache
            gcTime: 5 * 60 * 1000, // 5 minutos (anteriormente cacheTime)
          },
          mutations: {
            // Retry en mutations
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}
