import HeaderWithSignIn from "./header-with-signin";
import OrderSummarySidebar from "./order-summary-sidebar";
import ProgressSteps from "./progress-steps";
import ShippingForm from "./shipping-form";

function Checkout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <HeaderWithSignIn />
        <ProgressSteps />
        <div className="grid gap-8 lg:grid-cols-3">
          <ShippingForm />
          <OrderSummarySidebar />
        </div>
      </main>
    </div>
  );
}

export default Checkout;
