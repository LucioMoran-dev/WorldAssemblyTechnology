import type React from "react";

import { DashboardBreadcrumb } from "@/components/dashboard/breadcrumb";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <DashboardBreadcrumb />

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <DashboardSidebar />
            <div>{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
