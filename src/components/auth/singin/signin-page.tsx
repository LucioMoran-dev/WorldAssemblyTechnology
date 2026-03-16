import CollectionSection from "@/components/auth/singin/collection-section";
import { FormSingIn } from "@/components/auth/singin/Form/form-signin";
import NewCostumer from "@/components/auth/singin/new-costumer";

export function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="bg-muted/40 flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">
            Inicio de Sesión del Cliente
          </h1>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-8">
            {/* Left: form card (ocupa la mitad en md+) */}
            <div className="md:w-1/2">
              <div className="bg-card h-full rounded-lg p-8 shadow-sm">
                <FormSingIn />
              </div>
            </div>

            {/* Right: new customer */}
            <div className="md:w-1/2">
              <NewCostumer />
            </div>
          </div>
        </div>

        <CollectionSection />
      </main>
    </div>
  );
}
