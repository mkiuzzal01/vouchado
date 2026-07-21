"use client";
import { useEffect, useState } from "react";
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
import co2 from "@/public/hero/image 12.png";
import { useSubscribeMutation } from "@/redux/features/contact/contact.api";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import {
  updateLoyaltyPoint,
  updateVuchadoPoint,
} from "@/redux/features/auth/auth.slice";
import { updateVatPercentage } from "@/redux/features/cart/cart.slice";

interface FooterLinks {
  footerLinks: any;
  socialLinks: any;
  systemInfo: any;
}

export default function Footer({
  footerLinks,
  socialLinks,
  systemInfo,
}: FooterLinks) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribe] = useSubscribeMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (systemInfo?.data?.loyalty_point)
      dispatch(updateLoyaltyPoint(systemInfo?.data?.loyalty_point));
    if (systemInfo?.data?.vuchado_point)
      dispatch(updateVuchadoPoint(systemInfo?.data?.vuchado_point));
    if (systemInfo?.data?.vat_percentage)
      dispatch(updateVatPercentage(systemInfo?.data?.vat_percentage));
    if (systemInfo?.data?.setPointsConversionRate) {
      dispatch(updateVatPercentage(systemInfo?.data?.setPointsConversionRate));
    }
  }, [systemInfo]);

  const socialIcons = [
    { icon: Facebook, link: socialLinks?.data?.facebook_link || "#" },
    { icon: X, link: socialLinks?.data?.twitter_link || "#" },
    { icon: Linkedin, link: socialLinks?.data?.linkedin_link || "#" },
    { icon: V, link: socialLinks?.data?.youtube_link || "#" },
  ];

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
    try {
      const res = await subscribe({ email }).unwrap();

      if (res.data) {
        toast.success(res.message);
        setIsLoading(false);
        setEmail("");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <footer className="bg-[#161C24] text-white">
      <Container>
        <div className="pt-12 md:pt-20">
          {/* ================= TOP GRID ================= */}
          <div className="grid gap-8 xl:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* LOGO + ABOUT */}
            <div className="space-y-5 ml-0 lg:ml-[57px] flex justify-center sm:justify-start">
              <Link href="/" className="inline-block">
                <Image
                  src={footer_logo}
                  alt="Footer Logo"
                  width={230}
                  height={230}
                  className="h-20 sm:h-28 lg:h-35 xl:h-41 w-auto object-contain"
                />
              </Link>
            </div>

            {/* LINKS */}
            <div className="grid grid-cols-2 gap-5 xl:gap-10">
              <div>
                <h3 className="mb-4 text-base sm:text-lg xl:text-xl font-semibold text-white">
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
                <h3 className="mb-4 text-base sm:text-lg xl:text-xl font-semibold text-white">
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
            <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-normal text-gray-400 leading-relaxed">
                Subscribe to our newsletter & get exclusive
                <br className="hidden sm:block" /> 10% off your first order.
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
                    "h-11 border-0 bg-transparent px-4 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-0 text-sm",
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "h-11 cursor-pointer bg-linear-to-r from-[#4cd3e3] to-[#25a5b5] text-white rounded-full px-4 sm:px-8 font-semibold tracking-wider uppercase text-xs hover:opacity-90 transition-opacity shrink-0",
                  )}
                >
                  {isLoading ? "..." : "SUBSCRIBE"}
                </Button>
              </form>
            </div>
          </div>

          <div className="flex items-center py-5 flex-col gap-6 lg:flex-row justify-between">
            <div className="space-y-2.5  lg:ml-[57px] flex flex-col items-center lg:items-start">
              <h3 className="text-xs xl:text-base font-normal text-[#DFE3E8]">
                Follow Us On
              </h3>
              <div className="flex items-center gap-3">
                {socialIcons.map((item, i) => (
                  <Link
                    key={i}
                    target="_blank"
                    href={item.link}
                    className={cn(
                      "size-9 flex items-center justify-center rounded-full bg-[#212B36] text-white hover:bg-[#2BC4CA] transition-colors",
                    )}
                  >
                    <item.icon size={14} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center lg:items-start justify-center lg:justify-end gap-3 sm:gap-4">
              <Link
                href="https://co2offsetit.com/"
                className="cursor-pointer transition-transform hover:scale-105"
                target="_blank"
              >
                <Image
                  src={co2}
                  alt="co2"
                  width={145}
                  height={45}
                  className="w-[120px] sm:w-[145px] h-auto"
                />
              </Link>
              <Link
                href="https://play.google.com"
                className="cursor-pointer transition-transform hover:scale-105"
                target="_blank"
              >
                <PlayStore size={145} />
              </Link>
              <Link
                href="https://www.apple.com/"
                className="cursor-pointer transition-transform hover:scale-105"
                target="_blank"
              >
                <AppleStore size={145} />
              </Link>
            </div>
          </div>

          {/* ================= FEATURES ================= */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className={cn(
                  "rounded-xl border border-gray-800 bg-[#1C232D] p-5",
                  "hover:border-gray-600 transition",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">{item.icon}</div>
                  <div className="font-normal">
                    <h4 className="text-lg font-bold mb-1 text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="border-t border-gray-800 my-8">
            <p className="text-sm sm:text-base font-semibold text-[#919EAB] text-center py-6">
              © {systemInfo?.data?.copyright_text}
              <Link
                href="#"
                className="text-white hover:text-[#2BC4CA] transition"
              >
                VUCHADO
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
