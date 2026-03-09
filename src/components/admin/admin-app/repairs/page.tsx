"use client";

import { Wrench } from "lucide-react";
import { useState, Suspense } from "react";

import { Pagination } from "@/components/filters/pagination";
import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { useRepairs, useUpdateRepairStatus, useFilters } from "@/hooks";
import { RepairStatus, RepairUrgency } from "@/types";

const statusOptions = [
  { value: RepairStatus.PENDING, label: "Pendiente" },
  { value: RepairStatus.REVIEWING, label: "En revision" },
  { value: RepairStatus.IN_PROGRESS, label: "En progreso" },
  { value: RepairStatus.COMPLETED, label: "Completada" },
  { value: RepairStatus.CANCELLED, label: "Cancelada" },
];

const urgencyOptions = [
  { value: RepairUrgency.LOW, label: "Baja" },
  { value: RepairUrgency.MEDIUM, label: "Media" },
  { value: RepairUrgency.HIGH, label: "Alta" },
];

const statusLabels: Record<RepairStatus, string> = {
  [RepairStatus.PENDING]: "pendiente",
  [RepairStatus.REVIEWING]: "en revision",
  [RepairStatus.IN_PROGRESS]: "en progreso",
  [RepairStatus.COMPLETED]: "completada",
  [RepairStatus.CANCELLED]: "cancelada",
};

function AdminRepairsContent() {
  const { filters, page, limit, setFilter, setPage, clearAllFilters, activeFilterCount } = useFilters({
    defaults: { status: "", urgency: "" },
    defaultLimit: 10,
  });

  const [statusDialog, setStatusDialog] = useState<{
    id: string;
    status: RepairStatus;
    notes: string;
  } | null>(null);

  const { data, isLoading } = useRepairs({
    page,
    limit,
    status: (filters.status as RepairStatus) || undefined,
    urgency: (filters.urgency as RepairUrgency) || undefined,
  });

  const updateStatus = useUpdateRepairStatus();
  const repairs = data?.items ?? [];

  const handleStatusChange = (id: string, status: RepairStatus) => {
    setStatusDialog({ id, status, notes: "" });
  };

  const handleConfirmStatusChange = async () => {
    if (!statusDialog) return;
    await updateStatus.mutateAsync({
      id: statusDialog.id,
      data: {
        status: statusDialog.status,
        adminNotes: statusDialog.notes.trim() || undefined,
      },
    });
    setStatusDialog(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestion de reparaciones</h1>
      </div>

      <FiltersPanel activeCount={activeFilterCount} onClearAll={clearAllFilters}>
        <EnumSelectFilter
          value={filters.status ?? ""}
          onChange={(v) => setFilter("status", v)}
          options={statusOptions}
          placeholder="Todos los estados"
        />
        <EnumSelectFilter
          value={filters.urgency ?? ""}
          onChange={(v) => setFilter("urgency", v)}
          options={urgencyOptions}
          placeholder="Todas las urgencias"
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left text-muted-foreground">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Urgencia</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="h-12 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : repairs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No hay solicitudes en este filtro.
                  </td>
                </tr>
              ) : (
                repairs.map((repair) => (
                  <tr key={repair.id} className="border-b border-border">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{repair.fullName}</p>
                      <p className="text-xs text-muted-foreground">{repair.email}</p>
                      <p className="text-xs text-muted-foreground">{repair.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{repair.deviceType}</p>
                      <p className="text-xs text-muted-foreground">{repair.brand} - {repair.model}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{repair.issueDescription}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        repair.urgency === RepairUrgency.HIGH ? "bg-red-100 text-red-700" :
                        repair.urgency === RepairUrgency.MEDIUM ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {urgencyOptions.find((o) => o.value === repair.urgency)?.label ?? repair.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        {statusLabels[repair.status] ?? repair.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(repair.createdAt).toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(repair.id, RepairStatus.REVIEWING)}>Revisar</Button>
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(repair.id, RepairStatus.IN_PROGRESS)}>En progreso</Button>
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(repair.id, RepairStatus.COMPLETED)}>Cerrar</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={data?.pages ?? 1}
          total={data?.total ?? 0}
          itemsShown={repairs.length}
          onPageChange={setPage}
          itemLabel="solicitudes"
          isLoading={isLoading}
        />
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <div className="flex items-start gap-2">
          <Wrench className="mt-0.5 h-4 w-4" />
          <p>Cada cambio de estado impacta en el flujo operativo de reparaciones. Registra notas cuando corresponda.</p>
        </div>
      </div>

      <ActionDialog
        open={Boolean(statusDialog)}
        onOpenChange={(open) => { if (!open) setStatusDialog(null); }}
        title="Actualizar estado de reparacion"
        description={statusDialog ? `Se cambiara el estado a "${statusLabels[statusDialog.status]}".` : undefined}
        confirmLabel="Guardar estado"
        isPending={updateStatus.isPending}
        onConfirm={handleConfirmStatusChange}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Notas internas (opcional)</label>
          <textarea
            rows={3}
            value={statusDialog?.notes || ""}
            onChange={(event) => setStatusDialog((prev) => prev ? { ...prev, notes: event.target.value } : prev)}
            placeholder="Agregar comentario interno..."
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </ActionDialog>
    </div>
  );
}

export default function AdminRepairsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}>
      <AdminRepairsContent />
    </Suspense>
  );
}
