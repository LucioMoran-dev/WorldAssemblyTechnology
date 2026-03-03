# MANUAL_TEST_CHECKLIST

## 0. Setup previo
- Levantar frontend y backend con variables de entorno validas (`NEXT_PUBLIC_API_URL`, URLs MercadoPago, mail).
- Abrir DevTools (Network + Application) para revisar cookies, localStorage y status codes.
- Probar con 3 perfiles: `CLIENT`, `ADMIN`, `SUPER_ADMIN`.

## 1. Auth
### 1.1 Signup/Login/Logout
- Ir a `/auth/signup`, crear usuario valido.
- Resultado esperado: toast de exito y redirect a `/auth/signin`.
- Ir a `/auth/signin`, iniciar sesion con credenciales.
- Resultado esperado: store autenticado, rutas protegidas accesibles.
- Cerrar sesion desde header.
- Resultado esperado: session local limpia y backend logout ejecutado.

### 1.2 OAuth callback
- Iniciar Google login.
- Verificar redirect a `/auth/callback?code=...`.
- Resultado esperado: exchange-code exitoso, usuario bootstrap y redirect al destino.
- Caso error: usar `code` invalido.
- Resultado esperado: mensaje de error y redirect a `/auth/signin`.

### 1.3 Forgot/Reset password
- `/auth/forgot-password` con email existente/no existente.
- Resultado esperado: respuesta generica sin filtrar existencia de usuario.
- `/auth/reset-password?token=...` con token valido.
- Resultado esperado: password actualizada y redirect a signin.
- Con token invalido/vencido.
- Resultado esperado: mensaje de token invalido.

## 2. Seguridad de rutas
- Sin login abrir `/dashboard`, `/admin`, `/cart/checkout`, `/cart/review-payment`.
- Resultado esperado: redirect a `/auth/signin?redirect=...`.
- Login como `CLIENT`, abrir `/admin`.
- Resultado esperado: bloqueo/redirect home.
- Login como `ADMIN`, abrir `/admin/*`.
- Resultado esperado: acceso habilitado.

## 3. Cart + Checkout + Pagos
### 3.1 Carrito
- Agregar productos, actualizar cantidad, eliminar item, vaciar carrito.
- Resultado esperado: estado carrito consistente en navbar y pagina.

### 3.2 Checkout y direccion
- Ir a `/cart/checkout`.
- Probar direccion guardada y direccion nueva.
- Resultado esperado: guarda direccion y avanza a `/cart/review-payment`.

### 3.3 Review + descuentos + pago
- En `/cart/review-payment`, aplicar promo valida.
- Resultado esperado: preview descuentos actualizado (`subtotalWithDiscount`, `totalDiscount`, `total`).
- Aplicar promo invalida.
- Resultado esperado: mensaje backend y sin romper flujo.
- Confirmar pedido.
- Resultado esperado: secuencia `validate-stock -> checkout -> create-preference -> redirect MercadoPago`.

### 3.4 Redirects MercadoPago
- Simular retorno `success`, `failure`, `pending`.
- Verificar rutas canonicas `/orders/success|failure|pending`.
- Verificar alias `/payments/success|failure|pending` (redirigen a canonicas).
- Resultado esperado: estado y metadatos visibles, links a ordenes.

## 4. Orders
### 4.1 Cliente
- Ir a `/dashboard/orders`, abrir detalle `/dashboard/orders/[id]`.
- Resultado esperado: items, totales, estado y metadatos visibles.
- Si estado `pending`, probar "Pagar ahora".
- Resultado esperado: create-preference y redirect MP.
- Si estado `pending/paid`, cancelar con y sin razon.
- Resultado esperado: estado actualizado y razon reflejada.

### 4.2 Admin
- `/admin/orders`: listar paginado y filtros.
- Cambiar estado de orden.
- Resultado esperado: update por query param backend y refresco de UI.

## 5. Dashboard
### 5.1 Billing
- `/dashboard/billing`: verificar listado de pagos (`/payments/my-payments`).

### 5.2 Addresses
- `/dashboard/addresses`: crear, editar, eliminar, set-default.
- Resultado esperado: mutaciones reflejadas en lista.

### 5.3 Newsletter
- `/dashboard/newsletter`: suscribir email y desuscribir con token.
- Resultado esperado: llamadas a `/newsletter/subscribe` y `/newsletter/unsubscribe`.

### 5.4 Wishlist
- `/dashboard/wishlist`: agregar a carrito y eliminar item.
- Resultado esperado: carrito y wishlist consistentes.

### 5.5 Reviews
- `/dashboard/reviews`: validar fallback explicito (sin endpoint my-reviews).

## 6. Public pages
### 6.1 Contact
- `/contact`, enviar formulario valido.
- Resultado esperado: `POST /contact` + mensaje de exito.

### 6.2 Repairs
- `/repairs`, enviar solicitud valida.
- Resultado esperado: `POST /repairs` + confirmacion.

### 6.3 Footer newsletter
- Suscripcion desde footer.
- Resultado esperado: `POST /newsletter/subscribe`.

### 6.4 Newsletter unsubscribe publico
- Abrir `/newsletter/unsubscribe?token=...`.
- Resultado esperado: procesa baja y muestra resultado.

## 7. Admin nuevos modulos
### 7.1 Discounts
- `/admin/discounts`: crear/editar/eliminar descuento producto.
- Crear/editar/eliminar promo code.
- Resultado esperado: tablas se actualizan y backend responde sin desalineacion.

### 7.2 Newsletter
- `/admin/newsletter`: ver stats, crear campania, enviar campania, eliminar campania.
- Probar send-monthly-manual y send-promo.

### 7.3 Repairs
- `/admin/repairs`: listar solicitudes y cambiar estado.

### 7.4 Payments
- `/admin/payments`: listar pagos con filtro de estado.

## 8. Catalogo y producto
- Abrir detalle de producto `/products/[id]`.
- Resultado esperado: usa reviews publicas (`/review/product/:id/public`).
- Verificar relacionados (`/products/:id/related`).

## 9. Errores/edge cases obligatorios
- Forzar 401 backend en ruta protegida.
- Resultado esperado: limpieza de sesion y redirect controlado sin loop.
- Checkout con carrito vacio.
- Resultado esperado: bloqueo y mensaje.
- Checkout con stock invalido.
- Resultado esperado: mensaje con issue de stock.
- Promo expirada o no aplicable.
- Resultado esperado: `promoValid=false` + `promoErrors`.

## 10. Criterio de cierre
- Todas las rutas nuevas cargan sin error.
- Sin errores TypeScript (`npm run -s type-check`).
- Sin links rotos en auth/checkout/pagos/admin/dashboard principales.
- Flujos bloqueantes (auth, checkout, pago, ordenes) validados de punta a punta.
