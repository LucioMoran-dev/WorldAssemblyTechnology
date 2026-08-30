"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Dashboard from "@/components/dashboard/dashboard";
import { useAuth, useIsAdmin } from "@/hooks";

export default function DashboardPage() {
  const router = useRouter();
  const isLoading = useAuth((state) => state.isLoading);
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.replace("/admin");
    }
  }, [isLoading, isAdmin, router]);

  if (isLoading || isAdmin) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return <Dashboard />;
}
