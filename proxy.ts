import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "de"] as const;
const DEFAULT_LOCALE = "en";
const AUTH_COOKIE = "vuchado_token";

const PRIVATE_ROUTES = ["/user", "/provider", "/wishlist", "/chat"];

function getLocale(pathname: string): string | undefined {
  return LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function removeLocale(pathname: string): string {
  const locale = getLocale(pathname);

  if (!locale) {
    return pathname;
  }

  const pathWithoutLocale = pathname.replace(`/${locale}`, "");
  return pathWithoutLocale || "/";
}

function isPrivateRoute(pathname: string): boolean {
  const cleanPath = removeLocale(pathname);

  return PRIVATE_ROUTES.some(
    (route) => cleanPath === route || cleanPath.startsWith(`${route}/`),
  );
}

function isAuthRoute(pathname: string): boolean {
  return removeLocale(pathname).startsWith("/auth");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, API routes, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  // Redirect root → default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  // Add locale if missing
  const locale = getLocale(pathname);

  if (!locale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url),
    );
  }

  // Protect authenticated routes
  if (isPrivateRoute(pathname) && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Prevent authenticated users from visiting auth pages
  if (isAuthRoute(pathname) && token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
