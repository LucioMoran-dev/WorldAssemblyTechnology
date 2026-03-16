"use client";

import { Switch } from "@/components/ui/switch";

interface BooleanToggleFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function BooleanToggleFilter({ label, value, onChange }: BooleanToggleFilterProps) {
  const isChecked = value === "true";

  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 text-sm">
      <span className="text-gray-700">{label}</span>
      <Switch
        checked={isChecked}
        onCheckedChange={(checked) => onChange(checked ? "true" : "")}
      />
    </label>
  );
}
