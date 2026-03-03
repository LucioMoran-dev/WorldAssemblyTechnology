import { Button } from "@/components/ui/button";

function HeaderWithSignIn() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pagar</h1>
        <Button
          variant="outline"
          className="border-blue-600 bg-transparent px-8 text-blue-600 hover:bg-blue-50"
        >
          Iniciar Sesión
        </Button>
      </div>
    </>
  );
}

export default HeaderWithSignIn;
