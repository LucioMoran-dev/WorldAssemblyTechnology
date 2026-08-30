function NewsletterBenefits() {
  return (
    <div className="mb-6 rounded-lg bg-muted/40 p-6">
      <h3 className="mb-3 font-semibold text-foreground">
        Beneficios de suscribirte:
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
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
          <span>Notificaciones sobre eventos y promociones especiales</span>
        </li>
      </ul>
    </div>
  );
}

export default NewsletterBenefits;
