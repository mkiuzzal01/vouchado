"use client";

import React from "react";
import Image from "next/image";
import businessBanner from "@/public/business/Dashboard.jpg";
import Container from "../shared/Container";

interface CategoryPill {
  label: string;
  icon: React.ReactNode;
}

export default function ForBusiness() {
  // Category array for the bottom section
  const categories: CategoryPill[] = [
    { label: "Sports", icon: <circle cx="12" cy="12" r="10" /> },
    {
      label: "Restaurant",
      icon: (
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      ),
    },
    {
      label: "Family & Kids",
      icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />,
    },
    {
      label: "Spa",
      icon: (
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      ),
    },
    {
      label: "Creative",
      icon: (
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      ),
    },
    {
      label: "Hotel",
      icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />,
    },
    {
      label: "Salon & Haircare",
      icon: (
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      ),
    },
    { label: "Furniture", icon: <path d="M4 4h16v12H4V4zm0 16h16" /> },
    {
      label: "Coffee & Tea",
      icon: (
        <path d="M18 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M2 8h14v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      ),
    },
    { label: "Pool", icon: <path d="M2 12h20M2 16h20" /> },
    { label: "Kitchen Essentials", icon: <path d="M6 2v20M18 2v20" /> },
  ];

  return (
    <div className="relative w-full bg-gradient-to-b from-[#0b565c] via-[#0e6a70] to-[#125358]  pt-16 pb-8 px-6 sm:px-12 md:px-16 overflow-hidden flex flex-col items-center shadow-lg">
      <Container>
        {/* Subtle Decorative Dot Overlay Canvas (Top Right/Left Background feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none mix-blend-overlay" />

        {/* --- SECTION TEXT HEADERS --- */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white leading-[1.15] tracking-tight">
            Get Discovered. Attract Customers. <br />
            <span className="text-[#2de2ea]">Grow Your Business.</span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Join Vouchado and connect with local customers actively searching
            for experiences, services, and exclusive offers in your area.
          </p>
        </div>

        {/* --- CALL TO ACTION BUTTON INTERFACE --- */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-14">
          <button className="bg-white text-[#0e6a70] font-bold text-sm px-7 py-3.5 rounded-full hover:bg-white/95 active:scale-[0.98] transition-all duration-200 shadow-md">
            Become a Partner
          </button>

          <button className="border-2 border-white/70 text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all duration-200">
            Talk to Our Team
          </button>
        </div>

        {/* --- INTERACTIVE DASHBOARD GRAPHIC DISPLAY CANVAS --- */}
        <div className="flex justify-center items-center">
          <div className="relative w-full h-[600px] overflow-hidden rounded-xl">
            <Image
              src={businessBanner}
              alt="Vouchado Merchant Performance Analytics Dashboard Preview"
              fill
              quality={100}
              priority
              className="object-cover object-top"
            />
          </div>
          {/* Edge fade effect into the category track at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#125358] via-[#125358]/60 to-transparent pointer-events-none" />
        </div>

        {/* --- CATEGORY CAROUSEL FOOTER TRACK --- */}
        <div className="w-full mt-10 relative z-10 text-center">
          <p className="text-xs sm:text-sm text-white/60 font-semibold tracking-wider uppercase mb-5">
            Built for every kind of local business
          </p>

          {/* Horizontally scrollable capsule track safely optimized for mobile touch */}
          <div className="w-full overflow-x-auto no-scrollbar flex items-center justify-start lg:justify-center gap-3 pb-3 px-2">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/90 text-xs font-bold whitespace-nowrap tracking-wide backdrop-blur-md shadow-sm hover:border-white/30 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 opacity-80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {category.icon}
                </svg>
                <span>{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
