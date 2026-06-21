"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo/logo.png";
import { providerNavItems } from "./AsideLinks";
import { Bell } from "lucide-react";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-100 bg-white shadow-sm sticky top-0 z-40 h-[72px]">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center shrink-0">
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

        {/* Center: Navigation Pill (Hidden on Mobile, flex on desktop) */}
        <nav className="hidden md:flex items-center bg-gray-50/80 p-1.5 rounded-full border border-gray-100">
          {providerNavItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${lang}${item.href}`;
            const isActive =
              pathname === fullHref || pathname.startsWith(fullHref + "/");

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-teal-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Profile Widget & Notifications */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="p-2.5 text-gray-400 hover:text-gray-600 bg-white border border-gray-100 rounded-full hover:shadow-sm transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-100 rounded-full pl-1.5 pr-4 py-1.5 hover:shadow-sm transition-all cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
            />
            <span className="text-xs font-bold text-gray-800 tracking-tight">
              $5,300
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dock (Bottom bar for smaller viewports) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white px-4 py-2 flex justify-around items-center z-50 shadow-lg">
        {providerNavItems.map((item) => {
          const Icon = item.icon;
          const fullHref = `/${lang}${item.href}`;
          const isActive = pathname === fullHref;

          return (
            <Link
              key={item.href}
              href={fullHref}
              className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
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
