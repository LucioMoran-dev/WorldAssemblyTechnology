"use client";

import { Search, UserPlus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Usuarios
        </h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      {/* Filtros */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Todos los Roles</option>
            <option value="admin">Administrador</option>
            <option value="customer">Cliente</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Fecha de Registro
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Órdenes
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Juan Pérez",
                  email: "juan@example.com",
                  role: "Cliente",
                  registeredDate: "10/12/2024",
                  orders: 12,
                },
                {
                  name: "María García",
                  email: "maria@example.com",
                  role: "Cliente",
                  registeredDate: "15/11/2024",
                  orders: 8,
                },
                {
                  name: "Admin User",
                  email: "admin@shop.com",
                  role: "Administrador",
                  registeredDate: "01/01/2024",
                  orders: 0,
                },
                {
                  name: "Carlos López",
                  email: "carlos@example.com",
                  role: "Cliente",
                  registeredDate: "20/10/2024",
                  orders: 5,
                },
              ].map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === "Administrador"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.registeredDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.orders}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
