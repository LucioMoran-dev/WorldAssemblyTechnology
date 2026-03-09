function NewsletterBenefits() {
  return (
    <div className="bg-muted/40 mb-6 rounded-lg p-6">
      <h3 className="text-foreground mb-3 font-semibold">
        Beneficios de suscribirte:
      </h3>
      <ul className="text-muted-foreground space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <span>Acceso anticipado a nuevos productos y lanzamientos</span>
        </li>
        <li className="flex items-start gap-2">
          <span>Descuentos exclusivos y ofertas especiales</span>
        </li>
        <li className="flex items-start gap-2">
          <span>Consejos y guias de expertos sobre tecnologia</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-blue-600">âœ“</span>
          <span>Notificaciones sobre eventos y promociones especiales</span>
        </li>
      </ul>
    </div>
  );
}

export default NewsletterBenefits;
