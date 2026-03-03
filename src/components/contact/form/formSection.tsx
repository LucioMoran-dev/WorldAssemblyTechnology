import { FormContact } from "@/components/contact/form/formContact";
import { SidebarInformacion } from "@/components/contact/form/sidebarInformacion";

export function FormSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Contactanos</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Formulario de Contacto */}
        <FormContact />

        {/* Sidebar de Informacion */}
        <SidebarInformacion />
      </div>
    </div>
  );
}
