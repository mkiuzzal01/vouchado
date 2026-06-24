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
    <section className="w-full py-20 lg:py-32 font-sans overflow-hidden bg-[#FAFCFD] selection:bg-[#1ec6cc]/10">
      <Container>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── VERTICAL TIMELINE LINE ── */}
          <div
            className="
              absolute top-2 bottom-2
              left-6 lg:left-1/2
              w-[2px] bg-gradient-to-b from-[#E5E7EB] via-[#F4F6F8] to-[#E5E7EB]
              z-0 lg:-translate-x-1/2
            "
          />

          {/* ── STEPS ── */}
          <div className="space-y-20 lg:space-y-32 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.id}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
                >
                  {/* ── NUMBERED BADGE ── */}
                  {/* 
                    Perfect alignment adjustment: 
                    Positioned beautifully exactly at the height of the text headers 
                  */}
                  <div
                    className="
                      absolute
                      left-6 top-0
                      lg:left-1/2 lg:top-[28px]
                      lg:-translate-y-1/2 lg:-translate-x-1/2
                      z-20
                    "
                  >
                    <span
                      className="
                        text-sm md:text-base
                        w-10 h-10 rounded-full
                        bg-[#1da9b1] text-white
                        flex items-center justify-center
                        font-bold tracking-wide
                        border-4 border-white shadow-md
                        transition-transform duration-300 hover:scale-110
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* ── IMAGE SIDE ── */}
                  <div
                    className={`
                      w-full flex items-center pl-14 lg:pl-0
                      ${isEven ? "lg:order-last lg:justify-start" : "lg:order-first lg:justify-end"}
                    `}
                  >
                    {/* Premium Card Mockup Container matching image_881533.png */}
                    <div
                      className="
                        relative w-full max-w-[340px] aspect-[4/3] sm:aspect-square 
                        rounded-[32px] bg-white p-6
                        flex items-center justify-center
                        shadow-[0px_20px_50px_rgba(0,0,0,0.04)]
                        border border-gray-100/60
                        transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(0,0,0,0.07)] hover:-translate-y-1
                      "
                    >
                      <Image
                        src={step.imageSrc}
                        alt={step.title}
                        quality={100}
                        priority={index < 2}
                        className="object-contain max-h-[92%] w-auto select-none"
                      />
                    </div>
                  </div>

                  {/* ── TEXT SIDE ── */}
                  <div
                    className={`
                      flex flex-col justify-center text-left pl-14 lg:pl-0
                      ${isEven ? "lg:order-first lg:text-left lg:pr-10" : "lg:pl-10"}
                    `}
                  >
                    <h3 className="text-2xl lg:text-[28px] font-extrabold text-[#1F2E3D] tracking-tight mb-3 leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-[15px] lg:text-[16px] text-[#637381] font-normal leading-relaxed mb-6 max-w-md">
                      {step.description}
                    </p>

                    {/* Sub-feature badges */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      {step.features.map((feature, fIdx) => {
                        const IconComponent = feature.icon;
                        return (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-xs font-bold shrink-0 group"
                          >
                            <div className="p-1 rounded-md bg-[#1ec6cc]/5 transition-colors group-hover:bg-[#1ec6cc]/10">
                              <IconComponent className="w-[16px] h-[16px] text-[#1da9b1] shrink-0" />
                            </div>
                            <span className="tracking-tight text-[#212B36] font-semibold text-[13px]">
                              {feature.label}
                            </span>
                          </div>
                        );
                      })}
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
