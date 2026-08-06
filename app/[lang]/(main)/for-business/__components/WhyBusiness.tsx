import React from "react";
import Container from "@/app/components/shared/Container";
import ReachNewCustomer from "@/app/components/icons/ReachNewCustomer";
import IncressLocal from "@/app/components/icons/IncressLocal";
import FillQuite from "@/app/components/icons/FillQuite";
import Love from "@/app/components/icons/Love";
import EasyDeal from "@/app/components/icons/EasyDeal";
import Performance from "@/app/components/icons/Performance";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  iconPath: React.ReactNode;
}

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function WhyBusiness({ t }: Props) {
  const PARTNER_FEATURES: FeatureCard[] = [
    {
      id: 1,
      title: t.for_business.why_business_with_us.reach_new_customers?.title,
      description:
        t.for_business.why_business_with_us.reach_new_customers?.desc,
      iconPath: <ReachNewCustomer size={40} />,
    },
    {
      id: 2,
      title:
        t.for_business.why_business_with_us.increase_local_visibility?.title,
      description:
        t.for_business.why_business_with_us.increase_local_visibility?.desc,
      iconPath: <IncressLocal size={40} />,
    },
    {
      id: 3,
      title: t.for_business.why_business_with_us.fill_quiet_periods?.title,
      description: t.for_business.why_business_with_us.fill_quiet_periods?.desc,
      iconPath: <FillQuite size={40} />,
    },
    {
      id: 4,
      title: t.for_business.why_business_with_us.build_customer_loyalty?.title,
      description:
        t.for_business.why_business_with_us.build_customer_loyalty?.desc,
      iconPath: <Love size={40} />,
    },
    {
      id: 5,
      title: t.for_business.why_business_with_us.easy_deal_management?.title,
      description:
        t.for_business.why_business_with_us.easy_deal_management?.desc,
      iconPath: <EasyDeal size={40} />,
    },
    {
      id: 6,
      title:
        t.for_business.why_business_with_us.performance_based_growth?.title,
      description:
        t.for_business.why_business_with_us.performance_based_growth?.desc,
      iconPath: <Performance size={40} />,
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-8">
      <Container>
        {/* --- HEADER BLOCK --- */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xl md:text-4xl lg:text-[48px] font-bold text-[#1F2937] tracking-tight">
            {t.for_business.why_business_with_us.title}
          </h2>
          <p className="text-[#6B7280] text-sm lg:text-lg font-semibold">
            {t.for_business.why_business_with_us.subtitle}
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
