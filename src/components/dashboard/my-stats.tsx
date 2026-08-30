"use client";

import { Heart, Package, Star, Wallet } from "lucide-react";
import Link from "next/link";

import { useMyStats } from "@/hooks";

function MyStats() {
  const { data: stats, isLoading } = useMyStats();

  const cards = [
    {
      label: "Pedidos realizados",
      value: stats?.totalOrders ?? 0,
      icon: Package,
      href: "/dashboard/orders",
    },
    {
      label: "Total gastado",
      value: `$${Number(stats?.totalSpent ?? 0).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: Wallet,
      href: "/dashboard/orders",
    },
    {
      label: "En favoritos",
      value: stats?.wishlistItems ?? 0,
      icon: Heart,
      href: "/dashboard/wishlist",
    },
    {
      label: "Reseñas escritas",
      value: stats?.reviewsGiven ?? 0,
      icon: Star,
      href: "/dashboard/reviews",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-blue-600"
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">
                {card.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default MyStats;
