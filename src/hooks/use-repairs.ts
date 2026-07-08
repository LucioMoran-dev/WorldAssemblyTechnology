"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { repairService } from "@/services";
import type {
  ICreateRepairDto,
  IUpdateRepairStatusDto,
  IRepairListParams,
} from "@/types";
import { getUserFacingMessage } from "@/utils";

/**
 * Mutation para enviar solicitud de reparación (público)
 */
export function useSubmitRepair() {
  return useMutation({
    mutationFn: (data: ICreateRepairDto) => repairService.submitRequest(data),
    onSuccess: () => {
      toast.success(
        "¡Solicitud de reparación enviada! Te contactaremos pronto."
      );
    },
    onError: (error: unknown) => {
      toast.error(
        getUserFacingMessage(
          error,
          "Error al enviar la solicitud. Intenta nuevamente."
        )
      );
    },
  });
}

// ===== ADMIN =====

/**
 * Query para listar reparaciones (Admin)
 */
export function useRepairs(params?: IRepairListParams) {
  return useQuery({
    queryKey: ["repairs", params],
    queryFn: () => repairService.getAll(params),
    staleTime: 30 * 1000,
  });
}

/**
 * Query para detalle de reparación (Admin)
 */
export function useRepair(id: string) {
  return useQuery({
    queryKey: ["repairs", id],
    queryFn: () => repairService.getById(id),
    enabled: !!id,
  });
}

/**
 * Query para historial de comentarios de reparación (Admin)
 */
export function useRepairHistory(id: string) {
  return useQuery({
    queryKey: ["repairs", id, "comments"],
    queryFn: () => repairService.getComments(id),
    enabled: !!id,
  });
}

/**
 * Mutation para actualizar estado de reparación (Admin)
 */
export function useUpdateRepairStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateRepairStatusDto;
    }) => repairService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repairs"] });
      toast.success("Estado de reparación actualizado");
    },
    onError: (error: unknown) => {
      toast.error(getUserFacingMessage(error, "Error al actualizar estado"));
    },
  });
}
