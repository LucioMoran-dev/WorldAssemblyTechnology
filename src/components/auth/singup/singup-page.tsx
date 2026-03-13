import AccountCostumer from "@/components/auth/singup/account-costumer";
import { FormSingup } from "@/components/auth/singup/form/form-singup";

export function SingUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="bg-muted/40 flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Registro de Cliente</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <FormSingup />
            <AccountCostumer />
          </div>
        </div>
      </main>
    </div>
  );
}
