"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import MegaMenu from "./MegaMenu";
import Container from "../shared/Container";
import branding_logo from "@/public/logo/brand_logo.png";
import { useState } from "react";
import cookie from "js-cookie";
import UserDropdown from "./UserDropdown";
import Chat from "../icons/Chat";
import { usePathname } from "next/navigation";
import Cart from "../icons/Cart";
import WishList from "../icons/WishList";
import Voucher from "../icons/Voucher";

interface Props {
  lang: string;
  login: string;
  register: string;
  menu: string;
  navLinks: any;
  services: any;
  menuTitle: string;
  profileInfo: any;
}

export default function Navbar({
  lang,
  login,
  register,
  menu,
  navLinks,
  services,
  menuTitle,
  profileInfo,
}: Props) {
  const [showNavbar, setShowNavbar] = useState(false);
  const token = cookie.get("vuchado_token");
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#ffff]">
      <Container>
        <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3 lg:py-3.5 2xl:py-4">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <Image
              src={branding_logo}
              alt="Brand Logo"
              width={270}
              height={62}
              priority
              className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <MegaMenu
            lang={lang}
            login={login}
            register={register}
            menu={menu}
            menuTitle={menuTitle}
            navLinks={navLinks}
            services={services}
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
          />

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-1 2xl:gap-3 ">
            {/* Cart */}
            <div className="bg-gray-50 rounded-full">
              <Link
                href={`/${lang}/chat`}
                className={`flex h-8 w-8 lg:w-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full  hover:bg-gray-200 transition ${path.includes("/chat") && "bg-[#2EC4C6]"}`}
              >
                <Chat
                  color={path.includes("/chat") ? "white" : "#292D32"}
                  className="size-5 lg:size-6 xl:size-4 2xl:size-6"
                />
              </Link>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-2 xl:gap-1 2xl:gap-2 rounded-full lg:bg-[#F4F6F8] lg:border lg:p-1 xl:p-0.5 2xl:p-1">
              <div className="bg-white rounded-full">
                <Link
                  href={`/${lang}/wishlist`}
                  className={`flex h-8 w-8 lg:w-10 xl:h-10 xl:w-10  items-center justify-center rounded-full  hover:bg-gray-200 transition ${path.includes("/wishlist") && "bg-[#2EC4C6]"}`}
                >
                  <WishList
                    color={path.includes("/wishlist") ? "white" : "#292D32"}
                    className="size-5 lg:size-6 xl:size-4 2xl:size-6"
                  />
                </Link>
              </div>
              <div className="bg-white rounded-full">
                <Link
                  href={`/${lang}/coupons`}
                  className={`flex h-8 w-8 lg:w-10 xl:h-10 xl:w-10 items-center justify-center rounded-full hover:bg-gray-200 transition ${path.includes("/coupons") && "bg-[#2EC4C6]"}`}
                >
                  <Voucher
                    color={path.includes("/coupons") ? "white" : "#292D32"}
                  />
                </Link>
              </div>
              <div className="bg-white rounded-full">
                <Link
                  href={`/${lang}/cart`}
                  className={`flex h-8 w-8 lg:w-10 xl:h-10 xl:w-10  items-center justify-center rounded-full hover:bg-gray-200 transition ${path.includes("/cart") && "bg-[#2EC4C6]"}`}
                >
                  <Cart
                    color={path.includes("/cart") ? "white" : "#292D32"}
                    className="size-5 lg:size-6 xl:size-4 2xl:size-6"
                  />
                </Link>
              </div>

              {token ? (
                <UserDropdown
                  balance={profileInfo?.data?.balance}
                  lang={lang}
                />
              ) : (
                <div className="hidden sm:flex items-center gap-2 xl:gap-1 2xl:gap-2">
                  <Link
                    href={`/${lang}/login`}
                    className="rounded-full border border-gray-300 px-4 py-2 xl:px-2 xl:py-1 2xl:px-4 2xl:py-2 text-sm xl:text-xs 2xl:text-base font-medium 2xl:font-semibold text-gray-700 hover:bg-gray-200 transition"
                  >
                    {login}
                  </Link>
                  <Link
                    href={`/${lang}/registration`}
                    className="rounded-full bg-[#2EC4C6] px-4 py-2 xl:px-2 xl:py-1 2xl:px-4 2xl:py-2 text-sm xl:text-xs 2xl:text-base font-medium 2xl:font-semibold text-white hover:opacity-90 transition"
                  >
                    {register}
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
