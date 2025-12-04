import GeneralBulletin from "./general.bulletin";
import NewsletterBenefits from "./newsletter-benefits";
import PreferencesInformation from "./preferences-information";
import ReceiveNewsletter from "./receive-newsletter";

function Newsletter() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Suscripciones al Boletín
      </h1>
      <GeneralBulletin />
      <div className="max-w-2xl">
        <div className="rounded-lg border border-gray-200 p-8">
          <NewsletterBenefits />
          <ReceiveNewsletter />
          <PreferencesInformation />
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
