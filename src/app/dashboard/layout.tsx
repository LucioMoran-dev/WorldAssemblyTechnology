import type React from "react";

import { Breadcrumb } from "@/components/breadcrumbs/breadcrumb";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Breadcrumb area="dashboard" />

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
