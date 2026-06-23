"use client";
import Image from "next/image";
import promoTag from "@/public/howToWork/PromoTag.png";
import Container from "../shared/Container";
import Link from "next/link";

interface props {
  lang: string;
}

export default function PromoExperience({ lang }: props) {
  return (
    <Container>
      <div className="relative w-full bg-[#0e6a70] rounded-2xl overflow-hidden p-8 sm:p-10 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm mb-10">
        {/* Left Side: Graphic Asset & Copywriting */}
        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 text-center sm:text-left w-full lg:w-auto">
          {/* Discount Tag 3D Graphic */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 select-none pointer-events-none">
            <Image
              src={promoTag}
              alt="Promo discount tag illustration"
              fill
              quality={100}
              className="object-contain"
            />
          </div>

          {/* Core Banner Headings */}
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-bold text-white leading-tight tracking-tight">
              Ready to discover your next experience?
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-medium tracking-wide">
              Hand-picked deals from the best local businesses
            </p>
          </div>
        </div>

        {/* Right Side: Call To Action Button Group */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 shrink-0 w-full lg:w-auto">
          {/* Primary Action Button */}
          <Link href={`/${lang}/nearby`}>
            <button className="bg-white text-[#0e6a70] font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 shadow-sm">
              <span>Explore Deals</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </Link>

          {/* Secondary Outline Action Button */}
          <Link href={`/${lang}/provider`}>
            <button className="border border-white/80 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all duration-200">
              Become a Partner
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
