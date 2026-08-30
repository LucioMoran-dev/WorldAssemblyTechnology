"use client";

import {
  ArrowLeft,
  Loader2,
  MessageSquare,
  User,
  Monitor,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { useRepairHistory, useUpdateRepairStatus } from "@/hooks";
import { RepairStatus, RepairUrgency } from "@/types";

const statusLabels: Record<RepairStatus, string> = {
  [RepairStatus.PENDING]: "Pendiente",
  [RepairStatus.REVIEWING]: "En revision",
  [RepairStatus.IN_PROGRESS]: "En progreso",
  [RepairStatus.COMPLETED]: "Completada",
  [RepairStatus.CANCELLED]: "Cancelada",
};

const statusColors: Record<RepairStatus, string> = {
  [RepairStatus.PENDING]: "bg-yellow-100 text-yellow-700",
  [RepairStatus.REVIEWING]: "bg-blue-100 text-blue-700",
  [RepairStatus.IN_PROGRESS]: "bg-purple-100 text-purple-700",
  [RepairStatus.COMPLETED]: "bg-green-100 text-green-700",
  [RepairStatus.CANCELLED]: "bg-red-100 text-red-700",
};

const urgencyLabels: Record<RepairUrgency, string> = {
  [RepairUrgency.LOW]: "Baja",
  [RepairUrgency.MEDIUM]: "Media",
  [RepairUrgency.HIGH]: "Alta",
};

const urgencyColors: Record<RepairUrgency, string> = {
  [RepairUrgency.LOW]: "bg-green-100 text-green-700",
  [RepairUrgency.MEDIUM]: "bg-yellow-100 text-yellow-700",
  [RepairUrgency.HIGH]: "bg-red-100 text-red-700",
};

const validTransitions: Record<RepairStatus, RepairStatus[]> = {
  [RepairStatus.PENDING]: [RepairStatus.REVIEWING, RepairStatus.CANCELLED],
  [RepairStatus.REVIEWING]: [RepairStatus.IN_PROGRESS, RepairStatus.CANCELLED],
  [RepairStatus.IN_PROGRESS]: [RepairStatus.COMPLETED, RepairStatus.CANCELLED],
  [RepairStatus.COMPLETED]: [],
  [RepairStatus.CANCELLED]: [],
};

export default function AdminRepairDetailPage() {
  const params = useParams<{ id: string }>();
  const repairId = params.id;

  const { data, isLoading } = useRepairHistory(repairId);
  const updateStatus = useUpdateRepairStatus();

  const [statusDialog, setStatusDialog] = useState<{
    status: RepairStatus;
    notes: string;
  } | null>(null);

  const handleStatusChange = (status: RepairStatus) => {
    setStatusDialog({ status, notes: "" });
  };

  const handleConfirmStatusChange = async () => {
    if (!statusDialog) return;
    await updateStatus.mutateAsync({
      id: repairId,
      data: {
        status: statusDialog.status,
        adminNotes: statusDialog.notes.trim() || undefined,
      },
    });
    setStatusDialog(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/repairs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a reparaciones
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
          No se encontro la reparacion solicitada.
        </div>
      </div>
    );
  }

  const { repair, comments } = data;
  const allowedTransitions = validTransitions[repair.status] ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/admin/repairs"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a reparaciones
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Reparacion #{repair.id.slice(0, 8)}
          </h1>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[repair.status]}`}
        >
          {statusLabels[repair.status]}
        </span>
      </div>

      {/* Informacion del cliente */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Informacion del cliente
          </h2>
        </div>
        <div className="grid gap-4 text-sm md:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Nombre</p>
            <p className="font-medium text-foreground">{repair.fullName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium text-foreground">{repair.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Telefono</p>
            <p className="font-medium text-foreground">{repair.phone}</p>
          </div>
        </div>
      </div>

      {/* Informacion del equipo */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Informacion del equipo
          </h2>
        </div>
        <div className="grid gap-4 text-sm md:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Tipo de dispositivo</p>
            <p className="font-medium text-foreground">{repair.deviceType}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Marca</p>
            <p className="font-medium text-foreground">{repair.brand}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Modelo</p>
            <p className="font-medium text-foreground">{repair.model}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Descripcion del problema
          </p>
          <p className="mt-1 text-sm text-foreground">
            {repair.issueDescription}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Urgencia:</span>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${urgencyColors[repair.urgency]}`}
          >
            {urgencyLabels[repair.urgency]}
          </span>
        </div>
      </div>

      {/* Timeline de comentarios */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Historial de seguimiento
          </h2>
        </div>

        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin comentarios aun.</p>
        ) : (
          <div className="relative ml-3 border-l-2 border-gray-200 pl-6">
            {comments.map((comment) => (
              <div key={comment.id} className="relative mb-6 last:mb-0">
                {/* Dot indicator */}
                <div className="absolute top-1 -left-7.75 h-4 w-4 rounded-full border-2 border-gray-300 bg-white" />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[comment.statusSnapshot]}`}
                    >
                      {statusLabels[comment.statusSnapshot]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString("es-AR")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.comment}</p>
                  <p className="text-xs text-muted-foreground">
                    por {comment.adminName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cambiar estado */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Cambiar estado
          </h2>
        </div>

        {allowedTransitions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Esta reparacion se encuentra en un estado final y no puede ser
            modificada.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {allowedTransitions.map((status) => (
              <Button
                key={status}
                variant={
                  status === RepairStatus.CANCELLED ? "destructive" : "outline"
                }
                onClick={() => handleStatusChange(status)}
              >
                {statusLabels[status]}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Fechas */}
      <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
        <span>
          Creada: {new Date(repair.createdAt).toLocaleString("es-AR")}
        </span>
        <span>
          Ultima actualizacion:{" "}
          {new Date(repair.updatedAt).toLocaleString("es-AR")}
        </span>
      </div>

      {/* Dialog de cambio de estado */}
      <ActionDialog
        open={Boolean(statusDialog)}
        onOpenChange={(open) => {
          if (!open) setStatusDialog(null);
        }}
        title="Actualizar estado de reparacion"
        description={
          statusDialog
            ? `Se cambiara el estado a "${statusLabels[statusDialog.status]}".`
            : undefined
        }
        confirmLabel="Guardar estado"
        isPending={updateStatus.isPending}
        onConfirm={handleConfirmStatusChange}
        variant={
          statusDialog?.status === RepairStatus.CANCELLED
            ? "destructive"
            : "default"
        }
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Notas internas (opcional)
          </label>
          <textarea
            rows={3}
            value={statusDialog?.notes || ""}
            onChange={(event) =>
              setStatusDialog((prev) =>
                prev ? { ...prev, notes: event.target.value } : prev
              )
            }
            placeholder="Agregar comentario interno..."
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            maxLength={1000}
          />
        </div>
      </ActionDialog>
    </div>
  );
}
