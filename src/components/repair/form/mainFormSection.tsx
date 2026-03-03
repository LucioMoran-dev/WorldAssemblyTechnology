import { RepairForm } from "@/components/repair/form/repairForm";
import { SidebarInfo } from "@/components/repair/form/sidebarInfo";

export function MainFormSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <RepairForm />

          {/* Sidebar Info */}
          <SidebarInfo />
        </div>
      </div>
    </section>
  );
}
