"use client";

interface FilterOption {
  value: string;
  label: string;
}

interface EnumSelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
}

export function EnumSelectFilter({
  value,
  onChange,
  options,
  placeholder = "Todos",
  className = "",
}: EnumSelectFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
