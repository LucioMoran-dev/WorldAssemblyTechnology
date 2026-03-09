# PAGINATION AND FILTERS SPEC

Documento generado a partir del codigo real del backend. Solo contiene informacion verificada en el source code.

---

## 1. Estructura Real del Proyecto

```
src/
├── common/           # Filtros, paginacion, pipes, utilidades compartidas
├── config/           # Configuraciones (DB, OAuth, Redis, Cloudinary, logger, etc.)
├── decorator/        # Decoradores custom (roles, auth)
├── guards/           # Guards de autenticacion y roles
├── infra/            # Infraestructura (Cloudinary repository)
├── interceptors/     # Interceptores HTTP (logging, cache)
├── middlewares/       # Middlewares custom
├── migrations/       # Migraciones de TypeORM
├── modules/          # Modulos de negocio (ver detalle abajo)
└── seeds/            # Seeders de datos iniciales
```

### Modulos dentro de `src/modules/`

| Modulo | Descripcion |
|--------|-------------|
| `auths/` | Autenticacion local y Google OAuth |
| `cart/` | Carrito de compras y checkout |
| `category/` | Categorias de productos |
| `contact/` | Formulario de contacto |
| `discounts/` | Descuentos por producto y codigos promocionales |
| `file/` | Upload de imagenes (Cloudinary) |
| `health/` | Health check |
| `mail/` | Envio de emails y colas |
| `mercadopago/` | Integracion con MercadoPago |
| `newsLetters/` | Newsletter y campanas |
| `orders/` | Ordenes de compra |
| `payments/` | Pagos y webhooks |
| `products/` | Productos, variantes, busqueda |
| `repairs/` | Solicitudes de reparacion |
| `review/` | Resenas de productos |
| `roles/` | Roles de usuario |
| `users/` | Usuarios, direcciones, perfil |
| `wishlist/` | Lista de deseos |

---

## 2. Endpoints que Devuelven Listas

### PRODUCTS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/products` | GET | Productos activos | Si | Si | Si (createdAt DESC) | Si (max 100) |
| `/products/featured` | GET | Productos destacados | No | No | Si (createdAt DESC) | Si (param `limit`, default 10) |
| `/products/brand/:brand` | GET | Productos por marca | No | No | Si (name ASC) | Si (param `limit`, default 20) |
| `/products/category/:categoryId` | GET | Productos por categoria | No | No | Si (createdAt DESC) | Si (param `limit`, default 20) |
| `/products/:id/related` | GET | Productos relacionados | No | No | Si (relevancia) | Si (param `limit`, default 6) |
| `/products/:id/price` | GET | Precio calculado con variantes | No | No | No | No |
| `/products/:id/stock` | GET | Stock disponible con variantes | No | No | No | No |
| `/products/search/hybrid` | SSE | Busqueda hibrida | No | Si (param `q`) | Si (relevancia) | Si (default 10) |

### ORDERS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/orders` | GET | Todas las ordenes (Admin) | Si | Si | Si (createdAt DESC) | Si (max 100) |
| `/orders/my-orders` | GET | Ordenes del usuario | No | No | Si (createdAt DESC) | **NO** |
| `/orders/stats` | GET | Estadisticas de ordenes (Admin) | No | No | No | No |
| `/orders/:id` | GET | Orden por ID (Client) | No | No | No | No |

### USERS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/users` | GET | Usuarios (Admin) | Si | Si | Si (createdAt DESC) | Si (max 100) |
| `/users/:id` | GET | Usuario por ID | No | No | No | No |
| `/users/stats/me` | GET | Estadisticas del usuario | No | No | No | No |
| `/users/addresses/my-addresses` | GET | Direcciones del usuario | No | No | No | **NO** |

### CATEGORIES

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/categories` | GET | Categorias | Si | Si | Si (name ASC) | Si (max 100) |
| `/categories/:id` | GET | Categoria por ID | No | No | No | No |

### REVIEWS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/review` | GET | Reviews (Admin) | Si | Si | Si (createdAt DESC) | Si (max 100) |
| `/review/product/:productId/public` | GET | Reviews publicas | No | No | Si (createdAt DESC) | Si (param `limit`, default 20) |
| `/review/product/:productId` | GET | Reviews por producto (Admin) | No | No | Si (createdAt DESC) | Si (param `limit`, default 50) |
| `/review/can-review/:productId` | GET | Verificar si puede resenar | No | No | No | No |

### REPAIRS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/repairs` | GET | Reparaciones (Admin) | Si | Si | Si (createdAt DESC) | Si (max 100) |
| `/repairs/:id` | GET | Reparacion por ID (Admin) | No | No | No | No |

### DISCOUNTS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/discounts/products` | GET | Descuentos activos (Admin) | No | No | Si (createdAt DESC) | **NO** |
| `/discounts/products/:productId` | GET | Descuento de un producto (publico) | No | No | No | No |
| `/discounts/promo-codes` | GET | Codigos promo (Admin) | No | No | Si (createdAt DESC) | **NO** |
| `/discounts/promo-codes/:id` | GET | Codigo promo por ID (Admin) | No | No | No | No |
| `/discounts/promo-codes/:id/usage` | GET | Usos de un codigo (Admin) | No | No | Si (usedAt DESC) | **NO** |

### PAYMENTS

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/payments` | GET | Todos los pagos (Admin) | Si | No | Si (createdAt DESC) | Si (default 20, max 100) |
| `/payments/my-payments` | GET | Pagos del usuario | Si | No | Si (createdAt DESC) | Si (default 20, max 100) |
| `/payments/status/:paymentId` | GET | Estado de pago (Client) | No | No | No | No |
| `/payments/order/:orderId` | GET | Pago por orden (Admin) | No | No | No | No |

### NEWSLETTER

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/newsletter/stats` | GET | Estadisticas (Admin) | No | Si (campaignType) | No | No |

### WISHLIST

| Endpoint | Metodo | Recurso | Paginacion | Filtros | Ordenamiento | Limite |
|----------|--------|---------|------------|---------|--------------|--------|
| `/wishlist/my-wishlist` | GET | Lista de deseos del usuario | No | No | No | **NO** |
| `/wishlist/summary` | GET | Resumen (count) | No | No | No | No |
| `/wishlist/check/:productId` | GET | Verificar si producto esta en wishlist | No | No | No | No |

---

## 3. Estado Actual de Paginacion

### Infraestructura existente

El proyecto tiene un sistema de paginacion centralizado en `src/common/pagination/`:

- **PaginationQueryDto**: DTO base con `page` (default 1, min 1) y `limit` (default 10, min 1, max 100)
- **paginate()**: Funcion helper que usa `findAndCount()` con `skip/take`
- **IPaginatedResult<T>**: Interface de respuesta `{ items: T[], total: number, pages: number }`

### Endpoints CON paginacion

Todos los endpoints paginados devuelven el mismo formato: `{ items: T[], total: number, pages: number }`

| Endpoint | DTO | Parametros | Default | Max |
|----------|-----|-----------|---------|-----|
| `GET /products` | ProductsSearchQueryDto | `page`, `limit` | page=1, limit=10 | 100 |
| `GET /orders` | OrderFiltersDto | `page`, `limit` | page=1, limit=10 | 100 |
| `GET /users` | UserSearchQueryDto | `page`, `limit` | page=1, limit=10 | 100 |
| `GET /categories` | CategorySearchQueryDto | `page`, `limit` | page=1, limit=10 | 100 |
| `GET /review` | ReviewSearchQueryDto | `page`, `limit` | page=1, limit=10 | 100 |
| `GET /repairs` | RepairSearchQueryDto | `page`, `limit` | page=1, limit=10 | 100 |
| `GET /payments` | PaginationQueryDto | `page`, `limit` | page=1, limit=20 | 100 |
| `GET /payments/my-payments` | PaginationQueryDto | `page`, `limit` | page=1, limit=20 | 100 |

### Endpoints SIN paginacion (con limite opcional)

| Endpoint | Tiene limite? | Riesgo |
|----------|--------------|--------|
| `GET /products/brand/:brand` | Si (param limit, default 20) | Bajo |
| `GET /products/category/:categoryId` | Si (param limit, default 20) | Bajo |
| `GET /products/featured` | Si (param limit, default 10) | Bajo |
| `GET /products/:id/related` | Si (param limit, default 6) | Bajo |
| `GET /review/product/:productId/public` | Si (param limit, default 20) | Bajo |
| `GET /review/product/:productId` | Si (param limit, default 50) | Bajo |

### Endpoints SIN paginacion NI limite

| Endpoint | Riesgo |
|----------|--------|
| `GET /orders/my-orders` | MEDIO - crece con el uso del usuario |
| `GET /users/addresses/my-addresses` | Bajo - pocos registros por usuario |
| `GET /discounts/products` | Bajo - pocos registros |
| `GET /discounts/promo-codes` | MEDIO - crece con el tiempo |
| `GET /discounts/promo-codes/:id/usage` | ALTO - codigos populares |
| `GET /wishlist/my-wishlist` | MEDIO - crece con uso del usuario |

---

## 4. Estado Actual de Filtros

### GET /products

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `name` | string | Length(3, 80) | LOWER(name) LIKE LOWER(%value%) |
| `brand` | string | Length(2, 50) | LOWER(brand) LIKE LOWER(%value%) |
| `basePrice` | number | Min(0.01) | Rango +-10% sobre variantes |
| `minPrice` | number | Min(0) | variant.price >= value |
| `maxPrice` | number | Min(0) | variant.price <= value |
| `categoryId` | string | IsUUID | category.id = value |
| `color` | string | Length(2, 50) | LOWER(variant.color) LIKE LOWER(%value%) |
| `featured` | boolean | Transform string->bool | product.featured = value |

### GET /orders (Admin)

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `status` | OrderStatus | IsEnum | order.status = value |
| `startDate` | string | IsDateString | createdAt >= startDate 00:00:00 |
| `endDate` | string | IsDateString | createdAt <= endDate 23:59:59 |
| `orderNumber` | string | IsString | LOWER(orderNumber) LIKE LOWER(%value%) |
| `userEmail` | string | IsString | LOWER(user.email) LIKE LOWER(%value%) |

Valores posibles de OrderStatus: `pending`, `paid`, `processing`, `shipped`, `delivered`, `cancelled`

### GET /users (Admin)

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `username` | string | IsString | LOWER(username) LIKE LOWER(%value%) |
| `email` | string | IsString | LOWER(email) LIKE LOWER(%value%) |

### GET /categories

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `category` | string | IsString | LOWER(category_name) LIKE LOWER(%value%) |

### GET /review (Admin)

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `rating` | Rating | IsEnum | review.rating = value |
| `productId` | string | IsUUID | review.product_id = value |
| `userName` | string | IsString | LOWER(user.username) LIKE LOWER(%value%) |

Valores posibles de Rating: `1`, `2`, `3`, `4`, `5`

### GET /repairs (Admin)

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `status` | RepairStatus | IsEnum | repair.status = value |
| `urgency` | RepairUrgency | IsEnum | repair.urgency = value |

Valores posibles de RepairStatus: `pending`, `reviewing`, `in_progress`, `completed`, `cancelled`
Valores posibles de RepairUrgency: `low`, `medium`, `high`

### GET /newsletter/stats (Admin)

| Parametro | Tipo | Validacion | Comportamiento interno |
|-----------|------|-----------|----------------------|
| `campaignType` | string | Enum: welcome, monthly, promo | Filtra estadisticas por tipo de campana |

### Endpoints SIN filtros

- `GET /products/featured` - Solo filtra internamente por `featured=true`
- `GET /products/brand/:brand` - El brand viene como path param, no query
- `GET /products/category/:categoryId` - El categoryId viene como path param
- `GET /orders/my-orders` - Filtra internamente por user_id del token
- `GET /payments` - Sin filtros, solo paginacion
- `GET /payments/my-payments` - Filtra internamente por user_id del token
- `GET /discounts/products` - Filtra internamente por isActive=true
- `GET /discounts/promo-codes` - Sin filtros
- `GET /review/product/:productId/public` - productId como path param + isVisible=true
- `GET /wishlist/my-wishlist` - Filtra internamente por user_id del token

---

## 5. Problemas Detectados

1. **Endpoints sin paginacion ni limite**: `GET /orders/my-orders`, `GET /discounts/promo-codes`, `GET /discounts/promo-codes/:id/usage`, `GET /wishlist/my-wishlist` no tienen limite de resultados.

2. **Endpoint publico sin limite en la practica**: `GET /review/product/:productId/public` tiene limite default de 20, pero no es configurable con paginacion completa. Un producto muy popular podria tener mas de 20 resenas sin forma de paginar.

3. **`GET /newsletter/stats` sin DTO de filtro**: El filtro `campaignType` se procesa pero no tiene un DTO de validacion formal con class-validator.

4. **Filtros faltantes en endpoints con paginacion**: `GET /products` no permite filtrar por `isActive` desde el frontend (siempre filtra `isActive=true` internamente). Esto es correcto para el cliente pero el admin no tiene forma de ver productos inactivos.

5. **Discounts sin paginacion**: `GET /discounts/products` y `GET /discounts/promo-codes` devuelven todos los registros sin paginacion.

---

## 6. Enums Referencia Rapida

### OrderStatus
```
pending | paid | processing | shipped | delivered | cancelled
```

### Rating
```
1 | 2 | 3 | 4 | 5
```

### RepairStatus
```
pending | reviewing | in_progress | completed | cancelled
```

### RepairUrgency
```
low | medium | high
```

### DeviceType
```
laptop | desktop | monitor | hard-drive | component | other
```

### TechVariantType
```
ram | storage | processor | vram | color | connectivity | screen_size | resolution | refresh_rate | warranty | condition | switch
```

### DiscountType
```
percentage | fixed
```

### CampaignType (Newsletter)
```
welcome | monthly | promo
```

---

## 7. Especificacion Final para Frontend

### GET /products
**Auth:** Publico | **Cache:** Si

```
GET /products?page=1&limit=10&name=Laptop&brand=Dell&categoryId=uuid&color=Black&minPrice=100&maxPrice=2000&featured=true
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | `1` | Page number |
| limit | Number | No | `10` | Products per page (max 100) |
| name | String | No | `"Laptop"` | Search by product name (partial, case-insensitive) |
| brand | String | No | `"Dell"` | Filter by brand (partial, case-insensitive) |
| categoryId | String | No | `"123e4567-e89b-12d3-a456-426614174000"` | Filter by category ID (UUID) |
| color | String | No | `"Black"` | Filter by variant color (partial, case-insensitive) |
| minPrice | Number | No | `100` | Minimum product price |
| maxPrice | Number | No | `2000` | Maximum product price |
| basePrice | Number | No | `1000` | Search products in price range (+-10%) - Use minPrice/maxPrice for exact ranges |
| featured | Boolean | No | `true` | Filter featured products only |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "brand": "string",
      "model": "string | undefined",
      "basePrice": 1299.99,
      "baseStock": 10,
      "finalPrice": 1104.99,
      "originalPrice": 1299.99,
      "totalStock": 50,
      "category_name": "Laptops",
      "imgUrls": ["https://res.cloudinary.com/..."],
      "specifications": {},
      "hasVariants": true,
      "isActive": true,
      "featured": true,
      "variants": [
        {
          "id": "uuid",
          "type": "ram",
          "name": "16GB DDR4",
          "description": "string | undefined",
          "priceModifier": 150.00,
          "stock": 10,
          "isAvailable": true,
          "sortOrder": 1,
          "createdAt": "2026-01-01T00:00:00.000Z",
          "updatedAt": "2026-01-01T00:00:00.000Z"
        }
      ],
      "hasActiveDiscount": true,
      "discountAmount": 195.00,
      "discountPercentage": 15,
      "discountEndDate": "2026-03-01T00:00:00.000Z",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 120,
  "pages": 12
}
```

---

### GET /products/featured
**Auth:** Publico | **Cache:** Si

```
GET /products/featured?limit=10
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| limit | Number | No | `10` | Maximum number of products to return |

**Response:** Array directo de `ResponseProductDto[]` (misma estructura que items de /products)

---

### GET /products/brand/:brand
**Auth:** Publico | **Cache:** Si

```
GET /products/brand/Dell?limit=20
```

**Path Params:**
| Param | Type | Description | Example |
|-------|------|-------------|---------|
| brand | String | Brand name | `"Dell"` |

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| limit | Number | No | `20` | Maximum number of products to return |

**Response:** Array directo de `ResponseProductDto[]`

---

### GET /products/category/:categoryId
**Auth:** Publico | **Cache:** Si

```
GET /products/category/123e4567-e89b-12d3-a456-426614174000?limit=20
```

**Path Params:**
| Param | Type | Description | Example |
|-------|------|-------------|---------|
| categoryId | String | Category ID (UUID) | `"123e4567-e89b-12d3-a456-426614174000"` |

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| limit | Number | No | `20` | Maximum number of products to return |

**Response:** Array directo de `ResponseProductDto[]`

---

### GET /products/:id/related
**Auth:** Publico | **Cache:** Si

```
GET /products/123e4567-e89b-12d3-a456-426614174000/related?limit=6
```

**Path Params:**
| Param | Type | Description | Example |
|-------|------|-------------|---------|
| id | String | Product ID (UUID) | `"123e4567-e89b-12d3-a456-426614174000"` |

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| limit | Number | No | `6` | Number of related products |

**Response:** Array directo de `ResponseProductDto[]`

---

### GET /products/:id/price
**Auth:** Publico

```
GET /products/uuid/price?variants=uuid1,uuid2
```

**Path Params:**
| Param | Type | Description |
|-------|------|-------------|
| id | String | Product ID |

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| variants | String | No | `"uuid1,uuid2,uuid3"` | Variant IDs separated by commas |

**Response:**
```json
{
  "productId": "uuid",
  "variantIds": ["uuid1", "uuid2"],
  "finalPrice": 1549.99
}
```

---

### GET /products/:id/stock
**Auth:** Publico

```
GET /products/uuid/stock?variants=uuid1,uuid2
```

**Path Params:**
| Param | Type | Description |
|-------|------|-------------|
| id | String | Product ID |

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| variants | String | No | `"uuid1,uuid2,uuid3"` | Variant IDs separated by commas |

**Response:**
```json
{
  "productId": "uuid",
  "variantIds": ["uuid1", "uuid2"],
  "availableStock": 10
}
```

---

### GET /orders (Admin)
**Auth:** Admin

```
GET /orders?page=1&limit=10&status=paid&startDate=2024-01-01&endDate=2024-12-31&orderNumber=ORD-2024&userEmail=john@example.com
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | `1` | Page |
| limit | Number | No | `10` | Limit per page |
| status | Enum (OrderStatus) | No | `"paid"` | Filter by status. Values: `pending`, `paid`, `processing`, `shipped`, `delivered`, `cancelled` |
| startDate | String | No | `"2024-01-01"` | Start date (YYYY-MM-DD) |
| endDate | String | No | `"2024-12-31"` | End date (YYYY-MM-DD) |
| orderNumber | String | No | `"ORD-2024-01-0001"` | Search by order number |
| userEmail | String | No | `"john@example.com"` | Search by user email |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "orderNumber": "ORD-2024-01-0001",
      "status": "paid",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z",
      "user": {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "phone": "string | undefined"
      },
      "orderDetail": {
        "id": "uuid",
        "subtotal": 1000,
        "tax": 210,
        "shipping": 500,
        "total": 1710,
        "totalDiscount": 0,
        "promoCodeUsed": null,
        "shippingAddress": {
          "id": "uuid",
          "label": "Casa",
          "street": "Av. Siempreviva 742",
          "city": "Springfield",
          "province": "Buenos Aires",
          "postalCode": "1234",
          "country": "Argentina",
          "isDefault": true
        },
        "shippingAddressId": "uuid | null",
        "paymentMethod": "credit_card",
        "items": [
          {
            "id": "uuid",
            "quantity": 2,
            "unitPrice": 500,
            "subtotal": 1000,
            "originalUnitPrice": 600,
            "discountAmount": 200,
            "discountSource": "CODE",
            "discountCode": "NEWS30",
            "productSnapshot": {
              "name": "Laptop Pro",
              "description": "string",
              "basePrice": 600,
              "brand": "Dell",
              "model": "XPS 15"
            },
            "variantsSnapshot": [
              {
                "id": "uuid",
                "type": "ram",
                "name": "16GB DDR4",
                "priceModifier": 150
              }
            ],
            "createdAt": "2026-01-01T00:00:00.000Z"
          }
        ]
      }
    }
  ],
  "total": 50,
  "pages": 5
}
```

---

### GET /orders/my-orders
**Auth:** Client

```
GET /orders/my-orders
```

**Swagger Query Params:** Ninguno.

**Response:** Array directo de `ResponseOrderDto[]` (misma estructura que items de /orders)

---

### GET /orders/stats (Admin)
**Auth:** Admin

```
GET /orders/stats
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "totalOrders": 150,
  "ordersByStatus": {
    "pending": 10,
    "paid": 25,
    "processing": 15,
    "shipped": 30,
    "delivered": 70
  },
  "revenue": {
    "total": 500000,
    "monthly": 45000
  },
  "completionRate": "80.00%"
}
```

---

### GET /orders/:id (Client)
**Auth:** Client

```
GET /orders/uuid
```

**Swagger Query Params:** Ninguno.

**Response:** Un solo `ResponseOrderDto` (misma estructura que un item de /orders)

---

### GET /users (Admin)
**Auth:** Admin

```
GET /users?page=1&limit=10&username=john&email=john@example.com
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | - | Page number |
| limit | Number | No | - | Items per page (max 100) |
| username | String | No | - | Username to search for users |
| email | String | No | - | Email to search for users |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "birthDate": "1990-01-01T00:00:00.000Z",
      "phone": "string",
      "username": "string",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "deletedAt": null,
      "address": [
        {
          "id": "uuid",
          "label": "Casa",
          "street": "string",
          "city": "string",
          "province": "string",
          "postalCode": "string",
          "country": "string",
          "isDefault": true
        }
      ],
      "role": "CLIENT"
    }
  ],
  "total": 200,
  "pages": 20
}
```

---

### GET /users/:id
**Auth:** Autenticado

```
GET /users/uuid
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "phone": "string",
  "username": "string",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "deletedAt": null,
  "address": [],
  "wishlistCount": 5,
  "cart": {},
  "role": "CLIENT"
}
```

---

### GET /users/stats/me
**Auth:** Autenticado

```
GET /users/stats/me
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "totalOrders": 12,
  "totalSpent": 45000,
  "wishlistItemsCount": 5,
  "reviewsCount": 3
}
```

---

### GET /users/addresses/my-addresses
**Auth:** Client / Admin

```
GET /users/addresses/my-addresses
```

**Swagger Query Params:** Ninguno.

**Response:** Array directo
```json
[
  {
    "id": "uuid",
    "label": "Casa",
    "street": "string",
    "city": "string",
    "province": "string",
    "postalCode": "string",
    "country": "string",
    "isDefault": true
  }
]
```

---

### GET /categories
**Auth:** Publico | **Cache:** Si

```
GET /categories?page=1&limit=10&category=laptop
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | - | Page number |
| limit | Number | No | - | Items per page (max 100) |
| category | String | No | `"Laptops"` | Search by category name (partial, case-insensitive) |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "category_name": "Laptops"
    }
  ],
  "total": 15,
  "pages": 2
}
```

---

### GET /review (Admin)
**Auth:** Admin

```
GET /review?page=1&limit=10&rating=5&productId=uuid&userName=john
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | - | Page number |
| limit | Number | No | - | Items per page (max 100) |
| rating | Enum (Rating) | No | - | Filter by rating. Values: `1`, `2`, `3`, `4`, `5` |
| productId | String | No | - | Filter by product ID |
| userName | String | No | - | Search by username |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "rating": 5,
      "message": "string",
      "isVisible": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z",
      "user": {
        "id": "uuid",
        "name": "string",
        "email": "string"
      },
      "product": {
        "id": "uuid",
        "name": "string"
      }
    }
  ],
  "total": 50,
  "pages": 5
}
```

---

### GET /review/product/:productId/public
**Auth:** Publico | **Cache:** Si

```
GET /review/product/uuid/public?limit=20
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| limit | Number | No | `20` | Max reviews to return |

**Response:** Array directo (SIN campo `isVisible`)
```json
[
  {
    "id": "uuid",
    "rating": 5,
    "message": "string",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "user": {
      "id": "uuid",
      "name": "string"
    },
    "product": {
      "id": "uuid",
      "name": "string"
    }
  }
]
```

---

### GET /review/product/:productId (Admin)
**Auth:** Admin

```
GET /review/product/uuid?limit=50
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| limit | Number | No | `50` | Max reviews to return |

**Response:** Array directo (misma estructura que public pero incluye `isVisible`)

---

### GET /review/can-review/:productId
**Auth:** Autenticado

```
GET /review/can-review/uuid
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "canReview": true,
  "hasReviewed": false,
  "message": "string"
}
```

---

### GET /repairs (Admin)
**Auth:** Admin

```
GET /repairs?page=1&limit=10&status=pending&urgency=high
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | - | Page number |
| limit | Number | No | - | Items per page (max 100) |
| status | Enum (RepairStatus) | No | - | Filter by repair status. Values: `pending`, `reviewing`, `in_progress`, `completed`, `cancelled` |
| urgency | Enum (RepairUrgency) | No | - | Filter by urgency level. Values: `low`, `medium`, `high` |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "deviceType": "laptop",
      "brand": "string",
      "model": "string",
      "issueDescription": "string",
      "urgency": "high",
      "status": "pending",
      "adminNotes": null,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 30,
  "pages": 3
}
```

---

### GET /discounts/products (Admin)
**Auth:** Admin

```
GET /discounts/products
```

**Swagger Query Params:** Ninguno.

**Response:** Array directo (SIN paginacion)
```json
[
  {
    "id": "uuid",
    "discountType": "percentage",
    "value": 15,
    "startDate": "2026-01-01T00:00:00.000Z",
    "endDate": "2026-03-01T00:00:00.000Z",
    "isActive": true,
    "product_id": "uuid",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

### GET /discounts/products/:productId (publico)
**Auth:** Publico

```
GET /discounts/products/uuid
```

**Swagger Query Params:** Ninguno.

**Response:** Un solo `ProductDiscountResponseDto` o `null`

---

### GET /discounts/promo-codes (Admin)
**Auth:** Admin

```
GET /discounts/promo-codes
```

**Swagger Query Params:** Ninguno.

**Response:** Array directo (SIN paginacion)
```json
[
  {
    "id": "uuid",
    "code": "PROMO20",
    "description": "string | null",
    "discountType": "percentage",
    "value": 20,
    "startDate": "2026-01-01T00:00:00.000Z",
    "endDate": "2026-12-31T00:00:00.000Z",
    "isActive": true,
    "maxUses": 100,
    "currentUses": 45,
    "maxUsesPerUser": 1,
    "minOrderAmount": 5000,
    "applicableProductIds": null,
    "applicableCategoryIds": null,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

### GET /discounts/promo-codes/:id/usage (Admin)
**Auth:** Admin

```
GET /discounts/promo-codes/uuid/usage
```

**Swagger Query Params:** Ninguno.

**Response:** Array directo (SIN paginacion)
```json
[
  {
    "id": "uuid",
    "promo_code_id": "uuid",
    "user_id": "uuid",
    "order_id": "uuid",
    "discountAmount": 500,
    "usedAt": "2026-01-15T10:30:00.000Z"
  }
]
```

---

### GET /payments (Admin)
**Auth:** Admin

```
GET /payments?page=1&limit=20
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | `1` | Page number |
| limit | Number | No | `20` | Items per page (max 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "payment_id": "148752455558",
      "user_id": "uuid",
      "order_id": "uuid",
      "status": "approved",
      "status_detail": "accredited",
      "amount": 1710,
      "currency_id": "ARS",
      "payment_type_id": "credit_card",
      "payment_method_id": "visa",
      "date_approved": "2026-01-01T00:00:00.000Z",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 500,
  "pages": 25
}
```

---

### GET /payments/my-payments
**Auth:** Autenticado

```
GET /payments/my-payments?page=1&limit=20
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| page | Number | No | `1` | Page number |
| limit | Number | No | `20` | Items per page (max 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "paymentId": "148752455558",
      "status": "approved",
      "statusDetail": "accredited",
      "amount": 1710,
      "currencyId": "ARS",
      "paymentTypeId": "credit_card",
      "paymentMethodId": "visa",
      "dateApproved": "2026-01-01T00:00:00.000Z",
      "orderId": "uuid",
      "userId": "uuid",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 25,
  "pages": 2
}
```

**NOTA**: El formato de campos difiere entre `/payments` (snake_case: `payment_id`, `user_id`) y `/payments/my-payments` (camelCase: `paymentId`, `userId`).

---

### GET /payments/status/:paymentId (Client)
**Auth:** Client

```
GET /payments/status/148752455558
```

**Swagger Query Params:** Ninguno.

**Response:** Estado del pago consultado a MercadoPago.

---

### GET /payments/order/:orderId (Admin)
**Auth:** Admin

```
GET /payments/order/uuid
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "id": "uuid",
  "paymentId": "148752455558",
  "status": "approved",
  "statusDetail": "accredited",
  "amount": 1710,
  "currencyId": "ARS",
  "paymentTypeId": "credit_card",
  "paymentMethodId": "visa",
  "dateApproved": "2026-01-01T00:00:00.000Z",
  "orderId": "uuid",
  "userId": "uuid",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

---

### GET /newsletter/stats (Admin)
**Auth:** Admin

```
GET /newsletter/stats?campaignType=monthly
```

**Swagger Query Params:**
| Param | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| campaignType | Enum | No | - | Filter by campaign type. Values: `welcome`, `monthly`, `promo` |

**Response:**
```json
{
  "total": 500,
  "sent": 480,
  "failed": 20,
  "opened": 200,
  "clicked": 50
}
```

---

### GET /wishlist/my-wishlist
**Auth:** Client

```
GET /wishlist/my-wishlist
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "addedAt": "2026-01-01T00:00:00.000Z",
      "product": {
        "id": "uuid",
        "name": "string",
        "description": "string",
        "brand": "string",
        "model": "string",
        "basePrice": 1299.99,
        "baseStock": 10,
        "imgUrls": ["https://..."],
        "featured": true,
        "isActive": true,
        "category": {
          "id": "uuid",
          "name": "Laptops"
        }
      }
    }
  ],
  "totalItems": 5,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### GET /wishlist/summary
**Auth:** Client

```
GET /wishlist/summary
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "itemCount": 5
}
```

---

### GET /wishlist/check/:productId
**Auth:** Client

```
GET /wishlist/check/uuid
```

**Swagger Query Params:** Ninguno.

**Response:**
```json
{
  "isInWishlist": true
}
```
