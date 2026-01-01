import type { User, Address } from "./user.types";

/**
 * Tipos relacionados con órdenes de compra
 */

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface ProductSnapshot {
  name: string;
  description: string;
  basePrice: number;
  brand: string;
  model: string;
}

export interface VariantSnapshot {
  id: string;
  type: string;
  name: string;
  priceModifier: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  productSnapshot: ProductSnapshot;
  variantsSnapshot: VariantSnapshot[] | null;
  createdAt: Date | string;
}

export interface OrderDetail {
  id: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address | null;
  shippingAddressId: string | null;
  paymentMethod: string | null;
  items: OrderItem[];
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: User;
  orderDetail: OrderDetail;
}

export interface OrderListParams {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface OrderStats {
  totalOrders: number;
  ordersByStatus: {
    pending: number;
    paid: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  revenue: {
    total: number;
    monthly: number;
  };
  completionRate: string;
  cancellationRate: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  paymentMethod?: string;
}

export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "mercadopago"
  | "paypal"
  | "cash";

export interface ConfirmPaymentDto {
  paymentMethod: PaymentMethod;
  transactionId?: string;
}
