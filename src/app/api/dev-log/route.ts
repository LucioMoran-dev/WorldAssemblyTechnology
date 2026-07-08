import { NextResponse } from "next/server";

/**
 * Endpoint interno SOLO para desarrollo.
 *
 * Recibe los errores del cliente (interceptor de axios) y los imprime por el
 * terminal donde corre `pnpm dev` (stdout del server), para que el dev vea el
 * error exacto sin tener que abrir la consola del navegador.
 *
 * En producción es no-op: no loguea nada.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const { route, status, message, detail } = await request.json();
    // Sale por el terminal de `pnpm dev`
    console.error(
      `\n❌ [API] ${route ?? "?"}${status ? ` → ${status}` : ""}${
        message ? ` | ${message}` : ""
      }`,
      detail ?? ""
    );
  } catch {
    // body inválido: lo ignoramos, es solo logging de dev
  }

  return new NextResponse(null, { status: 204 });
}
