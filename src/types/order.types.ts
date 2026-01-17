import type { UserAddress } from "./user.types";
import type { VariantSnapshot } from "./common.types";

/**
 * Tipos relacionados con órdenes de compra
 */

// Order Status Enum
export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Product Snapshot (para órdenes)
export interface ProductSnapshot {
  name: string;
  description: string;
  basePrice: number;
  brand?: string;
  model?: string;
}

// Re-export VariantSnapshot para compatibilidad
export type { VariantSnapshot };

// Order Item
export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  productSnapshot: ProductSnapshot;
  variantsSnapshot: VariantSnapshot[] | null;
  createdAt: string;
}

// Order Detail
export interface OrderDetail {
  id: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: UserAddress | null;
  shippingAddressId?: string;
  paymentMethod?: string;
  items: OrderItem[];
}

// Order
export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
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
export interface CreateOrderFromCartDto {
  shippingAddress?: null;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  paymentMethod?: string;
}

export interface ConfirmPaymentDto {
  paymentMethod: string;
  transactionId?: string;
  paymentDetails?: Record<string, any>;
}

// Query Filters
export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  orderNumber?: string;
  userEmail?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedOrders {
  items: Order[];
  total: number;
  pages: number;
}

// Order Stats (ADMIN)
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

// Legacy compatibility
export type OrderListParams = OrderFilters;
export type PaymentMethod = string;
