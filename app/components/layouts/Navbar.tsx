"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import MegaMenu from "./MegaMenu";
import Container from "../shared/Container";
import branding_logo from "@/public/logo/logo.png";
import cart_icon from "@/public/cart/add to cart.png";
import { useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <header className="sticky top-0 z-[999] w-full border-b bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={branding_logo}
              alt="Brand Logo"
              width={120}
              height={40}
              priority
              className="h-9 w-auto object-contain md:h-10"
            />
          </Link>

          {/* Desktop Menu */}
          <MegaMenu showNavbar={showNavbar} setShowNavbar={setShowNavbar} />

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <Image
                src={cart_icon}
                alt="Cart Icon"
                width={22}
                height={22}
                className="h-5 w-5 object-contain"
              />
            </Link>

            {/* Auth */}
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-gray-100 p-1">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#2EC4C6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
              >
                Register
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setShowNavbar(!showNavbar)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition md:hidden"
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
