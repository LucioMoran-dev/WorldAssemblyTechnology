import type { IOrder, OrderDetail } from "./order.types";
import type { IPayment } from "./payment.types";

export enum RefundStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface IRefund {
  id: string;
  status: RefundStatus;
  reason?: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  order?: IOrder;
  orderDetail?: OrderDetail;
  payment?: IPayment;
}

export interface IRefundFilters {
  status?: RefundStatus;
  userId?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedRefunds {
  items: IRefund[];
  total: number;
  pages: number;
}

export interface IResolveRefundDto {
  adminResponse: string;
}

export interface ICreateRefundDto {
  orderId: string;
  reason: string;
  description: string;
}

export interface ICreateRefundResponse {
  message: string;
  refundId: string;
}

export const REFUND_REASON_MIN = 5;
export const REFUND_REASON_MAX = 100;
export const REFUND_DESCRIPTION_MIN = 10;
export const REFUND_DESCRIPTION_MAX = 1000;
