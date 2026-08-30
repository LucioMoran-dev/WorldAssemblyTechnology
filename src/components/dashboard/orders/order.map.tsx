"use client";

import { Download, Eye, Package } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useMyOrders } from "@/hooks";
import { OrderStatus } from "@/types";

// Helper para obtener el color del estado
const getStatusColor = (status: OrderStatus) => {
  const colors = {
    [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [OrderStatus.PAID]: "bg-blue-100 text-blue-800",
    [OrderStatus.PROCESSING]: "bg-purple-100 text-purple-800",
    [OrderStatus.SHIPPED]: "bg-indigo-100 text-indigo-800",
    [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-muted text-foreground";
};

// Helper para formatear la fecha
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function OrderMap() {
  const { data: orders, isLoading } = useMyOrders();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <>
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-border p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-bold text-foreground">
                      Pedido #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4 grid gap-4 border-y border-border py-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-semibold text-foreground">
                    ${order.orderDetail.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Articulos</p>
                  <p className="font-semibold text-foreground">
                    {order.orderDetail.items.length} productos
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Numero de Orden
                  </p>
                  <p className="font-semibold text-foreground">
                    #{order.id.slice(0, 8)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Link>
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
        <div className="rounded-lg border border-border p-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No tienes pedidos aun
          </h3>
          <p className="mb-6 text-muted-foreground">
            Comienza a explorar nuestros productos y realiza tu primera compra
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/">Explorar Productos</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default OrderMap;
