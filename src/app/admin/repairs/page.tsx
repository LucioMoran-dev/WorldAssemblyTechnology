"use client";

import { Wrench } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useRepairs, useUpdateRepairStatus } from "@/hooks";
import { RepairStatus } from "@/types";

export default function AdminRepairsPage() {
  const [statusFilter, setStatusFilter] = useState<RepairStatus | "">("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useRepairs({
    page,
    limit: 10,
    status: statusFilter || undefined,
  });

  const updateStatus = useUpdateRepairStatus();

  const repairs = data?.items ?? [];

  const handleStatusChange = (id: string, status: RepairStatus) => {
    const notes = window.prompt("Notas internas (opcional)") || undefined;
    updateStatus.mutate({
      id,
      data: {
        status,
        adminNotes: notes,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion de reparaciones</h1>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as RepairStatus | "")}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Todos los estados</option>
          <option value={RepairStatus.PENDING}>pending</option>
          <option value={RepairStatus.REVIEWING}>reviewing</option>
          <option value={RepairStatus.IN_PROGRESS}>in_progress</option>
          <option value={RepairStatus.COMPLETED}>completed</option>
          <option value={RepairStatus.CANCELLED}>cancelled</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr className="text-left text-gray-600">
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
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Cargando solicitudes...
                  </td>
                </tr>
              ) : repairs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No hay solicitudes en este filtro.
                  </td>
                </tr>
              ) : (
                repairs.map((repair) => (
                  <tr key={repair.id} className="border-b border-gray-100">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{repair.fullName}</p>
                      <p className="text-xs text-gray-500">{repair.email}</p>
                      <p className="text-xs text-gray-500">{repair.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{repair.deviceType}</p>
                      <p className="text-xs text-gray-500">
                        {repair.brand} - {repair.model}
                      </p>
                      <p className="line-clamp-2 text-xs text-gray-500">
                        {repair.issueDescription}
                      </p>
                    </td>
                    <td className="px-4 py-3">{repair.urgency}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {repair.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {new Date(repair.createdAt).toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(repair.id, RepairStatus.REVIEWING)
                          }
                        >
                          Revisar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(repair.id, RepairStatus.IN_PROGRESS)
                          }
                        >
                          En progreso
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(repair.id, RepairStatus.COMPLETED)
                          }
                        >
                          Cerrar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-sm">
        <p className="text-gray-600">
          Mostrando {repairs.length} de {data?.total ?? 0} solicitudes
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1 || isLoading}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => current + 1)}
            disabled={isLoading || !data || page >= data.pages}
          >
            Siguiente
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <div className="flex items-start gap-2">
          <Wrench className="mt-0.5 h-4 w-4" />
          <p>
            Cada cambio de estado impacta en el flujo operativo de reparaciones. Registra notas cuando corresponda.
          </p>
        </div>
      </div>
    </div>
  );
}
