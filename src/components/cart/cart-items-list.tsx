import type { CartItemsListProps } from "@/types";

import ActionButtons from "./action-buttons";
import CartItem from "./cart-item";
import CartTableHeader from "./cart-table-header";

function CartItemsList({
  items,
  quantities,
  onUpdateQuantity,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2">
      <div className="mb-4 rounded-lg bg-white shadow-sm">
        <CartTableHeader />

        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            quantity={quantities[item.id] || 1}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <ActionButtons />
    </div>
  );
}

export default CartItemsList;
