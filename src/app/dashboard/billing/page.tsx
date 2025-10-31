import { FileText } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Acuerdos de Facturación
      </h1>

      <div className="rounded-lg border border-gray-200 p-12 text-center">
        <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No tienes acuerdos de facturación
        </h3>
        <p className="text-gray-600">
          Los acuerdos de facturación recurrente aparecerán aquí cuando
          configures pagos automáticos o suscripciones.
        </p>
      </div>
    </div>
  );
}
