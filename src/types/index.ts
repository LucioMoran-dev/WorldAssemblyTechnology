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

export interface IReviews {
  id: string;
  productName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface IWishlistItems {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

export interface IUserBodyDto {
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ICartItems {
  id: string;
  name: string;
  price: number;
  image?: string;
}

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
  item: ICartItems;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export interface CartItemsListProps {
  items: ICartItems[];
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
