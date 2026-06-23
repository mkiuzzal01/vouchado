import React from "react";
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
            Launch Deals in{" "}
            <span className="bg-gradient-to-r from-[#53f1f8] to-[#2de2ea] bg-clip-text text-transparent">
              Minutes <br /> AND GROW YOUR BUSINESS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/80 text-base sm:text-lg font-light leading-relaxed tracking-wide">
            A Simple, guided flow from setup to redemption. No technical skill
            required.
          </p>
        </div>
      </Container>
    </div>
  );
}
