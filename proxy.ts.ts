import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "du"];

const privateRoutes = ["/provider", "/user"];

function getLocale(pathname: string) {
  return locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function isPrivateRoute(pathname: string) {
  return privateRoutes.some((route) => pathname.startsWith(route));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  // 1. Ignore Next.js internals
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Handle locale (EN / NL)
  const hasLocale = getLocale(pathname);

  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
  }

  // 3. Protect private routes
  if (isPrivateRoute(pathname) && !token) {
    return NextResponse.redirect(new URL(`/${hasLocale}/auth/login`, req.url));
  }

  // 4. Prevent logged-in users from going to auth pages
  if (pathname.includes("/auth") && token) {
    return NextResponse.redirect(new URL(`/${hasLocale}/dashboard`, req.url));
  }

  return NextResponse.next();
}
