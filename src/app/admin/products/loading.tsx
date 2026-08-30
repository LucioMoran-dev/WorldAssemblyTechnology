import { AdminTableSkeleton } from "@/components/admin/table-skeleton";

export default function LoadingProducts() {
  return <AdminTableSkeleton rows={8} columns={6} withStats />;
}
