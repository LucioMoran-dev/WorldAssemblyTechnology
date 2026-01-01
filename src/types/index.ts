/**
 * Exportación centralizada de todos los types
 */

// ===== TYPES DEL BACKEND =====

// Common types
export * from "./common.types";

// User & Auth types
export * from "./user.types";

// Product types
export * from "./product.types";

// Cart types
export * from "./cart.types";

// Order types
export * from "./order.types";

// Review types
export * from "./review.types";

// File types
export * from "./file.types";

// Health types
export * from "./health.types";

// Health types
export * from "./wishlist.types";

// ===== TYPES DE COMPONENTES UI (Props) =====
// Solo interfaces que NO están en el backend

/**
 * Props para ProductCard
 * Usa mapProductToCardProps() para convertir Product del backend
 */
export interface IProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  images?: string[];
  badge?: string;
  inStock?: boolean;
}

/**
 * Props para componentes de Cart UI
 */
export interface SummarySidebarProps {
  subtotal: number;
  shipping: number;
  tax: number;
  gst: number;
  total: number;
  selectedCountry: string;
  shippingMethod: string;
  discountExpanded: boolean;
  shippingExpanded: boolean;
  onCountryChange: (country: string) => void;
  onShippingMethodChange: (method: string) => void;
  onCollapseShipping: () => void;
  onToggleDiscount: () => void;
  onExpandShipping: () => void;
  onExpandDiscount: () => void;
}

export interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export interface CartItemsListProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image?: string;
  }>;
  quantities: { [key: string]: number };
  onUpdateQuantity: (id: string, delta: number) => void;
}

export interface CartSummaryCollapsedProps {
  subtotal: number;
  shipping: number;
  tax: number;
  gst: number;
  total: number;
  onExpandShipping: () => void;
  onExpandDiscount: () => void;
}

export interface CartSummaryExpandedProps {
  subtotal: number;
  shipping: number;
  tax: number;
  gst: number;
  total: number;
  selectedCountry: string;
  shippingMethod: string;
  discountExpanded: boolean;
  onCountryChange: (country: string) => void;
  onShippingMethodChange: (method: string) => void;
  onCollapseShipping: () => void;
  onToggleDiscount: () => void;
}

export interface QuantityControllerProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (quantity: number) => void;
}

/**
 * Props para otros componentes UI
 */
export interface IDownloads {
  id: string;
  name: string;
  orderId: string;
  date: string;
  downloadLink: string;
}

export interface IPaymentMethods {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface IWishlistItems {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}
