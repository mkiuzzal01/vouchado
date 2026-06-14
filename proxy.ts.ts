import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "du"];
const DEFAULT_LOCALE = "en";
const AUTH_COOKIE = "token";

const privateRoutes = ["/user", "/provider"];

function getLocale(pathname: string) {
  return (
    locales.find(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    ) || null
  );
}

function removeLocale(pathname: string) {
  const locale = getLocale(pathname);
  if (!locale) return pathname;
  return pathname.replace(`/${locale}`, "") || "/";
}

/**
 * ✅ Supports nested routes
 * /user → protected
 * /user/profile → protected
 * /user/profile/settings → protected
 */
function isPrivateRoute(pathname: string) {
  const cleanPath = removeLocale(pathname);

  return privateRoutes.some(
    (route) => cleanPath === route || cleanPath.startsWith(route + "/"),
  );
}

function isAuthRoute(pathname: string) {
  const cleanPath = removeLocale(pathname);
  return cleanPath.startsWith("/auth");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  /**
   * 1. Ignore system files
   */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  /**
   * 2. Root → redirect to default locale
   * / → /en
   */
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url));
  }

  /**
   * 3. Ensure locale exists
   * /user → /en/user
   */
  const locale = getLocale(pathname);

  if (!locale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url),
    );
  }

  /**
   * 4. Protect private routes (supports nested)
   */
  if (isPrivateRoute(pathname) && !token) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }

  /**
   * 5. Block auth pages if already logged in
   */
  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
