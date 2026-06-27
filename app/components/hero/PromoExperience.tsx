"use client";

import Image from "next/image";
import Link from "next/link";
import promoTag from "@/public/section-headers/Hero Section (7).png";
import Container from "../shared/Container";

interface Props {
  lang: string;
}

export default function PromoExperience({ lang }: Props) {
  return (
    <Container>
      <section className="relative mb-10 overflow-hidden rounded-2xl">
        {/* Background Image */}
        <Image
          src={promoTag}
          alt="Promo Background"
          fill
          priority
          className="-z-10 object-cover object-center"
          sizes="(max-width: 768px) 100vw, 1200px"
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[220px] flex-col items-center justify-between gap-8 px-6 py-10 sm:px-10 md:px-12 lg:min-h-[280px] lg:flex-row">
          {/* Left Side */}
          <div className="max-w-xl xl:ml-[363px] text-center lg:text-left">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Ready to discover your next experience?
            </h2>

            <p className="mt-3 text-sm font-medium text-white/80 sm:text-base">
              Hand-picked deals from the best local businesses
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/nearby`}>
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0e6a70] transition hover:bg-white/90">
                Explore Deals
              </button>
            </Link>

            <Link href={`/${lang}/provider`}>
              <button className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Become a Partner
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
