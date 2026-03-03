import { Content } from "@/components/privacy-term/mainContentPrivacy/content";
import { SidebarNavigation } from "@/components/privacy-term/mainContentPrivacy/sidebarNavigation";

export function MainContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
        {/* Content */}
        <Content />

        {/* Sidebar Navigation */}
        <SidebarNavigation />
      </div>
    </div>
  );
}
