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
  userId?: string;
  mercadoPagoId?: string;
  amount: number;
  status: PaymentStatus;
  paymentTypeId?: string;
  paymentMethodId?: string;
  dateApproved?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IPaymentApiShape {
  id?: string;
  amount?: number | string;
  status?: PaymentStatus;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  orderId?: string;
  userId?: string;
  paymentId?: string;
  paymentTypeId?: string;
  paymentMethodId?: string;
  dateApproved?: string;
  order_id?: string;
  user_id?: string;
  payment_id?: string;
  payment_type_id?: string;
  payment_method_id?: string;
  date_approved?: string;
}

export interface IPaymentStatusResponse {
  id: string;
  status: string;
  statusDetail?: string;
  paymentTypeId?: string;
  transactionAmount?: number;
  dateApproved?: string;
}

export interface IPaymentListParams {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
}
