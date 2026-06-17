// src/components/sections/WhyBusiness.tsx
import React from "react";
import Container from "@/app/components/shared/Container";

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  iconPath: React.ReactNode;
}

const PARTNER_FEATURES: FeatureCard[] = [
  {
    id: 1,
    title: "Reach New Customers",
    description: "Connect with people actively looking for local experiences.",
    iconPath: <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />,
  },
  {
    id: 2,
    title: "Increase Local Visibility",
    description: "Appear in searches, categories, and city recommendations.",
    iconPath: <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />,
  },
  {
    id: 3,
    title: "Fill Quiet Periods",
    description: "Promote offers during slower business hours.",
    iconPath: <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />,
  },
  {
    id: 4,
    title: "Build Customer Loyalty",
    description: "Turn first-time visitors into returning customers.",
    iconPath: <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />,
  },
  {
    id: 5,
    title: "Easy Deal Management",
    description: "Create and manage offers from a simple dashboard.",
    iconPath: <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />,
  },
  {
    id: 6,
    title: "Performance-Based Growth",
    description: "Generate revenue through targeted campaigns.",
    iconPath: <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />,
  },
];

export default function WhyBusiness() {
  return (
    <section className="w-full py-20 px-4 sm:px-8">
      <Container>
        {/* --- HEADER BLOCK --- */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#1F2937] tracking-tight">
            Why businesses partner with us
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base font-normal tracking-wide">
            A modern toolkit designed to grow revenue without growing fixed
            costs
          </p>
        </div>

        {/* --- FEATURES GRID STRATEGY --- */}
        {/* Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PARTNER_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/60 shadow-sm flex flex-col items-start space-y-5 transition-all duration-200 hover:shadow-md"
            >
              {/* Soft Teal Rounded Decorative Icon Container */}
              <div className="w-12 h-12 rounded-full bg-[#2DE2EA]/10 flex items-center justify-center text-[#0E6A70]">
                <svg
                  className="w-5 h-5 stroke-2 transform -translate-y-[0.5px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {feature.iconPath}
                  {/* Shared Trend Up Arrow Line Overlay */}
                  <path d="M17 4h4v4M21 4L12 13l-4-4L3 18" />
                </svg>
              </div>

              {/* Text Layout blocks */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#4B5563] font-normal leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
