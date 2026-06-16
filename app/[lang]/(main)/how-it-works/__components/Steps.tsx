"use client";

import React from "react";
import Image from "next/image";
import step_1 from "@/public/howToWork/step_1.png";
import step_2 from "@/public/howToWork/step_2.png";
import step_3 from "@/public/howToWork/step_3.png";
import step_4 from "@/public/howToWork/step_4.png";
import step_5 from "@/public/howToWork/step_5.png";
import Container from "@/app/components/shared/Container";

interface SubFeature {
  label: string;
  icon: React.ReactNode;
}

interface StepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: any;
  features: SubFeature[];
}

export default function Steps() {
  const steps: StepItem[] = [
    {
      id: "step-1",
      number: "01",
      title: "Discover Deals",
      description:
        "Browse nearby offers, explore curated categories or search for experiences that match your interests.",
      imageSrc: step_1,
      features: [
        {
          label: "Curated offers",
          icon: (
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          ),
        },
        {
          label: "Nearby deals",
          icon: (
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          ),
        },
        {
          label: "Easy search",
          icon: (
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeWidth="2.5"
              fill="none"
            />
          ),
        },
      ],
    },
    {
      id: "step-2",
      number: "02",
      title: "Purchase Your Voucher",
      description:
        "Choose your favourite deal and securely purchase your service in just a few taps.",
      imageSrc: step_2,
      features: [
        {
          label: "Secure payments",
          icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        },
        {
          label: "Instant confirmation",
          icon: (
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
          ),
        },
        {
          label: "Best price guarantee",
          icon: (
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          ),
        },
      ],
    },
    {
      id: "step-3",
      number: "03",
      title: "Receive Your Voucher",
      description:
        "Your voucher is instantly stored in your account, ready to use whenever you are.",
      imageSrc: step_3,
      features: [
        {
          label: "Instant voucher",
          icon: (
            <>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </>
          ),
        },
        {
          label: "Stored in your account",
          icon: (
            <>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </>
          ),
        },
        {
          label: "Always accessible",
          icon: (
            <>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </>
          ),
        },
      ],
    },
    {
      id: "step-4",
      number: "04",
      title: "Redeem & Enjoy",
      description:
        "Visit the business, present your QR code, and enjoy your experience while saving money.",
      imageSrc: step_4,
      features: [
        {
          label: "Quick & easy redemption",
          icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
        },
        {
          label: "Enjoy exclusive experiences",
          icon: (
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          ),
        },
        {
          label: "Save more on every visit",
          icon: (
            <>
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </>
          ),
        },
      ],
    },
    {
      id: "step-5",
      number: "05",
      title: "Earn Loyalty Points",
      description:
        "Collect points with every purchase and redeem them for future Vouchado vouchers.",
      imageSrc: step_5,
      features: [
        {
          label: "Collect points",
          icon: (
            <>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v8M8 12h8" />
            </>
          ),
        },
        {
          label: "Unlock rewards",
          icon: (
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          ),
        },
        {
          label: "More benefits",
          icon: (
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          ),
        },
      ],
    },
  ];

  return (
    <section className="w-full bg-[#fcfdfd] py-16 lg:py-24 font-sans overflow-hidden selection:bg-[#1ec6cc]/10">
      <Container>
        {/* Main Process Steps Mapping */}
        <div className="space-y-16 lg:space-y-24 relative z-10">
          {steps.map((step, index) => {
            // Evaluates true for Steps 2 and 4 to flip text to the left side
            const isReverseRow = index % 2 === 1;

            return (
              <div
                key={step.id}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20
                  ${isReverseRow ? "lg:flex-row-reverse" : ""}
                `}
              >
                {/* --- GRAPHIC IMAGE CONTAINER --- */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="relative w-full max-w-[440px] aspect-4/3">
                    <Image
                      src={step.imageSrc}
                      alt={step.title}
                      quality={100}
                      fill
                      sizes="(max-w-7xl) 100vw, 500px"
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* --- CONTENT TEXT COLUMN BLOCK --- */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Badge Indicator */}
                    <span className="w-10 h-10 shrink-0 rounded-full bg-[#1da9b1] text-white flex items-center justify-center font-bold text-[15px] tracking-wide shadow-sm">
                      {step.number}
                    </span>

                    <div className="flex flex-col">
                      <h3 className="text-2xl font-extrabold text-[#1a3138] tracking-tight mb-3">
                        {step.title}
                      </h3>

                      <p className="text-[15px] text-gray-500 font-medium leading-relaxed max-w-md mb-6">
                        {step.description}
                      </p>

                      {/* Inline Product Key Features Metrics */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        {step.features.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-xs font-bold text-[#1a3138]"
                          >
                            <svg
                              className="w-[18px] h-[18px] text-[#1ec6cc]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {feature.icon}
                            </svg>
                            <span className="tracking-tight text-slate-600 font-semibold">
                              {feature.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
