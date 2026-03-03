import type { IVariantSnapshot } from "./common.types";
import type { IUserAddress } from "./user.types";

/**
 * Tipos relacionados con órdenes de compra
 */

// Order Status Enum
export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

// Product Snapshot (para órdenes)
export interface IProductSnapshot {
  name: string;
  description: string;
  basePrice: number;
  brand?: string;
  model?: string;
}

// Re-export VariantSnapshot para compatibilidad
export type { IVariantSnapshot };

// Order Item
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

// Order Detail
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

// Order
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
  };
  orderDetail: OrderDetail;
}

// DTOs
export interface IUpdateOrderStatusDto {
  status: OrderStatus;
}

// Query Filters
export interface IOrderFilters {
  status?: OrderStatus;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
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

// Order Stats (ADMIN)
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

// Legacy compatibility
export type OrderListParams = IOrderFilters;
export type PaymentMethod = string;
