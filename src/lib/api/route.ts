import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const { route, status, message, detail } = await request.json();
    console.error(
      `\n❌ [API] ${route ?? "?"}${status ? ` → ${status}` : ""}${
        message ? ` | ${message}` : ""
      }`,
      detail ?? ""
    );
  } catch {}

  return new NextResponse(null, { status: 204 });
}
