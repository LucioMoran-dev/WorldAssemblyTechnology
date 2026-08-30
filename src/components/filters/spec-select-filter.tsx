"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface SpecSelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SpecSelectFilter({
  value,
  onChange,
  options,
}: SpecSelectFilterProps) {
  return (
    <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1">
      {options.map((option) => {
        const isChecked = value === option.value;

        return (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm hover:text-gray-900"
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => onChange(isChecked ? "" : option.value)}
              className="h-4 w-4"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
