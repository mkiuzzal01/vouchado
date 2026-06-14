import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "de"];
const DEFAULT_LOCALE = "en";
const AUTH_COOKIE = "token";

const privateRoutes = ["/user", "/provider"];

function getLocale(pathname: string) {
  return locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function removeLocale(pathname: string) {
  const locale = getLocale(pathname);

  if (!locale) return pathname;

  const path = pathname.replace(`/${locale}`, "");
  return path || "/";
}

function isPrivateRoute(pathname: string) {
  const cleanPath = removeLocale(pathname);

  return privateRoutes.some(
    (route) => cleanPath === route || cleanPath.startsWith(route + "/"),
  );
}

function isAuthRoute(pathname: string) {
  return removeLocale(pathname).startsWith("/auth");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  // Ignore Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect root to default locale
  // / -> /en
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url));
  }

  // Add locale automatically if missing
  // /about -> /en/about
  // /user/profile -> /en/user/profile
  const locale = getLocale(pathname);

  if (!locale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url),
    );
  }

  // Protect private routes
  if (isPrivateRoute(pathname) && !token) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }

  // Prevent logged-in users from visiting auth pages
  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
