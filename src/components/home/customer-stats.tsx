import Image from "next/image";

interface CustomerStat {
  value: string;
  label: string;
}

interface CustomerStatsProps {
  stats: CustomerStat[];
}

export function CustomerStats({ stats }: CustomerStatsProps) {
  return (
    <section className="border-b border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - Stats */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Desde 2021
              </p>
              <h2 className="text-4xl font-bold text-foreground">
                Brindando lo Mejor para los Clientes
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-4xl font-bold text-blue-600">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <Image
              src="/modern-office-showroom-with-computers.jpg"
              alt="Servicio al Cliente"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

