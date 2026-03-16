"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { resolveBreadcrumbs } from "@/lib/breadcrumbs/resolver";
import type { BreadcrumbArea } from "@/lib/breadcrumbs/route-names";

export function Breadcrumb({ area }: { area: BreadcrumbArea }) {
  const pathname = usePathname();
  const breadcrumbs = resolveBreadcrumbs(pathname, area);

  if (!breadcrumbs.length) return null;

  return (
    <div className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-blue-600">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

