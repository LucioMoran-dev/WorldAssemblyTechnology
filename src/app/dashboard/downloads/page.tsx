"use client";

import { Download, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { IDownloads } from "@/types";

export default function DownloadsPage() {
  const downloads: IDownloads[] = [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Mis Productos Descargables
      </h1>

      {downloads.length > 0 ? (
        <div className="space-y-4">
          {downloads.map((download: IDownloads) => (
            <div
              key={download.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      {download.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Pedido: {download.orderId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Fecha: {download.date}
                    </p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No tienes productos descargables
          </h3>
          <p className="mb-6 text-gray-600">
            Los productos digitales que compres aparecerán aquí para que puedas
            descargarlos
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/">Explorar Productos</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
