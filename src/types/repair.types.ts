/**
 * Tipos relacionados con el módulo de reparaciones
 */
import * as z from "zod";

export enum DeviceType {
  LAPTOP = "laptop",
  DESKTOP = "desktop",
  MONITOR = "monitor",
  HARD_DRIVE = "hard-drive",
  COMPONENT = "component",
  OTHER = "other",
}

export enum RepairUrgency {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum RepairStatus {
  PENDING = "pending",
  REVIEWING = "reviewing",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IRepair {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  deviceType: DeviceType;
  brand: string;
  model: string;
  issueDescription: string;
  urgency: RepairUrgency;
  status: RepairStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateRepairDto {
  fullName: string;
  email: string;
  phone: string;
  deviceType: DeviceType;
  brand: string;
  model: string;
  issueDescription: string;
  urgency: RepairUrgency;
}

export interface IUpdateRepairStatusDto {
  status: RepairStatus;
  adminNotes?: string;
}

export interface IRepairListParams {
  page?: number;
  limit?: number;
  status?: RepairStatus;
  urgency?: RepairUrgency;
}

export const repairSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  deviceType: z.string().min(1, "Selecciona un tipo de dispositivo"),
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  issueDescription: z
    .string()
    .min(10, "Describe el problema con al menos 10 caracteres"),
  urgency: z.string().min(1, "Selecciona la urgencia"),
});

export type RepairFormData = z.infer<typeof repairSchema>;
