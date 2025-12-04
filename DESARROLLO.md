# Guía de Desarrollo - Solución a Errores de Re-hidratación

## 🔧 Problema Resuelto

Se solucionaron los errores de re-hidratación que ocurrían en desarrollo cuando se hacían cambios al código.

### Causas del Problema
1. ✅ **`optimisticClientCache: true`** - Caché agresivo del cliente
2. ✅ **`reactCompiler: true`** - Compilador experimental inestable
3. ✅ **`generateEtags: true`** - ETags causando caché de navegador
4. ✅ **Headers de caché fuertes** - Políticas de caché en desarrollo
5. ✅ **Texto inconsistente** - Diferencias servidor/cliente en traducciones

---

## 🚀 Cómo Usar en Desarrollo

### Opción 1: Desarrollo Normal (Recomendado)
```bash
npm run dev
```
- Inicia el servidor con Turbopack
- Sin caché agresivo
- Hot reload funcional

### Opción 2: Desarrollo con Limpieza Total
```bash
npm run dev:clean
```
- Limpia `.next`, `out`, `.turbo`
- Inicia servidor desde cero
- **Usa esto si sigues viendo caché viejo**

---

## 📝 Cambios Realizados

### 1. **next.config.ts**
```typescript
// ✅ Configuraciones solo activas en producción
compress: !isDev              // Sin compresión en dev
generateEtags: !isDev         // Sin ETags en dev
optimizeCss: !isDev           // Sin optimización CSS en dev

// ❌ Desactivado permanentemente
reactCompiler: false          // Causa hidratación
optimisticClientCache: false  // Caché agresivo
```

### 2. **Headers en Desarrollo**
```typescript
if (isDev) {
  return [{
    source: "/(.*)",
    headers: [{
      key: "Cache-Control",
      value: "no-store, no-cache, must-revalidate, max-age=0"
    }]
  }];
}
```

### 3. **.env.local** (Nuevo)
```bash
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PRIVATE_STANDALONE_CACHE_ENABLED=false
NEXT_PRIVATE_DEV_OPTIMIZE_CACHE=false
```

### 4. **Traducciones Corregidas**
- ✅ `product-card.tsx`: Texto en español consistente
- ✅ Elimina diferencias servidor/cliente

---

## 🐛 Si Aún Ves Errores

### 1. Limpia la Caché Completamente
```bash
npm run clean
rm -rf node_modules/.cache
npm run dev
```

### 2. Reinicia el Navegador
- Cierra todas las pestañas
- Abre en incógnito
- Limpia caché del navegador (Ctrl+Shift+Delete)

### 3. Verifica que el Server Esté Actualizado
```bash
# Detener servidor (Ctrl+C)
npm run dev:clean
```

### 4. Revisa los Componentes
- ✅ Asegúrate que texto sea igual en servidor y cliente
- ✅ No uses `Date.now()`, `Math.random()` en renderizado
- ✅ Evita `window`, `localStorage` sin `useEffect`

---

## 🎯 Buenas Prácticas en Desarrollo

### ✅ Hacer
- Usar `npm run dev` normalmente
- Si hay problemas: `npm run dev:clean`
- Mantener texto consistente (español)
- Usar `useEffect` para código del navegador

### ❌ Evitar
- Agregar lógica random en renderizado
- Usar APIs del navegador sin verificar
- Mezclar inglés/español en textos
- Cambiar `next.config.ts` sin entender

---

## 📊 Configuración de Producción

Las configuraciones de caché, compresión y optimización **SÍ** se activan en producción:

```bash
npm run build    # Compila con todas las optimizaciones
npm run start    # Servidor de producción optimizado
```

En producción:
- ✅ Caché fuerte activado
- ✅ ETags habilitados
- ✅ CSS optimizado
- ✅ Headers de seguridad completos

---

## 🔍 Verificación

Para confirmar que funciona:

1. **Cambiar un archivo** (ej: cambiar texto en un componente)
2. **Guardar**
3. **Ver el navegador** - debería actualizar SIN error de hidratación
4. **Si no funciona**: `npm run dev:clean`

---

## 📞 Soporte

Si sigues teniendo problemas:
- Verifica que estés usando Node.js >= 18.17.0
- Asegúrate que `.env.local` exista
- Revisa la consola del servidor (terminal)
- Revisa la consola del navegador (F12)
