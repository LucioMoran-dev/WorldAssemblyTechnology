import { redirect } from "next/navigation";

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

function toQuery(searchParams?: Record<string, string | string[] | undefined>): string {
  if (!searchParams) return "";
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    }
  });

  const query = params.toString();
  return query ? `?${query}` : "";
}

export default function PaymentsPendingAliasPage({ searchParams }: PageProps) {
  redirect(`/orders/pending${toQuery(searchParams)}`);
}
