import AccountCostumer from "@/components/auth/signup/account-costumer";
import { FormSingup } from "@/components/auth/signup/form/form-singup";

export function SingUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/40">
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
