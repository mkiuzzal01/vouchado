"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import promo from "@/public/hero/promo_banner.png";

interface Props {
  lang: string;
}

export default function PromoBanner({ lang }: Props) {
  const ctaText = "Partner With us";
  const imageUrl =
    promo ||
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80";

  const stats = [
    { value: "300+", label: "Partner Businesses" },
    { value: "50k+", label: "Active Customers" },
    { value: "2M+", label: "Deals Redeemed" },
  ];

  return (
    <Container className="py-6">
      {/* Main Container Layer */}
      <section className="w-full overflow-hidden rounded-[24px] bg-[#0c4d52] text-white shadow-xl border border-teal-950/20">
        <div className="relative flex flex-col md:flex-row min-h-[372px]">
          {/* LEFT CONTENT BLOCK */}
          <div className="relative z-20 w-full md:w-[48%] p-8 sm:p-10 lg:p-14 flex flex-col justify-center text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px]  tracking-tight leading-[1.15]">
              Grow Your Business <br /> With VOUCHADO
            </h2>

            <p className="mt-4 text-xs sm:text-sm  max-w-sm leading-relaxed">
              Join 300+ local businesses and reach <br /> thousands of new
              customers
            </p>

            <div className="mt-8">
              <Link href={`/${lang}/provider-login`}>
                <button
                  type="button"
                  className="w-full sm:w-fit bg-white text-[#0c4d52] text-xs font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  {ctaText}
                </button>
              </Link>
            </div>
          </div>
          {/* Removed negative margin adjustments on mobile to prevent distortion */}
          <div className="relative w-full md:w-[57%] h-[372px] sm:h-[320px] md:h-auto md:-ml-[5%] overflow-hidden">
            {/* The Shape Mask - Straight on mobile, Slanted only on desktop */}
            <div className="absolute inset-0 z-10 w-full h-full md:[clip-path:polygon(12%_0%,_100%_0%,_100%_100%,_0%_100%)]">
              {/* Image Asset Rendering Layer */}
              <Image
                src={imageUrl}
                alt="Grow your business"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Dark Premium Ambient Overlay Layer */}
              <div className="absolute inset-0 bg-linear-gradient-to-t md:bg-linear-gradient-to-r from-black/40 via-black/10 to-transparent z-10" />
            </div>

            {/* FLOATING GLASSMORPHIC BADGES PANEL */}
            <div className="absolute inset-x-0 bottom-12  md:bottom-35 md:right-10 md:left-auto z-20 flex justify-center md:justify-end gap-2.5 sm:gap-3 px-4 md:px-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#072426]/50 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center flex-1 sm:flex-none min-w-[95px] sm:min-w-[130px] h-[85px] sm:h-[95px] flex flex-col justify-center items-center shadow-2xl transition-transform hover:scale-[1.02]"
                >
                  <div className="text-lg sm:text-2xl font-black tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[11px] text-teal-100/70 font-medium mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
