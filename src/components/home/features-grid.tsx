interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <section className="border-b border-border bg-muted/40 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-slate-200 bg-card p-7 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)]"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] ring-1 ring-blue-200/60 transition-transform duration-200 group-hover:scale-[1.03]">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
