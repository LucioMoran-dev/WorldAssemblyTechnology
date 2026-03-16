"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  itemsShown: number;
  onPageChange: (page: number) => void;
  variant?: "admin" | "catalog";
  itemLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function Pagination({
  page,
  pages,
  total,
  itemsShown,
  onPageChange,
  variant = "admin",
  itemLabel = "registros",
  isLoading = false,
  className = "",
}: PaginationProps) {
  if (pages <= 1 && variant === "admin") {
    return (
      <div className={`flex items-center justify-between border-t border-border px-6 py-4 ${className}`}>
        <p className="text-sm text-muted-foreground">
          Mostrando {itemsShown} de {total} {itemLabel}
        </p>
      </div>
    );
  }

  if (variant === "admin") {
    return (
      <div className={`flex items-center justify-between border-t border-border px-6 py-4 ${className}`}>
        <p className="text-sm text-muted-foreground">
          Mostrando {itemsShown} de {total} {itemLabel}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Pagina {page} de {pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || isLoading}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pages || isLoading}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }

  // Catalog variant - numbered pages
  const getPageNumbers = () => {
    const pageNumbers: (number | "...")[] = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (page > 3) pageNumbers.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(pages - 1, page + 1);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
      if (page < pages - 2) pageNumbers.push("...");
      pageNumbers.push(pages);
    }
    return pageNumbers;
  };

  return (
    <div className={`flex items-center justify-center gap-2 py-6 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isLoading}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((pageNum, i) =>
        pageNum === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={pageNum}
            variant={pageNum === page ? "default" : "outline"}
            size="sm"
            className="h-9 min-w-[36px]"
            onClick={() => onPageChange(pageNum)}
            disabled={isLoading}
          >
            {pageNum}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages || isLoading}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <span className="ml-4 text-sm text-muted-foreground">
        {total} {itemLabel}
      </span>
    </div>
  );
}
