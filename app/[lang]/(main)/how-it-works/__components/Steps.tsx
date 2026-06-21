"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Search,
  ShieldCheck,
  CheckCircle2,
  CircleDollarSign,
  QrCode,
  UserCheck,
  Clock,
  Zap,
  Percent,
  PlusCircle,
  Lock,
  Layers,
} from "lucide-react";
import Container from "@/app/components/shared/Container";

import step_1 from "@/public/howToWork/step_1.png";
import step_2 from "@/public/howToWork/step_2.png";
import step_3 from "@/public/howToWork/step_3.png";
import step_4 from "@/public/howToWork/step_4.png";
import step_5 from "@/public/howToWork/step_5.png";

interface SubFeature {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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
        { label: "Curated offers", icon: Sparkles },
        { label: "Nearby deals", icon: MapPin },
        { label: "Easy search", icon: Search },
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
        { label: "Secure payments", icon: ShieldCheck },
        { label: "Instant confirmation", icon: CheckCircle2 },
        { label: "Best price guarantee", icon: CircleDollarSign },
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
        { label: "Instant voucher", icon: Zap },
        { label: "Stored in your account", icon: UserCheck },
        { label: "Always accessible", icon: Clock },
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
        { label: "Quick & easy redemption", icon: QrCode },
        { label: "Enjoy exclusive experiences", icon: Sparkles },
        { label: "Save more on every visit", icon: Percent },
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
        { label: "Collect points", icon: PlusCircle },
        { label: "Unlock rewards", icon: Lock },
        { label: "More benefits", icon: Layers },
      ],
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 font-sans overflow-hidden selection:bg-[#1ec6cc]/10">
      <Container>
        <div className="relative">
          {/* --- VERTICAL TIMELINE DIVIDER LINE --- */}
          {/* Mobile: Anchored to the left side | Desktop: Anchored exactly at center (left: 50%) */}
          <div className="absolute top-4 bottom-4 left-9 lg:left-1/2 w-[2px] border-l-2 border-dashed border-[#1da9b1]/30 -translate-x-1/2 z-0" />

          {/* --- STEPS CONTAINER --- */}
          <div className="space-y-16 lg:space-y-28 relative z-10">
            {steps.map((step, index) => {
              const isReverseRow = index % 2 === 1;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-0 relative
                    ${isReverseRow ? "lg:flex-row-reverse" : ""}
                  `}
                >
                  {/* --- BADGE CIRCLE --- */}
                  {/* Absolute positioning to stack perfectly over the matching background timeline line */}
                  <div className="absolute left-5 lg:left-1/2 top-2 lg:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                    <span className="text-sm md:text-base w-11 h-11 rounded-full bg-[#1da9b1] text-white flex items-center justify-center font-bold tracking-wide shadow-md shadow-[#1da9b1]/30 border-4 border-white">
                      {step.number}
                    </span>
                  </div>

                  {/* --- GRAPHIC IMAGE COLUMN --- */}
                  <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-12">
                    <div className="relative w-full max-w-[380px] aspect-[4/3] transition-transform duration-500 hover:scale-[1.02]">
                      <Image
                        src={step.imageSrc}
                        alt={step.title}
                        quality={100}
                        fill
                        sizes="(max-w-7xl) 100vw, 400px"
                        className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.05)]"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* --- CONTENT TEXT COLUMN BLOCK --- */}
                  <div
                    className={`w-full lg:w-1/2 flex flex-col justify-center pl-16 pr-4 lg:p-12
                    ${isReverseRow ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"}
                  `}
                  >
                    <div
                      className={`max-w-md text-justify flex flex-col ${isReverseRow ? "lg:items-end" : "lg:items-start"}`}
                    >
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a3138] tracking-tight mb-3">
                        {step.title}
                      </h3>

                      <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Inline Product Key Features Metrics */}
                      <div
                        className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${isReverseRow ? "lg:justify-end" : "lg:justify-start"}`}
                      >
                        {step.features.map((feature, fIdx) => {
                          const IconComponent = feature.icon;
                          return (
                            <div
                              key={fIdx}
                              className="flex items-center gap-2 text-xs font-bold shrink-0"
                            >
                              <IconComponent className="w-[18px] h-[18px] text-[#1ec6cc] shrink-0" />
                              <span className="tracking-tight text-slate-600 font-semibold">
                                {feature.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
