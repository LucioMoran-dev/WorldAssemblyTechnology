"use client";

import { useEffect, useState } from "react";
import { initializeAppData } from "@/lib/init-data";

/**
 * Provider que inicializa los datos de la aplicación
 * Se ejecuta una sola vez al cargar la app
 */
export function DataInitProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Solo inicializar una vez
    if (!isInitialized) {
      initializeAppData()
        .then(() => {
          setIsInitialized(true);
        })
        .catch((error) => {
          console.error("Error initializing app data:", error);
          // Marcamos como inicializado de todos modos para no bloquear la app
          setIsInitialized(true);
        });
    }
  }, [isInitialized]);

  // Renderizar los hijos inmediatamente, la inicialización es en background
  return <>{children}</>;
}
