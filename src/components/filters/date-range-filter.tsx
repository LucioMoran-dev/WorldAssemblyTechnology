"use client";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  className?: string;
}

export function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  className = "",
}: DateRangeFilterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        className="rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
        placeholder="Desde"
      />
      <span className="text-muted-foreground">-</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        className="rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
        placeholder="Hasta"
      />
    </div>
  );
}
