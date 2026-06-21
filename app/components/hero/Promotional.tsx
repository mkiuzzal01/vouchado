"use client";

import React from "react";
import Image from "next/image";
import Container from "../shared/Container";

export interface StatItem {
  value: string;
  label: string;
}

export interface PromoBannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
  stats?: StatItem[];
}

export default function PromoBanner({
  title = "Grow Your Business with VOUCHADO",
  description = "Join 300+ local businesses and reach thousands of new customers",
  ctaText = "Partner With us",
  onCtaClick,
  imageUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  stats = [
    { value: "300+", label: "Partner Businesses" },
    { value: "50k+", label: "Active Customer" },
    { value: "2M+", label: "Deals Redeemed" },
  ],
}: PromoBannerProps) {
  return (
    <Container className="py-6">
      {/* Main Container Layer */}
      <section className="w-full overflow-hidden rounded-[24px] bg-[#0c4d52] text-white shadow-xl">
        <div className="relative flex flex-col md:flex-row min-h-[320px]">
          {/* LEFT CONTENT BLOCK - Accommodates text layout flawlessly */}
          <div className="relative z-20 w-full md:w-[45%] p-8 lg:p-12 xl:p-14 flex flex-col justify-center text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight leading-[1.2]">
              {title}
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-white/80 font-normal max-w-sm leading-relaxed">
              {description}
            </p>

            <button
              type="button"
              onClick={onCtaClick}
              className="mt-6 w-fit bg-white text-[#0c4d52] text-xs font-bold px-7 py-3.5 rounded-full hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
            >
              {ctaText}
            </button>
          </div>

          {/* RIGHT MEDIA WINDOW WITH PRECISE SLANTED SEPARATOR */}
          <div className="relative w-full md:w-[60%] h-[260px] md:h-auto md:-ml-[5%] overflow-hidden">
            {/* The Slanted Shape Container Mask */}
            <div
              className=" absolute inset-0 z-10 w-full h-full object-cover"
              style={{
                clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              {/* Image Asset Rendering Layer */}
              <Image
                src={imageUrl}
                alt="Grow your business"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Dark Ambient Overlay Layer */}
              <div className="absolute inset-0 bg-black/15 z-10" />
            </div>

            {/* FLOATING GLASSMORPHIC BADGES PANEL - Positioned relative to the angle space */}
            <div className="absolute inset-x-0 bottom-6 md:right-8 md:left-auto z-20 flex justify-center md:justify-end gap-3 px-4 md:px-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#112f31]/40 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[110px] sm:min-w-[130px] h-[95px] flex flex-col justify-center items-center shadow-2xl"
                >
                  <div className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/70 font-medium mt-0.5 whitespace-nowrap">
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
