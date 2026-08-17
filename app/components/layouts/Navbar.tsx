"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import MegaMenu from "./MegaMenu";
import Container from "../shared/Container";
import branding_logo from "@/public/logo/logo.svg";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import Chat from "../icons/Chat";
import { usePathname } from "next/navigation";
import Cart from "../icons/Cart";
import WishList from "../icons/WishList";
import Voucher from "../icons/Voucher";
import { useAppSelector } from "@/redux/hooks/globalhooks";

import { useUnreadMessageCount } from "@/redux/hooks/useUnreadMessageCount";
import ToggleLang from "./ToggleLang";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  systemInfo: any;
  t: Awaited<ReturnType<typeof getDictionary>>;
  lang: string;
  navLinks: any;
  services: any;
  user_info: any;
  provider_info: any;
}

export default function Navbar({
  systemInfo,
  t,
  lang,
  navLinks,
  services,
  user_info,
  provider_info,
}: Props) {
  const [showNavbar, setShowNavbar] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const path = usePathname();
  const unreadCount = useUnreadMessageCount();
  const { items } = useAppSelector((state) => state.cart);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#ffff]">
      <Container>
        <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3 lg:py-3.5 2xl:py-4">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            {systemInfo?.data?.logo_full_url ? (
              <Image
                src={systemInfo?.data?.logo_full_url}
                alt="Brand Logo"
                width={270}
                height={62}
                priority
                className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18 w-auto object-contain"
              />
            ) : (
              <Image
                src={branding_logo}
                alt="Brand Logo"
                width={270}
                height={62}
                priority
                className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18 w-auto object-contain"
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <MegaMenu
            t={t}
            lang={lang}
            navLinks={navLinks}
            services={services}
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
          />

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-1 2xl:gap-3 ">
            <ToggleLang />
            {/* Chat */}
            <div className="bg-gray-50 rounded-full relative">
              <Link
                href={`/${lang}/chat`}
                className={`flex h-8 w-8 lg:w-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full hover:bg-gray-200 transition ${path.includes("/chat") && "bg-[#2EC4C6]"}`}
              >
                <Chat
                  color={path.includes("/chat") ? "white" : "#292D32"}
                  className="size-5 lg:size-6 xl:size-4 2xl:size-5"
                />
              </Link>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-white animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>

            {/* Auth */}
            <div className="flex items-center gap-2  rounded-full lg:bg-[#F4F6F8] lg:border lg:p-1 xl:p-0.5 2xl:p-1">
              {(() => {
                const wishlistCount = user_info?.data?.wishlist_count || 0;
                const isWishlistActive = path.includes("/wishlist");

                return (
                  <div className="relative inline-flex bg-white rounded-full">
                    <Link
                      href={`/${lang}/wishlist`}
                      className={`flex h-8 w-8 lg:h-10 lg:w-10 xl:h-10 xl:w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
                        isWishlistActive
                          ? "bg-[#2EC4C6] hover:bg-[#28b2b4]"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <WishList
                        color={isWishlistActive ? "white" : "#292D32"}
                        className="size-5 lg:size-6 xl:size-4 2xl:size-6"
                      />
                    </Link>

                    {/* Notification Badge */}
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-white animate-pulse pointer-events-none">
                        {wishlistCount > 99 ? "99+" : wishlistCount}
                      </span>
                    )}
                  </div>
                );
              })()}
              <div className="bg-white rounded-full">
                {user?.email && (
                  <Link
                    href={`/${lang}/vouchers`}
                    className={`flex h-8 w-8 lg:w-10 xl:h-10 xl:w-10 items-center justify-center rounded-full hover:bg-gray-200 transition ${path.includes("/vouchers") && "bg-[#2EC4C6]"}`}
                  >
                    <Voucher
                      color={path.includes("/vouchers") ? "white" : "#292D32"}
                    />
                  </Link>
                )}
              </div>
              <div className="relative inline-flex bg-white rounded-full">
                <Link
                  href={`/${lang}/cart`}
                  className={`flex h-8 w-8 lg:h-10 lg:w-10 xl:h-10 xl:w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
                    path.includes("/cart")
                      ? "bg-[#2EC4C6] hover:bg-[#28b2b4]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Cart
                    color={path.includes("/cart") ? "white" : "#292D32"}
                    className="size-5 lg:size-6 xl:size-4 2xl:size-6"
                  />
                </Link>

                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-white animate-pulse pointer-events-none">
                    {items.length}
                  </span>
                )}
              </div>

              {user ? (
                <UserDropdown
                  t={t}
                  lang={lang}
                  userInfo={user_info}
                  ProviderInfo={provider_info}
                />
              ) : (
                <div className="hidden sm:flex items-center gap-2 xl:gap-1 2xl:gap-2">
                  <Link
                    href={`/${lang}/login`}
                    className="rounded-full border border-gray-300 px-4 py-2 xl:px-2 xl:py-1 2xl:px-4 2xl:py-2 text-sm xl:text-xs 2xl:text-base font-medium 2xl:font-semibold text-gray-700 hover:bg-gray-200 transition"
                  >
                    {t?.auth?.login?.login}
                  </Link>
                  <Link
                    href={`/${lang}/registration`}
                    className="rounded-full bg-[#2EC4C6] px-4 py-2 xl:px-2 xl:py-1 2xl:px-4 2xl:py-2 text-sm xl:text-xs 2xl:text-base font-medium 2xl:font-semibold text-white hover:opacity-90 transition"
                  >
                    {t?.auth?.register?.register}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setShowNavbar(!showNavbar)}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
