"use client";

import { Search, Eye, Download } from "lucide-react";
import { useState } from "react";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Órdenes</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Exportar
        </button>
      </div>

      {/* Filtros */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número de orden o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Todos los Estados</option>
            <option value="pending">Pendiente</option>
            <option value="processing">En Proceso</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
      </div>

      {/* Tabla de Órdenes */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Orden #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#12345",
                  customer: "Juan Pérez",
                  email: "juan@example.com",
                  date: "15/12/2025",
                  total: "$1,299.00",
                  status: "Completada",
                },
                {
                  id: "#12346",
                  customer: "María García",
                  email: "maria@example.com",
                  date: "15/12/2025",
                  total: "$899.00",
                  status: "Pendiente",
                },
                {
                  id: "#12347",
                  customer: "Carlos López",
                  email: "carlos@example.com",
                  date: "14/12/2025",
                  total: "$1,499.00",
                  status: "En Proceso",
                },
                {
                  id: "#12348",
                  customer: "Ana Martínez",
                  email: "ana@example.com",
                  date: "14/12/2025",
                  total: "$699.00",
                  status: "Completada",
                },
                {
                  id: "#12349",
                  customer: "Luis Rodríguez",
                  email: "luis@example.com",
                  date: "13/12/2025",
                  total: "$2,199.00",
                  status: "Pendiente",
                },
              ].map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "Completada"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
