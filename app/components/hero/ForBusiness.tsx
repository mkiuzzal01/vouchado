import React from "react";
import Image from "next/image";
import businessBanner from "@/public/business/Dashboard.jpg";
import Container from "../shared/Container";

export interface CategoryPill {
  label: string;
  iconPath: React.ReactNode;
}

export const CATEGORIES: CategoryPill[] = [
  { label: "Sports", iconPath: <circle cx="12" cy="12" r="10" /> },
  {
    label: "Restaurant",
    iconPath: (
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    ),
  },
  {
    label: "Family & Kids",
    iconPath: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />,
  },
  {
    label: "Spa",
    iconPath: (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    ),
  },
  {
    label: "Creative",
    iconPath: (
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    ),
  },
  {
    label: "Hotel",
    iconPath: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />,
  },
  {
    label: "Salon & Haircare",
    iconPath: (
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    ),
  },
  { label: "Furniture", iconPath: <path d="M4 4h16v12H4V4zm0 16h16" /> },
  {
    label: "Coffee & Tea",
    iconPath: (
      <path d="M18 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M2 8h14v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    ),
  },
  { label: "Pool", iconPath: <path d="M2 12h20M2 16h20" /> },
  { label: "Kitchen Essentials", iconPath: <path d="M6 2v20M18 2v20" /> },
];

export default function ForBusiness() {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#0f545a] via-[#0d595f] to-[#0c4044] pt-20 pb-12 px-4 sm:px-8 overflow-hidden flex flex-col items-center">
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff12_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-75"
        style={{
          maskImage:
            "radial-gradient(circle at top right, white, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle at top right, white, transparent 60%)",
        }}
      />

      <Container>
        <div className="text-center space-y-5 mb-10">
          <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
            Get Discovered. Attract Customers. <br /> Grow Your{" "}
            <span className="bg-gradient-to-r from-[#53f1f8] to-[#2de2ea] bg-clip-text text-transparent">
              Business.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/80 text-base sm:text-lg font-light leading-relaxed tracking-wide">
            Join Vouchado and connect with local customers actively searching{" "}
            for experiences, services, and exclusive offers in your area.
          </p>
        </div>

        {/* 3. CALL TO ACTION BUTTONS */}
        <div className="flex flex-row items-center justify-center gap-4 mb-16 w-full">
          <button className="bg-white text-[#0e6a70] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/10">
            Become a Partner
          </button>

          <button className="border-2 border-white/60 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 active:scale-[0.98] transition-all duration-200">
            Talk to Our Team
          </button>
        </div>

        {/* 4. INTERACTIVE DASHBOARD WRAPPER */}
        <div className="relative w-full max-w-7xl group mx-auto rounded-2xl overflow-hidden bg-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none" />

          <div className="relative w-full h-[250px] md:h-[600px]">
            <Image
              src={businessBanner}
              alt="Vouchado Merchant Performance Analytics Dashboard Preview"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              quality={90}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-[#0c4044]  to-transparent pointer-events-none z-20" />
        </div>

        {/* 5. CATEGORY CAROUSEL FOOTER TRACK */}
        <div className="w-full mt-6 relative z-30 text-center">
          <p className="text-xs text-white/50 font-bold tracking-[0.12em] uppercase mb-6">
            Built for every kind of local business
          </p>

          <div className="w-full  flex items-center justify-start md:justify-center gap-3 pb-4 px-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {CATEGORIES.map((category, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap tracking-wide backdrop-blur-md shadow-inner transition-all duration-200 hover:border-white/25 hover:bg-white/10 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 opacity-75 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {category.iconPath}
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
