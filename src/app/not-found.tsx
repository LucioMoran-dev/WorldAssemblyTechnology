"use client";

import { motion } from "framer-motion";
import { Monitor, Compass, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 px-6 py-20 text-center sm:px-8">
      {/* Fondo animado sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="absolute inset-0 -z-10 flex items-center justify-center select-none"
      >
        <div className="text-[22rem] font-black text-blue-200/40 sm:text-[30rem] md:text-[40rem]">
          WAT
        </div>
      </motion.div>

      {/* Ícono principal */}
      <motion.div
        initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl sm:h-28 sm:w-28 md:h-32 md:w-32"
      >
        <Monitor className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />
      </motion.div>

      {/* Título y subtítulo */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-2 text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mb-4 text-xl font-semibold text-gray-700 sm:text-2xl md:text-3xl"
      >
        ¡Te perdiste en la Matrix!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mb-10 max-w-md text-sm text-gray-500 sm:text-base md:max-w-xl"
      >
        Parece que este circuito no existe en nuestro sistema. Pero no te
        preocupes, nuestro equipo de robots ya está trabajando en ello 🧠🤖
      </motion.p>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link href="/">
          <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
        <Link href="/laptops">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Compass className="h-4 w-4" />
            Explorar productos
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
