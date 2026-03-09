"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface FiltersPanelProps {
  children: React.ReactNode;
  activeCount?: number;
  onClearAll?: () => void;
  className?: string;
}

export function FiltersPanel({
  children,
  activeCount = 0,
  onClearAll,
  className = "",
}: FiltersPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-lg border border-border bg-card p-4 ${className}`}>
      {/* Mobile toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
        {activeCount > 0 && onClearAll && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Desktop: always show, Mobile: toggle */}
      <div className={`${isOpen ? "mt-4 block" : "hidden"} lg:block`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          {children}
        </div>
        {activeCount > 0 && onClearAll && (
          <div className="mt-3 hidden lg:block">
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Limpiar filtros ({activeCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
