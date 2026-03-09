"use client";

import { Checkbox } from "@/components/ui/checkbox";

const PRICE_RANGES = [
  { label: "$0.00 - $1,000.00", min: "0", max: "1000" },
  { label: "$1,000.00 - $2,000.00", min: "1000", max: "2000" },
  { label: "$2,000.00 - $3,000.00", min: "2000", max: "3000" },
  { label: "$3,000.00 - $4,000.00", min: "3000", max: "4000" },
  { label: "$4,000.00 - $5,000.00", min: "4000", max: "5000" },
  { label: "$5,000.00 - $6,000.00", min: "5000", max: "6000" },
  { label: "$6,000.00 - $7,000.00", min: "6000", max: "7000" },
  { label: "$7,000.00 y más", min: "7000", max: "" },
];

interface PriceRangeCheckboxFilterProps {
  minPrice: string;
  maxPrice: string;
  onChange: (min: string, max: string) => void;
}

export function PriceRangeCheckboxFilter({
  minPrice,
  maxPrice,
  onChange,
}: PriceRangeCheckboxFilterProps) {
  return (
    <div className="space-y-2.5">
      {PRICE_RANGES.map((range) => {
        const isChecked = minPrice === range.min && maxPrice === range.max;

        return (
          <label
            key={range.label}
            className="flex cursor-pointer items-center gap-2 text-sm hover:text-gray-900"
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => {
                if (isChecked) {
                  onChange("", "");
                } else {
                  onChange(range.min, range.max);
                }
              }}
              className="h-4 w-4"
            />
            <span className="text-gray-700">{range.label}</span>
          </label>
        );
      })}
    </div>
  );
}
