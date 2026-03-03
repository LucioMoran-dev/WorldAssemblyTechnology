import { Check } from "lucide-react";

function ProgressSteps() {
  return (
    <>
      <div className="mb-12 flex items-center justify-center">
        <div className="flex items-center gap-4">
          {/* Step 1 - Active */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              <Check className="h-5 w-5" />
            </div>
            <span className="font-semibold text-blue-600">Envío</span>
          </div>

          {/* Connector Line */}
          <div className="h-0.5 w-32 bg-gray-300" />

          {/* Step 2 - Inactive */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
              2
            </div>
            <span className="text-gray-600">Revisión y Pagos</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressSteps;
