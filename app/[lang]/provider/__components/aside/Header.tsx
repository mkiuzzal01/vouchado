"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/public/logo/brand_logo.png";
import { providerNavItems } from "./HeaderLinks";
import UserDropdown from "@/app/components/layouts/UserDropdown";
import { Bell } from "lucide-react";
import Container from "@/app/components/shared/Container";
import { NotificationBell } from "./NotificationBell";

import { useUnreadMessageCount } from "@/redux/hooks/useUnreadMessageCount";

interface HeaderProps {
  lang: string;
  profileInfo: any;
  notifications: any[];
}

export default function Header({
  lang,
  profileInfo,
  notifications,
}: HeaderProps) {
  const pathname = usePathname();
  const unreadCount = useUnreadMessageCount();

  const isActiveRoute = (href: string) => {
    const fullHref = `/${lang}${href}`;

    if (href === "/provider") {
      return pathname === fullHref;
    }
    return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
  };

  return (
    <Container>
      <header className="py-10 w-full">
        <div className="mx-auto flex h-full w-full items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="shrink-0">
            <Link href={`/${lang}`}>
              <Image
                src={logo}
                alt="Vouchado Logo"
                width={145}
                height={42}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Matched precisely with image_71d0dd.png */}
          <nav className="hidden items-center rounded-full border border-gray-100/70 bg-gray-100 p-1 lg:flex gap-1">
            {providerNavItems.map((item) => {
              const Icon = item.icon;
              const fullHref = `/${lang}${item.href}`;
              const isActive = isActiveRoute(item.href);
              const isMessageItem = item.href.includes("message");

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={`relative flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-linear-to-r from-[#31BFC8] to-[#2DAEB6] text-white font-semibold"
                      : "text-[#637381] hover:text-gray-900 hover:bg-gray-200/50"
                  }`}
                >
                  <Icon color={isActive ? "#FFFFFF" : "#637381"} size={18} />
                  <span>{item.label}</span>
                  {isMessageItem && unreadCount > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <NotificationBell lang={lang} initialNotifications={notifications} />
            <UserDropdown lang={lang} ProviderInfo={profileInfo} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white px-4 py-2 shadow-lg lg:hidden">
          {providerNavItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${lang}${item.href}`;
            const isActive = isActiveRoute(item.href);
            const isMessageItem = item.href.includes("message");

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold transition-colors ${
                  isActive ? "text-[#2bb4c4]" : "text-gray-400"
                }`}
              >
                <div className="relative">
                  <Icon size={20} color={isActive ? "#2bb4c4" : "#637381"} />
                  {isMessageItem && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-1 ring-white">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>
    </Container>
  );
}
