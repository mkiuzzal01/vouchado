"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import footer_logo from "@/public/logo/logo_for_footer.png";
import Container from "../shared/Container";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Search from "../icons/Search";
import Money from "../icons/Money";
import Payment from "../icons/Payment";
import SupportOnline from "../icons/SupportOnline";
import AppleStore from "../icons/AppleStore";
import PlayStore from "../icons/PlayStore";
import Facebook from "../icons/Facebook";
import X from "../icons/X";
import Linkedin from "../icons/Linkedin";
import V from "../icons/V";

interface FooterLinks {
  footerLinks: any;
}

export default function Footer({ footerLinks }: FooterLinks) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const socialIcons = [Facebook, X, Linkedin, V];

  const features = [
    {
      icon: <Search />,
      title: "Discover Local Deals",
      desc: "Find the best offers near you in real-time.",
    },
    {
      icon: <Money />,
      title: "Save More Every Time",
      desc: "Exclusive discounts on every purchase.",
    },
    {
      icon: <Payment />,
      title: "Flexible Payment",
      desc: "Choose your most convenient option.",
    },
    {
      icon: <SupportOnline />,
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
      <Container className="">
        <div className="pt-20 space-y-14">
          {/* ================= TOP GRID ================= */}
          <div className="grid gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* LOGO + ABOUT */}
            <div className="space-y-5">
              <Link href="/" className="inline-block">
                <Image
                  src={footer_logo}
                  alt="Footer Logo"
                  width={230}
                  height={230}
                  className="h-28 lg:h-35 xl:h-41 w-auto object-contain"
                />
              </Link>

              {/* SOCIAL */}
              <div className="space-y-2.5">
                <h3 className="text-xs xl:text-base font-normal text-[#DFE3E8]">
                  Follow Us On
                </h3>

                <div className="flex items-center gap-3">
                  {socialIcons.map((Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className={cn(
                        "size-9 flex items-center justify-center rounded-full bg-[#212B36] text-white",
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
            <div className="grid grid-cols-2 gap-5 xl:gap-10">
              <div>
                <h3 className="mb-4 sm:text-lg xl:text-xl font-semibold text-white">
                  Shopping
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {footerLinks?.shopping?.map((item: any) => (
                    <li key={item.href}>
                      <Link
                        className="hover:text-white transition"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 sm:text-lg xl:text-xl font-semibold text-white">
                  Customer Services
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {footerLinks?.customer?.map((item: any) => (
                    <li className="text-sm font-normal" key={item.href}>
                      <Link
                        className="hover:text-white transition"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="space-y-4 xl:col-span-1">
              <p className="text-sm font-normal text-gray-400 leading-relaxed">
                Subscribe to our newsletter & get exclusive
                <br className="block" />
                10% off your first order.
              </p>

              <form
                onSubmit={handleSubmit}
                className={cn(
                  "flex items-center w-full rounded-full p-1 border border-gray-800 bg-[#1A222C]",
                )}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className={cn(
                    "h-11 border-0 bg-transparent px-4 text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 flex-1",
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "h-11 cursor-pointer bg-linear-to-r from-[#4cd3e3] to-[#25a5b5] text-white rounded-full px-4 sm:px-8 font-semibold tracking-wider uppercase text-xs hover:opacity-90 transition-opacity",
                  )}
                >
                  {isLoading ? "..." : "SUBSCRIBE"}
                </Button>
              </form>

              {/* APP BUTTONS */}
              <div className="flex justify-start xl:justify-end items-center gap-5 pt-8">
                <PlayStore size={145} />
                <AppleStore size={145} />
              </div>
            </div>
          </div>

          {/* ================= FEATURES ================= */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className={cn(
                  "rounded-xl border border-gray-800 bg-[#1C232D] p-4",
                  "hover:border-gray-600 transition",
                )}
              >
                <div className="flex items-center gap-3">
                  <div>{item.icon}</div>
                  <div className="font-normal">
                    <h4 className="text-xl mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="border-t border-gray-800 py-4 sm:py-6 xl:py-8">
            <p className="text-base font-semibold text-[#919EAB] text-center">
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
