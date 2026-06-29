import React from "react";
import Container from "@/app/components/shared/Container";
import ReachNewCustomer from "@/app/components/icons/ReachNewCustomer";
import IncressLocal from "@/app/components/icons/IncressLocal";
import FillQuite from "@/app/components/icons/FillQuite";
import Love from "@/app/components/icons/Love";
import EasyDeal from "@/app/components/icons/EasyDeal";
import Performance from "@/app/components/icons/Performance";

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
    iconPath: <ReachNewCustomer size={40} />,
  },
  {
    id: 2,
    title: "Increase Local Visibility",
    description: "Appear in searches, categories, and city recommendations.",
    iconPath: <IncressLocal size={40} />,
  },
  {
    id: 3,
    title: "Fill Quiet Periods",
    description: "Promote offers during slower business hours.",
    iconPath: <FillQuite size={40} />,
  },
  {
    id: 4,
    title: "Build Customer Loyalty",
    description: "Turn first-time visitors into returning customers.",
    iconPath: <Love size={40} />,
  },
  {
    id: 5,
    title: "Easy Deal Management",
    description: "Create and manage offers from a simple dashboard.",
    iconPath: <EasyDeal size={40} />,
  },
  {
    id: 6,
    title: "Performance-Based Growth",
    description: "Generate revenue through targeted campaigns.",
    iconPath: <Performance size={40} />,
  },
];

export default function WhyBusiness() {
  return (
    <section className="w-full py-20 px-4 sm:px-8">
      <Container>
        {/* --- HEADER BLOCK --- */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xl md:text-4xl lg:text-[48px] font-bold text-[#1F2937] tracking-tight">
            Why businesses partner with us
          </h2>
          <p className="text-[#6B7280] text-sm lg:text-lg font-semibold">
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
              className="flex gap-5 bg-white p-5 rounded-3xl items-center"
            >
              {/* Soft Teal Rounded Decorative Icon Container */}
              <div className="p-4 rounded-full bg-[#2DE2EA]/10 flex items-center justify-center text-[#0E6A70]">
                {feature.iconPath}
              </div>

              {/* Text Layout blocks */}
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-bold text-[#111827] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[#454F5B] font-normal leading-relaxed">
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
