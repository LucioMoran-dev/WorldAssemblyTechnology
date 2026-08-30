import type { IVariantSnapshot } from "./common.types";
import type { IUserAddress } from "./user.types";

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface IProductSnapshot {
  name: string;
  description: string;
  basePrice: number;
  brand?: string;
  model?: string;
}

export type { IVariantSnapshot };

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  originalUnitPrice?: number;
  discountAmount?: number;
  discountSource?: string;
  discountCode?: string;
  productSnapshot: IProductSnapshot;
  variantsSnapshot: IVariantSnapshot[] | null;
  createdAt: string;
}
export interface OrderDetail {
  id: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  totalDiscount?: number;
  promoCodeUsed?: string;
  shippingAddress: IUserAddress | null;
  shippingAddressId?: string;
  paymentMethod?: string;
  items: OrderItem[];
}
export interface IOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  orderDetail: OrderDetail;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export interface IUpdateOrderStatusDto {
  status: OrderStatus;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
}
export interface IOrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  orderNumber?: string;
  userEmail?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedOrders {
  items: IOrder[];
  total: number;
  pages: number;
}

export type IOrdersListResponse = IPaginatedOrders;

export interface IOrderStats {
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

export const NEXT_ORDER_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  [OrderStatus.PENDING]: OrderStatus.PAID,
  [OrderStatus.PAID]: OrderStatus.PROCESSING,
  [OrderStatus.PROCESSING]: OrderStatus.SHIPPED,
  [OrderStatus.SHIPPED]: OrderStatus.DELIVERED,
};

export type OrderListParams = IOrderFilters;
export type PaymentMethod = string;
