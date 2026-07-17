import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "de"] as const;
const DEFAULT_LOCALE = "en";
const AUTH_COOKIE = "vuchado_token";

const PRIVATE_ROUTES = ["/user", "/provider", "/wishlist", "/chat"];

/**
 * Returns the locale from the pathname, if present.
 */
function getLocale(pathname: string): string | undefined {
  return LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/**
 * Removes the locale prefix from the pathname.
 * Example: "/en/chat" -> "/chat"
 */
function removeLocale(pathname: string): string {
  const locale = getLocale(pathname);

  if (!locale) {
    return pathname;
  }

  const path = pathname.replace(`/${locale}`, "");
  return path || "/";
}

/**
 * Determines whether the requested route requires authentication.
 */
function isPrivateRoute(pathname: string): boolean {
  const path = removeLocale(pathname);

  return PRIVATE_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  // Skip Next.js assets, API routes, and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const locale = getLocale(pathname);

  // Redirect the root path to the default locale.
  if (pathname === "/") {
    const url = nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // Redirect paths without a locale while preserving query parameters.
  if (!locale) {
    const url = nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Protect private routes.
  if (isPrivateRoute(pathname) && !token) {
    const url = nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // Allow authenticated users to access auth pages.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
