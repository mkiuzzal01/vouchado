import Image from "next/image";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import branding_logo from "@/public/logo/logo.png";
import Container from "../shared/Container";
import cart_icon from "@/public/cart/add to cart.png";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <Container>
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={branding_logo}
              alt="Brand Logo"
              width={120}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <MegaMenu />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center bg-gray-100 p-1.5 rounded-full overflow-hidden",
              )}
            >
              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center justify-center px-3"
              >
                <Image
                  src={cart_icon}
                  alt="Cart Icon"
                  width={28}
                  height={28}
                  className="h-9 w-auto object-contain"
                />
              </Link>

              {/* Login */}
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium text-gray-700",
                  "hover:bg-gray-200 transition",
                )}
              >
                Log in
              </Link>

              {/* Register */}
              <Link
                href="/signup"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium text-white bg-[#2EC4C6]",
                  "hover:opacity-90 transition",
                )}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
