// src/components/sections/CreateDeal.tsx
import React from "react";
import Container from "@/app/components/shared/Container";

interface DealType {
  id: number;
  title: string;
  iconPath: React.ReactNode;
}

const DEAL_TYPES: DealType[] = [
  {
    id: 1,
    title: "Limited Quantity Offers",
    iconPath: <path d="M21 8H3M21 16H3M10 4v16M14 4v16" />, // Custom Box/Grid representation
  },
  {
    id: 2,
    title: "Last-Minute Promotions",
    iconPath: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />, // Lightning bolt
  },
  {
    id: 3,
    title: "Seasonal Campaigns",
    iconPath: (
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    ), // Sun icon
  },
  {
    id: 4,
    title: "Weekday Specials",
    iconPath: (
      <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" />
    ), // Calendar icon
  },
  {
    id: 5,
    title: "Time-Based Deals",
    iconPath: <path d="" />,
  },
  {
    id: 6,
    title: "Family & Kids Offers",
    iconPath: (
      <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM8 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 17a4 4 0 003.5-2h-7A4 4 0 0012 17z" />
    ), // Smiley icon
  },
  {
    id: 7,
    title: "Event-Based Promotions",
    iconPath: (
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22V14" />
    ), // Flag/Celebration icon
  },
  {
    id: 8,
    title: "Universal Business Vouchers",
    iconPath: (
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    ), // Box icon
  },
  {
    id: 9,
    title: "Opening Specials",
    iconPath: <path d="M20 12V8H4v4M22 12v6H2v-6M12 2v6" />, // Storefront wrapper representation
  },
];

export default function CreateDeal() {
  return (
    <Container className="pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-4 space-y-4 text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-[44px] font-extrabold text-[#1F2937] tracking-tight leading-[1.15]">
            Create Deals That Fit Your Business
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base font-normal leading-relaxed max-w-md">
            You decide how, when, and where your offers are available.
          </p>
        </div>

        {/* Right Block: Dynamic Unified Outer Border Matrix Grid (Takes 8 spans out of 12) */}
        <div className="lg:col-span-8 w-full bg-white rounded-3xl border border-[#EDF2F7] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {DEAL_TYPES.map((deal, idx) => {
              return (
                <div
                  key={deal.id}
                  className={`
                      flex items-center gap-4 p-8 bg-white transition-colors duration-200 hover:bg-neutral-50/50
                      /* Smart layout borders alignment utilities */
                      border-b border-[#EDF2F7]
                      sm:border-r ${(idx + 1) % 2 === 0 ? "sm:border-r-0" : ""}
                      md:border-r ${(idx + 1) % 3 === 0 ? "md:border-r-0" : "md:border-r"}
                      ${idx >= 6 ? "md:border-b-0" : ""}
                      ${idx >= 8 ? "sm:border-b-0" : ""}
                    `}
                >
                  {/* Modern Hex/Square Soft Blue Filled Accent Icon wrapper */}
                  <div className="w-10 h-10 rounded-xl bg-[#2DE2EA]/10 text-[#0E6A70] flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {deal.iconPath}
                    </svg>
                  </div>

                  {/* Feature Label Description text string */}
                  <span className="text-[15px] font-bold text-[#1F2937] tracking-tight leading-snug">
                    {deal.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
