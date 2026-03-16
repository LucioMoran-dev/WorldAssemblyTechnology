"use client";

import type React from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Breadcrumb } from "@/components/breadcrumbs/breadcrumb";
import { AdminGuard } from "@/components/guards/admin-guard";
import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col">
        <Header />

        {/* Breadcrumb unificado */}
        <Breadcrumb area="admin" />

        {/* Main Content */}
        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <AdminSidebar />
              <div>{children}</div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AdminGuard>
  );
}
