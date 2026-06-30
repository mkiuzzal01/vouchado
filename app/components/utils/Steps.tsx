import React from "react";
import Bag from "../icons/Bag";
import Scanner from "../icons/Scanner";
import Search from "../icons/Search";
import Container from "../shared/Container";

export default function Steps() {
  const steps = [
    {
      title: "1. Discover",
      description: "Find the best local deals near you.",
      icon: <Search size={70} />,
    },
    {
      title: "2. Purchase",
      description: "Buy securely and instantly online.",
      icon: <Bag size={70} />,
    },
    {
      title: "3. Redeem",
      description: "Redeem your deal and enjoy amazing experiences.",
      icon: <Scanner size={70} />,
    },
  ];

  return (
    <Container>
      <div className="rounded-3xl bg-gray-200/20 border border-gray-300 mt-44">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 p-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center gap-5">
              {/* White Icon Circle Background */}
              <div className="p-[16px] rounded-full bg-white/50  flex items-center justify-center shrink-0 text-[#1ec6cc]">
                {step.icon}
              </div>

              {/* Text Copy Section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-2xl font-semibold text-slate-800 mb-1 tracking-tight">
                  {step.title}
                </h4>
                <p className="md:text-lg text-sm text-[#637381] leading-7">
                  {step.description}
                </p>
              </div>

              {/* Steps Chevron Divider (Hidden on Last Step & Mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 text-gray-300 z-10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
