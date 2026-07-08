# Changelog para el Front-end

> Resumen de los cambios del back que **impactan al front**: endpoints nuevos, cambios de contrato y bugs arreglados.
> Todo verificado contra el server corriendo. Lo interno (config, tipos, migraciones) no está acá porque no cambia nada para el front.

---

## 0. ⚠️ Formato de errores (leer primero — aplica a TODO)

Todos los errores vienen envueltos por un filter global con esta forma:

```jsonc
{
  "statusCode": 400,
  "timestamp": "2026-06-30T02:30:58.340Z",
  "path": "/products/with-images",
  "error": {
    "message": "...",        // 👈 string  O  string[]
    "error": "Bad Request",
    "statusCode": 400
  }
}
```

🔴 **El mensaje está en `error.response.data.error.message`, NO en `data.message`.**
🔴 **Puede ser `string` o `string[]`** (array = errores de validación de DTO). Contemplá los dos:

```ts
function getApiErrorMessage(error: AxiosError<any>): string {
  const msg = error.response?.data?.error?.message;
  if (Array.isArray(msg)) return msg.join('\n');
  return msg ?? 'Error inesperado';
}
```

---

## 1. 🆕 Crear producto CON imágenes en un request — `POST /products/with-images`

Antes: crear producto (JSON) y después subir imágenes de a una. Ahora se puede en **un solo request atómico**.

- **Auth:** `Authorization: Bearer <token>` — solo ADMIN.
- **Content-Type:** `multipart/form-data`.

**Form fields (nombres exactos):**

| Field | Tipo | Notas |
|---|---|---|
| `data` | string (JSON) | El `CreateProductDto` con `JSON.stringify`. **No mandar `imgUrls` adentro** (se ignora). |
| `images` | File[] | 0..N archivos, **mismo key `images`** repetido. Opcional (se puede crear sin imágenes). |

**FormData:**
```ts
const fd = new FormData();
fd.append('data', JSON.stringify(dto));   // sin imgUrls
images.forEach((f) => fd.append('images', f));
await api.post('/products/with-images', fd, { headers: { Authorization: `Bearer ${token}` } });
// NO setear Content-Type a mano: el browser pone el boundary solo.
```

**Respuesta `201`** — el producto completo con `imgUrls` ya poblado (podés escribir el cache de React Query directo):

```jsonc
{
  "id": "21105144-ebda-481f-aa88-e7eaa452dd9c",
  "name": "Mouse Gamer X",
  "description": "...",
  "brand": "Logitech",
  "basePrice": 9.99,
  "baseStock": 5,
  "finalPrice": 9.99,
  "originalPrice": 9.99,
  "totalStock": 5,
  "category_name": "Accessories",
  "imgUrls": [
    "https://res.cloudinary.com/dub48rf0p/image/upload/v1782775821/products/wuahezz9.png",
    "https://res.cloudinary.com/dub48rf0p/image/upload/v1782775822/products/yz9asc50.png"
  ],
  "specifications": {},
  "hasVariants": false,
  "isActive": true,
  "featured": false,
  "variants": [],
  "hasActiveDiscount": false,
  "discountAmount": 0,
  "discountPercentage": null,
  "discountEndDate": null,
  "createdAt": "2026-06-30T02:30:23.630Z",
  "updatedAt": "2026-06-30T02:30:23.630Z"
}
```

**Límites:** máx **8 imágenes**, **5 MB** c/u, tipos `jpeg/jpg/png/webp` (sin GIF).

**Errores (status + `error.message`):**

| Caso | HTTP | `error.message` |
|---|---|---|
| Falta `data` | 400 | `"Missing \"data\" field with the product JSON"` |
| `data` no es JSON | 400 | `"\"data\" must be a valid JSON string"` |
| Validación de DTO | 400 | **array** ej: `["name must be longer than or equal to 3 characters", ...]` |
| Tipo de archivo inválido | 400 | `"Tipo de archivo no permitido. Solo se permiten: JPEG, JPG, PNG, WEBP"` |
| Más de 8 imágenes | 400 | `"Too many files"` |
| Imagen > 5 MB | **413** | `"File too large"` |
| Nombre duplicado | 400 | `"A product with the name 'X' already exists"` |
| Categoría inexistente | 404 | `"Category 'X' not found"` |
| Sin token / no admin | 401 | `"Authentication token required"` |

> El flujo viejo sigue existiendo: `POST /products` (JSON, sin imágenes) para crear, y `POST /files/uploadImage/:id` para agregar imágenes a un producto ya creado (edición).

---

## 2. 🔧 `GET /products` — filtro `isActive` + visibilidad de inactivos para admin

Se agregó el filtro `isActive` (boolean). **El comportamiento depende de si mandás token de admin.**

### Sin token (tienda pública)
Siempre solo **activos**, mande lo que mande. La tienda no cambia.

### Con token de admin (`Authorization: Bearer <token>`)
| `isActive` | Devuelve |
|---|---|
| `true` | solo activos |
| `false` | **solo inactivos** |
| **omitido** | **TODOS** (activos + inactivos) |

👉 **Para el panel admin**, mandá el token en `GET /products` y mapeá el selector de Estado:
- **Activos** → `?isActive=true`
- **Inactivos** → `?isActive=false`
- **Todos** → **omitir** `isActive`

> Sin token, "omitir" = solo activos. El "Todos" real **requiere token**.

**Se combina con los demás filtros** (`name`, `brand`, `categoryId`, `minPrice`, `featured`, etc.) con AND, y respeta `page`/`limit`.

**Respuesta `200`** (paginada):
```jsonc
{
  "items": [ /* array de productos, mismo shape que el ejemplo de §1 */ ],
  "total": 42,
  "pages": 5
}
```

---

## 3. 🔧 `GET /products/:id` — detalle admin-gated

Para poder **abrir el detalle de un producto inactivo** (que ahora aparece en el listado "Inactivos" del panel):

| Quién | Producto activo | Producto inactivo |
|---|---|---|
| Público (sin token) | 200 (lo devuelve) | **404** |
| Admin (con token) | 200 | **200** (lo devuelve) |

👉 En el panel, las llamadas al detalle deben mandar el `Authorization: Bearer <token>` también. Si no, un inactivo del listado daría 404 al abrirlo.

Respuesta `200`: mismo shape de producto que §1.

---

## 4. 🐛 `POST /files/uploadImage/:id` — ahora ACUMULA imágenes (antes reemplazaba)

**Bug arreglado.** Antes, al subir varias imágenes secuenciales a un producto, quedaba **solo la última**. Ahora **acumula** correctamente.

- **Auth:** Bearer admin. **Content-Type:** `multipart/form-data`. Field: **`file`** (una imagen por request).
- Mismos límites: 5 MB, `jpeg/jpg/png/webp`.

**Respuesta `201`:**
```json
{ "id": "58bd267d-4b42-4c4f-8849-274e61bc89b8", "url": "https://res.cloudinary.com/.../img.png" }
```

👉 Para el front: podés subir N imágenes de a una a este endpoint y **todas quedan** en el producto (verificado: 3 subidas → las 3 en `imgUrls`). Para crear producto + imágenes de una sola vez, usá el endpoint nuevo de §1.

---

## 5. 🐛 `GET /categories` — ahora devuelve TODAS las categorías (antes devolvía 1)

**Bug arreglado.** La query devolvía **1 sola categoría** (paginaba mal por un problema del ORM). Ahora devuelve todas, paginadas.

- Público, sin auth. Params opcionales: `page` (default 1), `limit` (default 10), `category` (búsqueda por nombre parcial).

**Respuesta `200`:**
```jsonc
{
  "total": 12,
  "pages": 2,
  "items": [
    {
      "id": "be1c1a42-4818-4bcc-b233-486e2781deeb",
      "category_name": "Accessories",
      "products": [ /* productos de la categoría */ ]
    }
    // ... hasta `limit` categorías
  ]
}
```

👉 Para el front: si antes hacías un workaround por esto (hardcodear categorías, etc.), ya no hace falta. Ojo: hay **cache de 60s**, así que justo después del deploy puede tardar hasta 1 minuto en reflejar; después se corrige solo.

---

## Resumen rápido

| Ruta | Cambio | Para el front |
|---|---|---|
| `POST /products/with-images` | 🆕 nuevo | Crear producto + imágenes en 1 request (FormData) |
| `GET /products` | 🔧 `isActive` + admin-gated | Selector de Estado en el panel (con token) |
| `GET /products/:id` | 🔧 admin-gated | Abrir detalle de inactivos (con token) |
| `POST /files/uploadImage/:id` | 🐛 fix | Acumula imágenes (antes reemplazaba) |
| `GET /categories` | 🐛 fix | Devuelve todas (antes 1) |

**Lo transversal más importante:** leer errores desde `error.response.data.error.message` (string o array), y **mandar el token de admin** en las llamadas del panel a `/products` y `/products/:id` para ver inactivos.
