import { FormSection } from "@/components/contact/form/formSection";
import { FeaturesSection } from "@/components/repair/featuresSection";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/40">
        {/* Form Section */}
        <FormSection />

        {/* Features Section */}
        <FeaturesSection />
      </main>
    </div>
  );
}
