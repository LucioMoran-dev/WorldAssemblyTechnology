"use client";

import { Check } from "lucide-react";

const COLORS = [
  { name: "black", hex: "#000000", label: "Negro" },
  { name: "blue", hex: "#0000FF", label: "Azul" },
  { name: "red", hex: "#FF0000", label: "Rojo" },
  { name: "white", hex: "#FFFFFF", label: "Blanco" },
  { name: "gray", hex: "#808080", label: "Gris" },
  { name: "green", hex: "#008000", label: "Verde" },
  { name: "silver", hex: "#C0C0C0", label: "Plateado" },
];

interface ColorFilterProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorFilter({ value, onChange }: ColorFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {COLORS.map((color) => {
        const isSelected = value.toLowerCase() === color.name;
        const isLight = ["white", "silver"].includes(color.name);

        return (
          <button
            key={color.name}
            onClick={() => onChange(isSelected ? "" : color.name)}
            title={color.label}
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
