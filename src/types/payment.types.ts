/**
 * Tipos relacionados con pagos (MercadoPago)
 */

export enum PaymentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  IN_PROCESS = "in_process",
  CANCELLED = "cancelled",
}

export interface IPaymentPreference {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
}

export interface ICreatePreferenceDto {
  orderId: string;
  message?: string;
  currency?: string;
}

export interface IPayment {
  id: string;
  orderId: string;
  mercadoPagoId?: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentStatusResponse {
  id: string;
  status: string;
  statusDetail?: string;
  paymentMethod?: string;
  transactionAmount?: number;
  dateApproved?: string;
}

export interface IPaymentListParams {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
}
