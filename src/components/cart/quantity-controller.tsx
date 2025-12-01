import { ChevronDown, ChevronUp } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { QuantityControllerProps } from "@/types";

function QuantityController({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
}: QuantityControllerProps) {
  return (
    <div className="flex items-center rounded border border-gray-300">
      <Input
        type="number"
        value={quantity}
        onChange={(e) => onChange(Number.parseInt(e.target.value) || 1)}
        className="w-16 border-0 text-center focus-visible:ring-0"
        min="1"
      />
      <div className="flex flex-col border-l border-gray-300">
        <button
          onClick={onIncrement}
          className="border-b border-gray-300 px-2 py-0.5 hover:bg-gray-100"
        >
          <ChevronUp className="h-3 w-3" />
        </button>
        <button onClick={onDecrement} className="px-2 py-0.5 hover:bg-gray-100">
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default QuantityController;
