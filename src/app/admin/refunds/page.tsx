"use client";

import { Check, X } from "lucide-react";
import { Suspense, useState } from "react";

import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { ActionDialog } from "@/components/ui/action-dialog";
import {
  useApproveRefund,
  useFilters,
  useRefunds,
  useRejectRefund,
} from "@/hooks";
import { RefundStatus } from "@/types";
import type { IRefund } from "@/types";

const getStatusColor = (status: RefundStatus) => {
  const colors = {
    [RefundStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [RefundStatus.APPROVED]: "bg-green-100 text-green-700",
    [RefundStatus.REJECTED]: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

const translateStatus = (status: RefundStatus): string => {
  const translations = {
    [RefundStatus.PENDING]: "Pendiente",
    [RefundStatus.APPROVED]: "Aprobado",
    [RefundStatus.REJECTED]: "Rechazado",
  };
  return translations[status] || status;
};

const statusOptions = [
  { value: RefundStatus.PENDING, label: "Pendientes" },
  { value: RefundStatus.APPROVED, label: "Aprobados" },
  { value: RefundStatus.REJECTED, label: "Rechazados" },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const MIN_RESPONSE = 5;
const MAX_RESPONSE = 1000;

function AdminRefundsContent() {
  const {
    filters,
    page,
    limit,
    setFilter,
    setPage,
    clearAllFilters,
    activeFilterCount,
  } = useFilters({
    defaults: { status: "" },
    defaultLimit: 10,
  });

  const { data: refundsData, isLoading } = useRefunds({
    page,
    limit,
    status: (filters.status as RefundStatus) || undefined,
  });

  const refunds = refundsData?.items ?? [];

  const approveRefund = useApproveRefund();
  const rejectRefund = useRejectRefund();

  // Solicitud que se está resolviendo + la acción elegida. adminResponse
  // es obligatorio (5-1000 chars) y se le mailea al cliente tal cual.
  const [resolveTarget, setResolveTarget] = useState<{
    refund: IRefund;
    action: "approve" | "reject";
  } | null>(null);
  const [adminResponse, setAdminResponse] = useState("");

  const isPending = approveRefund.isPending || rejectRefund.isPending;
  const responseTooShort = adminResponse.trim().length < MIN_RESPONSE;

  const closeResolveDialog = () => {
    setResolveTarget(null);
    setAdminResponse("");
  };

  const handleConfirmResolve = async () => {
    if (!resolveTarget) return;
    const mutation =
      resolveTarget.action === "approve" ? approveRefund : rejectRefund;
    try {
      await mutation.mutateAsync({
        id: resolveTarget.refund.id,
        data: { adminResponse: adminResponse.trim() },
      });
      closeResolveDialog();
    } catch {
      // el hook ya muestra el toast; dejamos el diálogo abierto para reintentar
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gestión de Reembolsos
        </h1>
      </div>

      {/* Aviso operativo clave del back: aprobar acá NO mueve plata en
          Mercado Pago — la devolución real se procesa a mano. */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        Aprobar un reembolso solo registra la decisión y notifica al cliente por
        email. La devolución del dinero en Mercado Pago se procesa manualmente,
        fuera de la app.
      </div>

      <FiltersPanel
        activeCount={activeFilterCount}
        onClearAll={clearAllFilters}
      >
        <EnumSelectFilter
          value={filters.status ?? ""}
          onChange={(v) => setFilter("status", v)}
          options={statusOptions}
          placeholder="Todos los Estados"
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Motivo del cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Acciones
                </th>
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
              ) : refunds.length > 0 ? (
                refunds.map((refund) => (
                  <tr
                    key={refund.id}
                    className="border-b border-border hover:bg-muted/40"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(refund.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="text-foreground">
                        {refund.user?.name ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {refund.user?.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {refund.order?.orderNumber
                        ? `#${refund.order.orderNumber}`
                        : "—"}
                      {refund.orderDetail?.total !== undefined && (
                        <p className="text-xs font-normal text-muted-foreground">
                          ${Number(refund.orderDetail.total).toFixed(2)}
                        </p>
                      )}
                    </td>
                    <td className="max-w-xs px-6 py-4 text-sm text-muted-foreground">
                      <p className="line-clamp-2" title={refund.reason}>
                        {refund.reason ?? "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(refund.status)}`}
                      >
                        {translateStatus(refund.status)}
                      </span>
                      {/* La respuesta del admin queda registrada y maileada */}
                      {refund.adminResponse && (
                        <p
                          className="mt-1 line-clamp-2 max-w-xs text-xs text-muted-foreground"
                          title={refund.adminResponse}
                        >
                          {refund.adminResponse}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {/* Solo las solicitudes pendientes se pueden resolver */}
                      {refund.status === RefundStatus.PENDING ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setResolveTarget({ refund, action: "approve" })
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-green-200 px-2 py-1 text-xs font-medium text-green-600 transition-colors hover:bg-green-50"
                            title="Aprobar reembolso"
                          >
                            <Check className="h-3 w-3" />
                            Aprobar
                          </button>
                          <button
                            onClick={() =>
                              setResolveTarget({ refund, action: "reject" })
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                            title="Rechazar reembolso"
                          >
                            <X className="h-3 w-3" />
                            Rechazar
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Resuelto
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No hay solicitudes de reembolso
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={refundsData?.pages ?? 1}
          total={refundsData?.total ?? 0}
          itemsShown={refunds.length}
          onPageChange={setPage}
          itemLabel="reembolsos"
          isLoading={isLoading}
        />
      </div>

      {/* Diálogo de resolución: la respuesta es obligatoria porque el back
          la exige (5-1000 chars) y se la envía al cliente por email. */}
      <ActionDialog
        open={Boolean(resolveTarget)}
        onOpenChange={(open) => !open && closeResolveDialog()}
        title={
          resolveTarget?.action === "approve"
            ? `Aprobar reembolso de la orden ${resolveTarget?.refund.order?.orderNumber ? `#${resolveTarget.refund.order.orderNumber}` : ""}`
            : `Rechazar reembolso de la orden ${resolveTarget?.refund.order?.orderNumber ? `#${resolveTarget.refund.order.orderNumber}` : ""}`
        }
        description={
          resolveTarget?.action === "approve"
            ? "Se notificará al cliente por email. Recordá que la devolución del dinero se procesa manualmente en Mercado Pago."
            : "Se notificará al cliente por email con tu respuesta."
        }
        confirmLabel={
          resolveTarget?.action === "approve" ? "Aprobar" : "Rechazar"
        }
        variant={resolveTarget?.action === "reject" ? "destructive" : "default"}
        isPending={isPending}
        confirmDisabled={responseTooShort}
        onConfirm={handleConfirmResolve}
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Respuesta para el cliente (obligatoria, {MIN_RESPONSE}-
            {MAX_RESPONSE} caracteres)
          </label>
          <textarea
            className="min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            value={adminResponse}
            onChange={(e) =>
              setAdminResponse(e.target.value.slice(0, MAX_RESPONSE))
            }
            placeholder="Ej: Aprobamos tu reembolso; el dinero se acreditará en 5-7 días hábiles."
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {adminResponse.trim().length}/{MAX_RESPONSE}
            {responseTooShort && ` — mínimo ${MIN_RESPONSE} caracteres`}
          </p>
        </div>
      </ActionDialog>
    </div>
  );
}

export default function AdminRefundsPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}
    >
      <AdminRefundsContent />
    </Suspense>
  );
}
