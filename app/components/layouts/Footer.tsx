"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import footer_logo from "@/public/logo/logo_for_footer.png";
import Container from "../shared/Container";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const socialIcons = [FaFacebook, FaTwitter, FaInstagram, FaLinkedin];

  const links = {
    shopping: ["Wishlist", "Category", "Offers", "FAQ", "Contact Us"],
    customer: ["Privacy Policy", "Terms & Condition"],
  };

  const features = [
    {
      title: "Discover Local Deals",
      desc: "Find the best offers near you in real-time.",
    },
    {
      title: "Save More Every Time",
      desc: "Exclusive discounts on every purchase.",
    },
    {
      title: "Flexible Payment",
      desc: "Choose your most convenient option.",
    },
    {
      title: "Support Online",
      desc: "24 hours a day, 7 days a week.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setEmail("");
    setIsLoading(false);
  };

  return (
    <footer className="bg-[#161C24] text-white">
      <Container>
        <div className="py-14 space-y-14">
          {/* ================= TOP GRID ================= */}
          <div className="grid gap-12 md:grid-cols-3">
            {/* LOGO + ABOUT */}
            <div className="space-y-5">
              <Link href="/" className="inline-block">
                <Image
                  src={footer_logo}
                  alt="Footer Logo"
                  width={200}
                  height={200}
                  className="h-24 w-auto object-contain"
                />
              </Link>

              {/* SOCIAL */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase text-gray-300">
                  Follow Us
                </h3>

                <div className="flex items-center gap-3">
                  {socialIcons.map((Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-full",
                        "border border-gray-700 text-gray-300",
                        "transition hover:bg-white hover:text-black",
                      )}
                    >
                      <Icon size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* LINKS */}
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Shopping
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {links.shopping.map((item) => (
                    <li key={item}>
                      <Link className="hover:text-white transition" href="#">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Customer Services
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {links.customer.map((item) => (
                    <li key={item}>
                      <Link className="hover:text-white transition" href="#">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="space-y-5">
              <p className="text-sm text-gray-400 leading-relaxed">
                Subscribe to our newsletter & get exclusive 10% off your first
                order.
              </p>

              <form
                onSubmit={handleSubmit}
                className={cn(
                  "flex items-center w-full rounded-full overflow-hidden",
                  "border-none bg-white/5",
                )}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className={cn(
                    "h-11 border-0 bg-transparent text-white placeholder:text-gray-400",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn("h-11 rounded-none rounded-r-full px-6")}
                >
                  {isLoading ? "..." : "Subscribe"}
                </Button>
              </form>

              {/* APP BUTTONS */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10"
                />
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* ================= FEATURES ================= */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className={cn(
                  "rounded-xl border border-gray-800 bg-[#1C232D] p-5",
                  "hover:border-gray-600 transition",
                )}
              >
                <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} 2026 All Rights Reserved | HTML Site
              by
              <Link href="#">
                <span className="text-white"> VUCHADO</span>
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
