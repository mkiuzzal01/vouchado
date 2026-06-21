"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import logo from "@/public/logo/logo.png";
import { providerNavItems } from "./HeaderLinks";

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
          <Link href={`/${lang}/provider`}>
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
          {/* Notification */}
          <Link href={`/${lang}/provider/settings/notifications`}>
            <button className="relative rounded-full border border-gray-100 bg-white p-2.5 text-gray-400 transition-all hover:text-gray-600 hover:shadow-sm">
              <Bell size={18} />

              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
          </Link>

          {/* User Profile */}
          <div className="flex cursor-pointer items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50/80 py-1.5 pl-1.5 pr-4 transition-all hover:shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
              alt="User Avatar"
              className="h-8 w-8 rounded-full border border-white object-cover shadow-sm"
            />

            <span className="text-xs font-bold tracking-tight text-gray-800">
              $5,300
            </span>
          </div>
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
