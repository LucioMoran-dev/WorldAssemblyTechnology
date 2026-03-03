import { X, Edit2 } from "lucide-react";
import Image from "next/image";

import type { CartItemProps } from "@/types";

import QuantityController from "./quantity-controller";

function CartItem({ item, quantity, onUpdateQuantity }: CartItemProps) {
  const subtotal = item.price * quantity;

  return (
    <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-200 p-4">
      <div className="col-span-5 flex gap-4">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="rounded bg-gray-50 object-contain"
        />
        <div className="flex-1">
          <p className="line-clamp-3 text-sm text-gray-900">{item.name}</p>
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
        <button className="rounded p-1 hover:bg-gray-100">
          <X className="h-4 w-4 text-gray-600" />
        </button>
        <button className="rounded p-1 hover:bg-gray-100">
          <Edit2 className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
