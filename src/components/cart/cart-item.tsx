import { X, Edit2 } from "lucide-react";
import Image from "next/image";

import type { CartItemProps } from "@/types";

import { CartItemVariants } from "./cart-item-variants";
import QuantityController from "./quantity-controller";

function CartItem({ item, quantity, onUpdateQuantity }: CartItemProps) {
  const subtotal = item.price * quantity;

  return (
    <div className="grid grid-cols-12 items-center gap-4 border-b border-border p-4">
      <div className="col-span-5 flex gap-4">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="rounded bg-muted/40 object-contain"
        />
        <div className="flex-1">
          <p className="line-clamp-3 text-sm text-foreground">{item.name}</p>
          <CartItemVariants variants={item.selectedVariants} />
        </div>
      </div>

      <div className="col-span-2 text-center font-semibold">
        ${item.price.toLocaleString()}
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <QuantityController
          quantity={quantity}
          onIncrement={() => onUpdateQuantity(item.id, 1)}
          onDecrement={() => onUpdateQuantity(item.id, -1)}
          onChange={(newQuantity) => {
            const delta = newQuantity - quantity;
            onUpdateQuantity(item.id, delta);
          }}
        />
      </div>

      <div className="col-span-2 text-center font-semibold">
        ${subtotal.toLocaleString()}
      </div>

      <div className="col-span-1 flex justify-end gap-2">
        <button className="rounded p-1 hover:bg-muted">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="rounded p-1 hover:bg-muted">
          <Edit2 className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
