import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeRoleFromJwt(token: string | undefined): string | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const decoded = JSON.parse(atob(padded)) as { role?: string };
    return decoded.role ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const backendToken = request.cookies.get("access_token")?.value;
  const frontendToken = request.cookies.get("token")?.value;
  const roleCookie = request.cookies.get("frontend_user_role")?.value;

  const isAuthenticated = Boolean(backendToken || frontendToken || roleCookie);
  const role =
    roleCookie ||
    decodeRoleFromJwt(frontendToken) ||
    decodeRoleFromJwt(backendToken);

  const isAuthRoute =
    pathname.startsWith("/auth/singin") ||
    pathname.startsWith("/auth/singup") ||
    pathname.startsWith("/auth/singin") ||
    pathname.startsWith("/auth/singup");

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const needsAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cart/checkout") ||
    pathname.startsWith("/cart/review-payment");

  if (needsAuth && !isAuthenticated) {
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/cart/checkout",
    "/cart/review-payment",
    "/auth/signin",
    "/auth/signup",
    "/auth/singin",
    "/auth/singup",
  ],
};
