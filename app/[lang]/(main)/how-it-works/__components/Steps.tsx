"use client";

import React from "react";
import Image from "next/image";
import Container from "@/app/components/shared/Container";
import step_1 from "@/public/business/step_img (1).png";
import step_2 from "@/public/business/step_img (2).png";
import step_3 from "@/public/business/step_img (3).png";
import step_4 from "@/public/business/step_img (4).png";
import step_5 from "@/public/business/step_img (5).png";
import Curated from "@/app/components/icons/Curated";
import Nearby from "@/app/components/icons/Nearby";
import EasySearch from "@/app/components/icons/EasySearch";
import SPayment from "@/app/components/icons/SPayment";
import InstantConfiremation from "@/app/components/icons/InstantConfiremation";
import BestPriceGuranted from "@/app/components/icons/BestPriceGuranted";
import InstantVoucher from "@/app/components/icons/InstantVoucher";
import StoredAcct from "@/app/components/icons/StoredAcct";
import Accessible from "@/app/components/icons/Accessible";
import Quick from "@/app/components/icons/Quick";
import Enjoy from "@/app/components/icons/Enjoy";
import SaveMore from "@/app/components/icons/SaveMore";
import Collect from "@/app/components/icons/Collect";
import Unlock from "@/app/components/icons/Unlock";
import Benefits from "@/app/components/icons/Benefits";

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

const steps: StepItem[] = [
  {
    id: "step-1",
    number: "01",
    title: "Discover Deals",
    description:
      "Browse nearby offers, explore curated categories or search for experiences that match your interests.",
    imageSrc: step_1,
    features: [
      { label: "Curated offers", icon: <Curated size={30} /> },
      { label: "Nearby deals", icon: <Nearby size={30} /> },
      { label: "Easy search", icon: <EasySearch size={30} /> },
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
      { label: "Secure payments", icon: <SPayment size={30} /> },
      {
        label: "Instant confirmation",
        icon: <InstantConfiremation size={30} />,
      },
      {
        label: "Best price guarantee",
        icon: <BestPriceGuranted size={30} />,
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
      { label: "Instant voucher", icon: <InstantVoucher size={30} /> },
      { label: "Stored in your account", icon: <StoredAcct size={30} /> },
      { label: "Always accessible", icon: <Accessible size={30} /> },
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
      { label: "Quick & easy redemption", icon: <Quick size={30} /> },
      { label: "Enjoy exclusive experiences", icon: <Enjoy size={30} /> },
      { label: "Save more on every visit", icon: <SaveMore size={30} /> },
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
      { label: "Collect points", icon: <Collect size={30} /> },
      { label: "Unlock rewards", icon: <Unlock size={30} /> },
      { label: "More benefits", icon: <Benefits size={30} /> },
    ],
  },
];

export default function Steps() {
  return (
    <section className="w-full py-12 md:py-16 lg-18 xl:py-24">
      <Container>
        <div className="relative max-w-[1114px] mx-auto">
          {/* ── VERTICAL TIMELINE LINE ── */}
          <div
            className="
              hidden lg:block absolute top-35 bottom-0
              left-6 lg:left-1/2
              w-[2px] bg-[#E2E8F0]
              z-10 lg:-translate-x-1/2
            "
          />

          {/* ── STEPS CONTAINER ── */}
          <div className="space-y-16 lg:space-y-24 relative z-10">
            {steps.map((step, index) => {
              const stepIndex = index + 1;
              const isOdd = stepIndex % 2 !== 0;
              const isImageLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[280px]"
                >
                  {/* ── CONDITIONALLY POSITIONED BADGE ── */}
                  <div
                    className={`
                      absolute z-10
                      ${
                        isOdd
                          ? "left-6 top-0 lg:left-1/2 lg:top-32 lg:-translate-y-1/2 lg:-translate-x-1/2"
                          : "left-6 top-0 lg:left-[-45px] lg:top-[140px] lg:-translate-y-1/2 lg:-translate-x-1/2"
                      }
                    `}
                  >
                    <span
                      className="
                        text-sm lg:text-2xl
                        w-10 h-10 lg:w-16 lg:h-16 rounded-full
                        bg-[#23888E] text-white
                        flex items-center justify-center
                        font-bold tracking-wide
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* ── IMAGE CONTAINER SIDE ── */}
                  <div
                    className={`
                      w-full flex items-center
                      ${isImageLeft ? "lg:order-first lg:justify-end" : "lg:order-last lg:justify-start"}
                    `}
                  >
                    <div className="relative w-full flex items-center justify-center">
                      <Image
                        src={step.imageSrc}
                        alt={step.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </div>

                  {/* ── TEXT CONTENT SIDE ── */}
                  <div
                    className={`
                      flex flex-col justify-center
                      ${isImageLeft ? "lg:order-last lg:pl-4" : "lg:order-first lg:pr-4"}
                    `}
                  >
                    <div className="max-w-md w-full">
                      <h3 className="text-xl lg:text-[32px] font-bold text-black tracking-tight mb-2 leading-snug">
                        {step.title}
                      </h3>

                      <p className="text-[14px] lg:text-[18px] text-gray-600 font-normal leading-[28px] mb-4">
                        {step.description}
                      </p>

                      {/* Sub-feature badges */}
                      <div className="flex gap-4">
                        {step.features.map((feature, fIdx) => {
                          const IconComponent = feature.icon;
                          return (
                            <div key={fIdx} className="flex items-center gap-2">
                              {IconComponent}
                              <span className=" text-[10px] md:text-[12px] lg:text-[14px] font-semibold text-[#212B36] xl:leading-[20px]">
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
