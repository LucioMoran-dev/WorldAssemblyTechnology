"use client";

import { Check } from "lucide-react";

import { COLOR_PALETTE, LIGHT_COLOR_NAMES } from "@/seeds";

interface ColorFilterProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorFilter({ value, onChange }: ColorFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {COLOR_PALETTE.map((color) => {
        const isSelected = value.toLowerCase() === color.name.toLowerCase();
        const isLight = LIGHT_COLOR_NAMES.includes(color.name);

        return (
          <button
            key={color.name}
            onClick={() => onChange(isSelected ? "" : color.name)}
            title={color.name}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all ${
              isLight ? "border border-gray-300" : ""
            } ${
              isSelected
                ? "ring-2 ring-blue-600 ring-offset-2"
                : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
            }`}
            style={{ backgroundColor: color.hex }}
          >
            {isSelected && (
              <Check
                className={`h-4 w-4 ${isLight ? "text-gray-900" : "text-white"}`}
                strokeWidth={3}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
