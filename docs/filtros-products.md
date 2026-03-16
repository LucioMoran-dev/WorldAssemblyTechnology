# Filtros del Endpoint GET /products

## Stack y Archivos

- **Framework**: NestJS + TypeORM + PostgreSQL
- **DTO**: `src/modules/products/dto/PaginationQueryDto.ts` — clase `ProductsSearchQueryDto`
- **Service**: `src/modules/products/products.service.ts` — método `getProducts()`
- **Controller**: `src/modules/products/products.controller.ts` — decoradores `@ApiQuery`

---

## Tabla Resumen de Filtros

| Filtro | Tipo | Tabla | Lógica SQL |
|--------|------|-------|------------|
| `name` | string | `products` | `LIKE` case-insensitive |
| `brand` | string | `products` | `LIKE` case-insensitive |
| `categoryId` | UUID | `products` | Igualdad exacta (`=`) |
| `featured` | boolean | `products` | Igualdad exacta (`=`) |
| `minPrice` | number | `products` | `>=` |
| `maxPrice` | number | `products` | `<=` |
| `basePrice` | number | `products` + `product_variants` | `BETWEEN ±10%` con EXISTS |
| `color` | string | `product_variants` | EXISTS + LIKE |
| `ram` | string | `product_variants` | EXISTS + LIKE |
| `storage` | string | `product_variants` | EXISTS + LIKE |
| `processor` | string | `product_variants` | EXISTS + LIKE |
| `vram` | string | `product_variants` | EXISTS + LIKE |
| `screen_size` | string | `product_variants` | EXISTS + LIKE |
| `resolution` | string | `product_variants` | EXISTS + LIKE |
| `refresh_rate` | string | `product_variants` | EXISTS + LIKE |
| `connectivity` | string | `product_variants` | EXISTS + LIKE |
| `condition` | string | `product_variants` | EXISTS + LIKE |
| `inStock` | boolean | `products` + `product_variants` | Lógica dual (hasVariants) |
| `discounted` | boolean | `product_discounts` | EXISTS con validación temporal |

---

## Detalle por Categoría

### 1. Filtro de Campo Directo

Filtran directamente sobre columnas de la tabla `products`.

#### Ejemplo: `name` (string con LIKE)

**DTO:**
```typescript
@ApiProperty({
  example: 'Dell Inspiron',
  required: false,
  description: 'Search by product name',
  minLength: 3,
  maxLength: 80,
})
@IsOptional()
@Length(3, 80)
@IsString()
name?: string;
```

**Service:**
```typescript
if (name) {
  queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
    name: `%${name}%`,
  });
}
```

**Controller:**
```typescript
@ApiQuery({
  name: 'name',
  required: false,
  type: String,
  description: 'Search by product name (partial, case-insensitive)',
  example: 'Laptop',
})
```

#### Ejemplo: `brand` (string con LIKE)

**Service:**
```typescript
if (brand) {
  queryBuilder.andWhere('LOWER(product.brand) LIKE LOWER(:brand)', {
    brand: `%${brand}%`,
  });
}
```

#### Ejemplo: `categoryId` (UUID con igualdad)

**DTO:**
```typescript
@ApiProperty({
  example: '123e4567-e89b-12d3-a456-426614174000',
  required: false,
  description: 'Filter by category ID (UUID)',
})
@IsOptional()
@IsUUID()
categoryId?: string;
```

**Service:**
```typescript
if (categoryId) {
  queryBuilder.andWhere('product.category_id = :categoryId', { categoryId: String(categoryId) });
}
```

#### Ejemplo: `featured` (boolean con igualdad)

**DTO:**
```typescript
@ApiProperty({
  example: true,
  required: false,
  description: 'Filter only featured products',
  type: Boolean,
})
@IsOptional()
@IsBoolean()
@Transform(({ value }) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return typeof value === 'boolean' ? value : undefined;
})
featured?: boolean;
```

**Service:**
```typescript
if (featured !== undefined) {
  queryBuilder.andWhere('product.featured = :featured', { featured });
}
```

> **Nota**: Los booleanos requieren `@Transform` porque los query params llegan como string `"true"` / `"false"`.

---

### 2. Filtro de Rango de Precio

Tres filtros que interactúan entre sí: `minPrice`, `maxPrice`, `basePrice`.

**DTO (los tres):**
```typescript
@IsOptional()
@IsNumber()
@Type(() => Number)
@Min(0)
minPrice?: number;

@IsOptional()
@IsNumber()
@Type(() => Number)
@Min(0)
maxPrice?: number;

@IsOptional()
@IsNumber()
@Type(() => Number)
@Min(0.01)
basePrice?: number;
```

**Service (lógica combinada):**
```typescript
// No se pueden usar basePrice con minPrice/maxPrice al mismo tiempo
if (basePrice && (minPrice !== undefined || maxPrice !== undefined)) {
  throw new BadRequestException('Cannot use basePrice with minPrice/maxPrice. Use one or the other.');
}

if (minPrice !== undefined && maxPrice !== undefined) {
  queryBuilder.andWhere('product.basePrice BETWEEN :minPriceRange AND :maxPriceRange', {
    minPriceRange: Number(minPrice),
    maxPriceRange: Number(maxPrice),
  });
} else if (minPrice !== undefined) {
  queryBuilder.andWhere('product.basePrice >= :minPriceRange', { minPriceRange: Number(minPrice) });
} else if (maxPrice !== undefined) {
  queryBuilder.andWhere('product.basePrice <= :maxPriceRange', { maxPriceRange: Number(maxPrice) });
} else if (basePrice) {
  // Busca productos cuyo precio base O precio con variante esté en el rango ±10%
  queryBuilder.andWhere(
    '(product.basePrice BETWEEN :basePriceMin AND :basePriceMax OR ' +
      'EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = product.id AND ' +
      '(product.basePrice + pv.priceModifier) BETWEEN :basePriceMin AND :basePriceMax))',
    {
      basePriceMin: basePrice * 0.9,
      basePriceMax: basePrice * 1.1,
    },
  );
}
```

---

### 3. Filtro de Variante

10 filtros que buscan en la tabla `product_variants` usando EXISTS + LIKE. Todos comparten la misma lógica genérica.

**Variantes soportadas:** `color`, `ram`, `storage`, `processor`, `vram`, `screen_size`, `resolution`, `refresh_rate`, `connectivity`, `condition`

**DTO (ejemplo: ram):**
```typescript
@ApiProperty({
  example: '16GB',
  required: false,
  description: 'Filter by RAM variant (partial, case-insensitive)',
  minLength: 1,
  maxLength: 50,
})
@IsOptional()
@Length(1, 50)
@IsString()
ram?: string;
```

**Service (todos los filtros de variante se procesan en batch):**
```typescript
// Primero se recopilan los filtros activos
const variantFilters: { type: string; value: string }[] = [];
if (color) variantFilters.push({ type: 'color', value: color });
if (ram) variantFilters.push({ type: 'ram', value: ram });
if (storage) variantFilters.push({ type: 'storage', value: storage });
if (processor) variantFilters.push({ type: 'processor', value: processor });
if (vram) variantFilters.push({ type: 'vram', value: vram });
if (screen_size) variantFilters.push({ type: 'screen_size', value: screen_size });
if (resolution) variantFilters.push({ type: 'resolution', value: resolution });
if (refresh_rate) variantFilters.push({ type: 'refresh_rate', value: refresh_rate });
if (connectivity) variantFilters.push({ type: 'connectivity', value: connectivity });
if (condition) variantFilters.push({ type: 'condition', value: condition });

// Luego se aplican como EXISTS individuales
for (const filter of variantFilters) {
  const paramKey = `variant_${filter.type}`;
  queryBuilder.andWhere(
    `EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = product.id ` +
      `AND pv.type = :${paramKey}_type AND LOWER(pv.name) LIKE LOWER(:${paramKey}_value))`,
    { [`${paramKey}_type`]: filter.type, [`${paramKey}_value`]: `%${filter.value}%` },
  );
}
```

> **Nota**: Cada filtro de variante genera un EXISTS independiente, así que se pueden combinar (`?ram=16GB&color=Black`).

---

### 4. Filtro EXISTS en Tabla Relacionada

Filtros que verifican la existencia de registros en tablas relacionadas.

#### `inStock` (boolean)

Lógica dual: si el producto tiene variantes, busca variantes con stock; si no, verifica `baseStock`.

**DTO:**
```typescript
@IsOptional()
@IsBoolean()
@Transform(({ value }) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return typeof value === 'boolean' ? value : undefined;
})
inStock?: boolean;
```

**Service:**
```typescript
if (inStock === true) {
  queryBuilder.andWhere(
    '((product.hasVariants = false AND product.baseStock > 0) OR ' +
      '(product.hasVariants = true AND EXISTS (SELECT 1 FROM product_variants pv ' +
      'WHERE pv.product_id = product.id AND pv.is_available = true AND pv.stock > 0)))',
  );
}
```

#### `discounted` (boolean)

Verifica que exista un descuento activo en `product_discounts` con validación temporal.

**DTO:**
```typescript
@IsOptional()
@IsBoolean()
@Transform(({ value }) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return typeof value === 'boolean' ? value : undefined;
})
discounted?: boolean;
```

**Service:**
```typescript
if (discounted === true) {
  queryBuilder.andWhere(
    `EXISTS (SELECT 1 FROM product_discounts pd WHERE pd.product_id = product.id ` +
      `AND pd.is_active = true ` +
      `AND (pd.start_date IS NULL OR pd.start_date <= NOW()) ` +
      `AND (pd.end_date IS NULL OR pd.end_date >= NOW()))`,
  );
}
```

> **Índice existente**: `[product_id, isActive]` en `product_discounts` optimiza esta query.

---

## Guía: Cómo Agregar un Nuevo Filtro

### Paso 1 — DTO (`src/modules/products/dto/PaginationQueryDto.ts`)

Agregar el campo al final de `ProductsSearchQueryDto`:

```typescript
@ApiProperty({
  example: /* valor de ejemplo */,
  required: false,
  description: '...',
})
@IsOptional()
// Agregar validador según tipo:
// String: @IsString() @Length(min, max)
// Number: @IsNumber() @Type(() => Number) @Min(valor)
// Boolean: @IsBoolean() @Transform(({ value }) => { ... })
// UUID: @IsUUID()
nuevoFiltro?: tipo;
```

### Paso 2 — Service (`src/modules/products/products.service.ts`)

**Cambio A** — Extraer del destructuring (~línea 63):
```typescript
const { name, brand, ..., inStock, discounted, nuevoFiltro, ...pagination } = searchQuery;
```

**Cambio B** — Agregar a `hasFilters` (~línea 89):
```typescript
const hasFilters: boolean = Boolean(
  name || brand || ... || discounted !== undefined || nuevoFiltro !== undefined,
);
```

**Cambio C** — Agregar `queryBuilder.andWhere(...)` después de los filtros existentes:
```typescript
if (nuevoFiltro) {
  queryBuilder.andWhere('/* SQL según la lógica del filtro */');
}
```

### Paso 3 — Controller (`src/modules/products/products.controller.ts`)

Agregar `@ApiQuery` antes de `@ApiResponse`:
```typescript
@ApiQuery({
  name: 'nuevoFiltro',
  required: false,
  type: /* String | Number | Boolean */,
  description: '...',
  example: /* valor */,
})
```

### Paso 4 — Verificar

```bash
npx tsc --noEmit
```

---

## Reglas Importantes

1. **snake_case en SQL raw**: TypeORM convierte `camelCase` a `snake_case` en la DB (`isActive` → `is_active`, `startDate` → `start_date`)
2. **EXISTS en vez de JOIN**: Para filtros en tablas relacionadas, usar `EXISTS (SELECT 1 FROM ...)` evita duplicar filas en el resultado
3. **`hasFilters` gate**: El service tiene 2 caminos — `paginate()` simple (sin filtros) y QueryBuilder (con filtros). Todo filtro nuevo debe agregarse a la condición `hasFilters`
4. **Boolean transform**: Los query params llegan como string. Los booleanos necesitan `@Transform` para convertir `"true"`/`"false"` a `true`/`false`
5. **Parámetros con nombre único**: En el QueryBuilder, usar nombres de parámetro únicos para evitar colisiones (ej: `variant_ram_type`, `variant_ram_value`)
