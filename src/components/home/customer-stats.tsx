interface CustomerStat {
  number: string;
  label: string;
}

interface CustomerStatsProps {
  stats: CustomerStat[];
}

export function CustomerStats({ stats }: CustomerStatsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 text-center transition-transform hover:scale-105"
          >
            <div className="mb-2 text-3xl font-bold text-blue-600">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
