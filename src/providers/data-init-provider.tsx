"use client";

import { useEffect, useState } from "react";

import { initializeAppData } from "@/lib/init-data";
import { logger } from "@/utils/logger";

/**
 * Provider que inicializa los datos de la aplicación
 * Se ejecuta una sola vez al cargar la app
 */
export function DataInitProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      initializeAppData()
        .then(() => {
          setIsInitialized(true);
        })
        .catch((error) => {
          logger.error("Error initializing app data", error);
          setIsInitialized(true);
        });
    }
  }, [isInitialized]);

  return <>{children}</>;
}
