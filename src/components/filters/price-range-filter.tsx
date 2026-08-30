"use client";

import { useState, useEffect, useRef } from "react";

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  className?: string;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  className = "",
}: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const timeoutMinRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutMaxRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalMin(minPrice);
  }, [minPrice]);
  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  const handleMinChange = (val: string) => {
    setLocalMin(val);
    if (timeoutMinRef.current) clearTimeout(timeoutMinRef.current);
    timeoutMinRef.current = setTimeout(() => onMinChange(val), 600);
  };

  const handleMaxChange = (val: string) => {
    setLocalMax(val);
    if (timeoutMaxRef.current) clearTimeout(timeoutMaxRef.current);
    timeoutMaxRef.current = setTimeout(() => onMaxChange(val), 600);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="number"
        placeholder="Precio min"
        value={localMin}
        onChange={(e) => handleMinChange(e.target.value)}
        className="w-28 rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
        min="0"
      />
      <span className="text-muted-foreground">-</span>
      <input
        type="number"
        placeholder="Precio max"
        value={localMax}
        onChange={(e) => handleMaxChange(e.target.value)}
        className="w-28 rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
        min="0"
      />
    </div>
  );
}
