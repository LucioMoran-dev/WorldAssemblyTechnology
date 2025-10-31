"use client";

import { Package, Eye, Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { orders } from "@/seeds";

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Pedido {order.id}
                    </h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${order.statusColor}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4 grid gap-4 border-y border-gray-200 py-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold text-gray-900">{order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Artículos</p>
                  <p className="font-semibold text-gray-900">
                    {order.items} productos
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Número de Orden</p>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Factura
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No tienes pedidos aún
          </h3>
          <p className="mb-6 text-gray-600">
            Comienza a explorar nuestros productos y realiza tu primera compra
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/">Explorar Productos</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
