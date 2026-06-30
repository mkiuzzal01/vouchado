"use client";

import Image from "next/image";
import Link from "next/link";
import promoTag from "@/public/section-headers/Hero Section (7).png";
import Container from "../shared/Container";
import { ArrowRight } from "lucide-react";

interface Props {
  lang: string;
}

export default function PromoExperience({ lang }: Props) {
  return (
    <Container>
      <section className="relative mb-10 min-h-[280px] overflow-hidden rounded-2xl">
        {/* Background */}
        <Image
          src={promoTag}
          alt="Promo Background"
          fill
          priority
          className="absolute inset-0 -z-10 object-cover object-center"
          sizes="100vw"
        />

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-between gap-8 px-6 py-10 sm:px-10 md:px-12 lg:flex-row">
          <div className="space-y-2 text-center lg:text-left xl:ml-[300px]">
            <h2 className="text-2xl font-bold text-white md:text-4xl lg:text-6xl">
              Ready to discover your next experience?
            </h2>

            <p className="text-xl lg:text-2xl font-normal text-white/80">
              Hand-picked deals from the best local businesses
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col items-center gap-4 lg:flex-row">
            <Link href={`/${lang}/nearby`}>
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 font-semibold text-[#0e6a70] transition hover:bg-white/90">
                Explore Deals <ArrowRight />
              </button>
            </Link>

            <Link href={`/${lang}/provider-login`}>
              <button className="rounded-full border border-white px-10 py-4  font-semibold text-white transition hover:bg-white/10">
                Become a Partner
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
