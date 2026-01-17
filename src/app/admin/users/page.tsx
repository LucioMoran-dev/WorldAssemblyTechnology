"use client";

import { Search, UserPlus, Edit, Trash2, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useGetUsers, useDeleteUser, useRestoreUser, useChangeUserRole } from "@/hooks";
import { UserRole } from "@/types";

// Helper para traducir roles
const translateRole = (role: UserRole): string => {
  const translations = {
    [UserRole.CUSTOMER]: "Cliente",
    [UserRole.ADMIN]: "Administrador",
    [UserRole.SUPER_ADMIN]: "Super Admin",
  };
  return translations[role] || role;
};

// Helper para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [page, setPage] = useState(1);

  const { data: usersData, isLoading } = useGetUsers({ page, limit: 10 });
  const deleteUser = useDeleteUser();
  const restoreUser = useRestoreUser();
  const changeRole = useChangeUserRole();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario "${name}"?`)) {
      await deleteUser.mutateAsync(id);
    }
  };

  const handleRestore = async (id: string, name: string) => {
    if (window.confirm(`¿Deseas restaurar al usuario "${name}"?`)) {
      await restoreUser.mutateAsync(id);
    }
  };

  const handleChangeRole = async (id: string, currentRole: UserRole, name: string) => {
    const newRole = prompt(
      `Cambiar rol de ${name}\nRol actual: ${translateRole(currentRole)}\n\nEscribe el nuevo rol:\n- customer (Cliente)\n- admin (Administrador)\n- super_admin (Super Admin)`,
      currentRole
    );

    if (newRole && Object.values(UserRole).includes(newRole as UserRole)) {
      await changeRole.mutateAsync({
        id,
        data: { role: newRole as UserRole },
      });
    } else if (newRole) {
      alert("Rol inválido. Debe ser: customer, admin o super_admin");
    }
  };

  const filteredUsers = usersData?.items.filter((user) => {
    const matchesSearch = searchTerm
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Usuarios
        </h1>
        <Button className="flex items-center gap-2" disabled>
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
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "")}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Todos los Roles</option>
            <option value={UserRole.CUSTOMER}>Cliente</option>
            <option value={UserRole.ADMIN}>Administrador</option>
            <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
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
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-12 animate-pulse rounded bg-gray-200"></div>
                    </td>
                  </tr>
                ))
              ) : filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                          {user.name.charAt(0).toUpperCase()}
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
                          user.role === UserRole.SUPER_ADMIN
                            ? "bg-red-100 text-red-700"
                            : user.role === UserRole.ADMIN
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {translateRole(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleChangeRole(user.id, user.role, user.name)}
                          disabled={changeRole.isPending}
                          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 disabled:opacity-50"
                          title="Cambiar rol"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {user.isActive ? (
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            disabled={deleteUser.isPending}
                            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestore(user.id, user.name)}
                            disabled={restoreUser.isPending}
                            className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50"
                            title="Restaurar usuario"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600">
            Mostrando {filteredUsers?.length || 0} de {usersData?.total || 0} usuarios
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={!usersData || page >= usersData.pages || isLoading}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
