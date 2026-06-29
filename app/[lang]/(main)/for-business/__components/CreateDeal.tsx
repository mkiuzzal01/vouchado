// src/components/sections/CreateDeal.tsx
import React from "react";
import Container from "@/app/components/shared/Container";
import Limited from "@/app/components/icons/Limited";
import Promotion from "@/app/components/icons/Promotion";
import Campaigns from "@/app/components/icons/Campaigns";
import Calendar from "@/app/components/icons/Calendar";
import TimeBased from "@/app/components/icons/TimeBased";
import Smiley from "@/app/components/icons/Smiley";
import Flag from "@/app/components/icons/Flag";
import Universal from "@/app/components/icons/Universal";
import Opening from "@/app/components/icons/Opening";
import EventBasePropotion from "@/app/components/icons/EventBasePropotion";

interface DealType {
  id: number;
  title: string;
  iconPath: React.ReactNode;
}

const DEAL_TYPES: DealType[] = [
  {
    id: 1,
    title: "Limited Quantity Offers",
    iconPath: <Limited size={36} />,
  },
  {
    id: 2,
    title: "Last-Minute Promotions",
    iconPath: <Promotion size={36} />,
  },
  {
    id: 3,
    title: "Seasonal Campaigns",
    iconPath: <Campaigns size={36} />,
  },
  {
    id: 4,
    title: "Weekday Specials",
    iconPath: <Calendar size={36} />,
  },
  {
    id: 5,
    title: "Time-Based Deals",
    iconPath: <TimeBased size={36} />,
  },
  {
    id: 6,
    title: "Family & Kids Offers",
    iconPath: <Smiley size={36} />,
  },
  {
    id: 7,
    title: "Event-Based Promotions",
    iconPath: <EventBasePropotion size={36} />,
  },
  {
    id: 8,
    title: "Universal Business Vouchers",
    iconPath: <Universal size={36} />,
  },
  {
    id: 9,
    title: "Opening Specials",
    iconPath: <Opening size={36} />,
  },
];

export default function CreateDeal() {
  return (
    <Container className="pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-4 space-y-4 text-left">
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">
            Create Deals That Fit Your Business
          </h2>
          <p className="text-[#6B7280] text-sm lg:text-xl font-normal leading-relaxed max-w-md">
            You decide how, when, and where your offers are available.
          </p>
        </div>

        {/* Right Block: Dynamic Unified Outer Border Matrix Grid (Takes 8 spans out of 12) */}
        <div className="lg:col-span-8 w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DEAL_TYPES.map((deal, idx) => {
              return (
                <div
                  key={deal.id}
                  className={`
                      flex items-center gap-4 p-8 bg-white rounded-4xl
                      sm:border-r ${(idx + 1) % 2 === 0 ? "sm:border-r-0" : ""}
                      md:border-r ${(idx + 1) % 3 === 0 ? "md:border-r-0" : "md:border-r"}
                      ${idx >= 6 ? "md:border-b-0" : ""}
                      ${idx >= 8 ? "sm:border-b-0" : ""}
                    `}
                >
                  {/* Modern Hex/Square Soft Blue Filled Accent Icon wrapper */}
                  <div className="w-10 h-10 rounded-xl text-[#0E6A70] flex items-center justify-center shrink-0">
                    {deal.iconPath}
                  </div>

                  {/* Feature Label Description text string */}
                  <span className="text-[20px] font-bold text-[#1F2937]">
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
