import GeneralBulletin from "./general.bulletin";
import NewsletterBenefits from "./newsletter-benefits";
import ReceiveNewsletter from "./receive-newsletter";

function Newsletter() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Suscripciones al Boletian
      </h1>
      <GeneralBulletin />
      <div className="max-w-2xl">
        <div className="rounded-lg border border-border p-8">
          <NewsletterBenefits />
          <ReceiveNewsletter />
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
