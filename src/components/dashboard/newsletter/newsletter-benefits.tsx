function NewsletterBenefits() {
  return (
    <div className="mb-6 rounded-lg bg-gray-50 p-6">
      <h3 className="mb-3 font-semibold text-gray-900">
        Beneficios de suscribirte:
      </h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <span className="mt-1 text-blue-600">✓</span>
          <span>Acceso anticipado a nuevos productos y lanzamientos</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-blue-600">✓</span>
          <span>Descuentos exclusivos y ofertas especiales</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-blue-600">✓</span>
          <span>Consejos y guías de expertos sobre tecnología</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-blue-600">✓</span>
          <span>Notificaciones sobre eventos y promociones especiales</span>
        </li>
      </ul>
    </div>
  );
}

export default NewsletterBenefits;
