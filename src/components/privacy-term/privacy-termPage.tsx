import { FeatureSectionPrivacy } from "@/components/privacy-term/featureSection";
import { MainContent } from "@/components/privacy-term/mainContentPrivacy/mainContent";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background">
        {/* Main Content */}
        <MainContent />

        {/* Feature Section */}
        <FeatureSectionPrivacy />
      </main>
    </div>
  );
}
