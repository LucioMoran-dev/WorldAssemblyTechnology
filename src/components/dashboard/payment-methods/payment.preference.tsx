import { CreditCard, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IPaymentMethods } from "@/types";

function PaymentPreference() {
  const paymentMethods: IPaymentMethods[] = [];
  return (
    <>
      {paymentMethods.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {paymentMethods.map((method: IPaymentMethods) => (
            <div
              key={method.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex gap-3">
                  <CreditCard className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{method.type}</p>
                    <p className="text-sm text-gray-600">
                      **** **** **** {method.last4}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expira: {method.expiry}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {method.isDefault && (
                <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Predeterminado
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No tienes métodos de pago guardados
          </h3>
          <p className="mb-6 text-gray-600">
            Agrega una tarjeta de crédito o débito para agilizar tus compras
            futuras
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Método de Pago
          </Button>
        </div>
      )}
    </>
  );
}

export default PaymentPreference;
