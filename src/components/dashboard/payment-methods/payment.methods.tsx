import Methods from "./methods";
import PaymentPreference from "./payment.preference";

function PaymentMethods() {
  return (
    <div className="space-y-8">
      <Methods />
      <PaymentPreference />
    </div>
  );
}

export default PaymentMethods;
