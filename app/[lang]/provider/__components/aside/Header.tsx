"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/public/logo/logo.png";
import { providerNavItems } from "./HeaderLinks";
import UserDropdown from "@/app/components/layouts/UserDropdown";
import { Bell } from "lucide-react";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    const fullHref = `/${lang}${href}`;

    if (href === "/provider") {
      return pathname === fullHref;
    }
    return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
  };

  return (
    <header className="sticky top-0 z-40 h-[72px] w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="shrink-0">
          <Link href={`/${lang}`}>
            <Image
              src={logo}
              alt="Vouchado Logo"
              width={130}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center rounded-full border border-gray-100 bg-gray-50/80 p-1.5 md:flex">
          {providerNavItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${lang}${item.href}`;
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-teal-500 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link href={`/${lang}/provider/settings/notifications`}>
              <button className="relative p-2 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition">
                <Bell />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
              </button>
            </Link>
          </div>
          <UserDropdown lang={lang} totalMoney={2000} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white px-4 py-2 shadow-lg md:hidden">
        {providerNavItems.map((item) => {
          const Icon = item.icon;
          const fullHref = `/${lang}${item.href}`;
          const isActive = isActiveRoute(item.href);

          return (
            <Link
              key={item.href}
              href={fullHref}
              className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold transition-colors ${
                isActive ? "text-teal-500" : "text-gray-400"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
