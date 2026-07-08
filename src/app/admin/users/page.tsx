"use client";

import { UserPlus, Edit, Trash2, RotateCcw } from "lucide-react";
import { useState, Suspense } from "react";

import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { SearchInput } from "@/components/filters/search-input";
import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetUsers,
  useDeleteUser,
  useRestoreUser,
  useChangeUserRole,
  useRoles,
  useFilters,
} from "@/hooks";
import { UserRole } from "@/types";

const translateRole = (role: UserRole): string => {
  const translations = {
    [UserRole.CLIENT]: "Cliente",
    [UserRole.ADMIN]: "Administrador",
    [UserRole.SUPER_ADMIN]: "Super Admin",
  };
  return translations[role] || role;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const roleOptions = [
  { value: UserRole.CLIENT, label: "Cliente" },
  { value: UserRole.ADMIN, label: "Administrador" },
  { value: UserRole.SUPER_ADMIN, label: "Super Admin" },
];

function AdminUsersContent() {
  const { filters, page, limit, setFilter, setPage, clearAllFilters, activeFilterCount } = useFilters({
    defaults: { username: "", email: "", role: "" },
    defaultLimit: 10,
  });

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<{ id: string; name: string } | null>(null);
  const [roleDialogUser, setRoleDialogUser] = useState<{ id: string; name: string; currentRole: UserRole; currentRoleId: string } | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");

  // Server-side filters: username, email. Role is NOT supported by backend, so client-side.
  const { data: usersData, isLoading } = useGetUsers({
    page,
    limit,
    username: filters.username || undefined,
    email: filters.email || undefined,
  });

  const deleteUser = useDeleteUser();
  const restoreUser = useRestoreUser();
  const changeRole = useChangeUserRole();
  const { data: roles = [] } = useRoles();

  // Client-side role filter (backend doesn't support it)
  const users = (usersData?.items ?? []).filter((user) =>
    filters.role ? user.role === filters.role : true
  );

  const handleDelete = (id: string, name: string) => setDeleteTarget({ id, name });
  const handleRestore = (id: string, name: string) => setRestoreTarget({ id, name });
  const handleOpenChangeRole = (id: string, currentRole: UserRole, name: string) => {
    const currentRoleObj = roles.find((r) => r.name === currentRole);
    const currentRoleId = currentRoleObj?.id ?? "";
    setSelectedRoleId(currentRoleId);
    setRoleDialogUser({ id, currentRole, currentRoleId, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteUser.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleConfirmRestore = async () => {
    if (!restoreTarget) return;
    await restoreUser.mutateAsync(restoreTarget.id);
    setRestoreTarget(null);
  };

  const handleConfirmRoleChange = async () => {
    if (!roleDialogUser || !selectedRoleId) return;
    if (selectedRoleId === roleDialogUser.currentRoleId) { setRoleDialogUser(null); return; }
    await changeRole.mutateAsync({ id: roleDialogUser.id, data: { roleId: selectedRoleId } });
    setRoleDialogUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
        <Button className="flex items-center gap-2" disabled>
          <UserPlus className="h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      <FiltersPanel activeCount={activeFilterCount} onClearAll={clearAllFilters}>
        <SearchInput
          value={filters.username ?? ""}
          onChange={(v) => setFilter("username", v)}
          placeholder="Buscar por nombre..."
          className="min-w-[200px] flex-1"
        />
        <SearchInput
          value={filters.email ?? ""}
          onChange={(v) => setFilter("email", v)}
          placeholder="Buscar por email..."
          className="min-w-[200px] flex-1"
        />
        <EnumSelectFilter
          value={filters.role ?? ""}
          onChange={(v) => setFilter("role", v)}
          options={roleOptions}
          placeholder="Todos los Roles"
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Usuario</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Rol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Fecha de Registro</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-12 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-border transition-colors hover:bg-muted/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === UserRole.SUPER_ADMIN ? "bg-red-100 text-red-700" :
                        user.role === UserRole.ADMIN ? "bg-purple-100 text-purple-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {translateRole(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${user.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenChangeRole(user.id, user.role, user.name)}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No se encontraron usuarios</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={usersData?.pages ?? 1}
          total={usersData?.total ?? 0}
          itemsShown={users.length}
          onPageChange={setPage}
          itemLabel="usuarios"
          isLoading={isLoading}
        />
      </div>

      <ActionDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Eliminar usuario"
        description={deleteTarget ? `Esta accion desactivara al usuario "${deleteTarget.name}".` : undefined}
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteUser.isPending}
        onConfirm={handleConfirmDelete}
      />

      <ActionDialog
        open={Boolean(restoreTarget)}
        onOpenChange={(open) => { if (!open) setRestoreTarget(null); }}
        title="Restaurar usuario"
        description={restoreTarget ? `Se restaurara el usuario "${restoreTarget.name}".` : undefined}
        confirmLabel="Restaurar"
        isPending={restoreUser.isPending}
        onConfirm={handleConfirmRestore}
      />

      <ActionDialog
        open={Boolean(roleDialogUser)}
        onOpenChange={(open) => { if (!open) setRoleDialogUser(null); }}
        title="Cambiar rol de usuario"
        description={roleDialogUser ? `${roleDialogUser.name} - rol actual: ${translateRole(roleDialogUser.currentRole)}` : undefined}
        confirmLabel="Guardar rol"
        isPending={changeRole.isPending}
        confirmDisabled={!roleDialogUser || !selectedRoleId || selectedRoleId === roleDialogUser.currentRoleId}
        onConfirm={handleConfirmRoleChange}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Nuevo rol</label>
          <Select value={selectedRoleId} onValueChange={setSelectedRoleId} disabled={changeRole.isPending}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {translateRole(role.name as UserRole)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </ActionDialog>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}>
      <AdminUsersContent />
    </Suspense>
  );
}
