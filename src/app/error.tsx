"use client";

import { motion } from "framer-motion";
import { House, RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-muted/40 px-6 py-20 text-center sm:px-8">
      {/* Fondo animado sutil, mismo lenguaje visual que not-found */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="absolute inset-0 -z-10 flex items-center justify-center select-none"
      >
        <div className="text-[22rem] font-black text-amber-200/40 sm:text-[30rem] md:text-[40rem]">
          WAT
        </div>
      </motion.div>

      <motion.div
        initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-xl sm:h-28 sm:w-28 md:h-32 md:w-32"
      >
        <TriangleAlert className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-2 text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl"
      >
        Algo salio mal
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mb-4 text-lg font-semibold text-muted-foreground sm:text-xl md:text-2xl"
      >
        Se nos quemo un circuito
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mb-10 max-w-md text-sm text-muted-foreground sm:text-base md:max-w-xl"
      >
        Hubo un problema al cargar esta seccion. Podes reintentar; si el
        problema sigue, volve al inicio y probá de nuevo en un rato.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button
          onClick={reset}
          className="flex items-center gap-2 bg-amber-500 text-white hover:bg-amber-600"
        >
          <RotateCcw className="h-4 w-4" />
          Reintentar
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-amber-500 text-amber-600 hover:bg-amber-50"
          >
            <House className="h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
      </motion.div>

      {/* El digest es el unico dato util para soporte cuando el mensaje real
          esta oculto en produccion. Solo se muestra si Next lo genero. */}
      {error.digest ? (
        <p className="mt-8 font-mono text-xs text-muted-foreground">
          Codigo de error: {error.digest}
        </p>
      ) : null}
    </main>
  );
}
