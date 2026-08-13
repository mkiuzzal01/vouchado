"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import Container from "@/app/components/shared/Container";
import step_1 from "@/public/business/lounch_step (3).png";
import step_2 from "@/public/business/lounch_step (2).png";
import step_3 from "@/public/business/lounch_step (1).png";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface StepItem {
  id: number;
  stepNumber: number;
  title: string;
  renderDescription: () => React.ReactNode;
  imageSrc: StaticImageData;
  imageAlt: string;
  borderColor: string;
  badgeBg: string;
  shadowClass: string;
}

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function LaunchSteps({ t }: Props) {
  // Safe fallback to dictionary keys
  const stepsData = t?.for_business?.steps;

  const STEPS_DATA: StepItem[] = [
    {
      id: 1,
      stepNumber: 1,
      title: stepsData?.step_1?.title || "",
      renderDescription: () => (
        <>
          {stepsData?.step_1?.desc_1 || ""}{" "}
          <span className="text-[#1ec6cc] font-semibold block sm:inline">
            {stepsData?.step_1?.desc_highlight || ""}
          </span>
        </>
      ),
      imageSrc: step_1,
      imageAlt: "Create offer interface on smartphone screen",
      borderColor: "border-[#14B8A6]",
      badgeBg: "bg-[#14B8A6]",
      shadowClass:
        "shadow-[0_10px_25px_-5px_rgba(20,184,166,0.15),0_8px_16px_-6px_rgba(20,184,166,0.12)]",
    },
    {
      id: 2,
      stepNumber: 2,
      title: stepsData?.step_2?.title || "",
      renderDescription: () => (
        <>
          {stepsData?.step_2?.desc_1 || ""}{" "}
          <span className="text-[#A855F7] font-semibold">
            {stepsData?.step_2?.desc_highlight || ""}
          </span>{" "}
          {stepsData?.step_2?.desc_2 || ""}
        </>
      ),
      imageSrc: step_2,
      imageAlt: "Vouchado shopping bag",
      borderColor: "border-[#C084FC]",
      badgeBg: "bg-[#A855F7]",
      shadowClass:
        "shadow-[0_10px_25px_-5px_rgba(168,85,247,0.15),0_8px_16px_-6px_rgba(168,85,247,0.12)]",
    },
    {
      id: 3,
      stepNumber: 3,
      title: stepsData?.step_3?.title || "",
      renderDescription: () => (
        <>
          {stepsData?.step_3?.desc_1 || ""}{" "}
          <span className="text-[#22C55E] font-semibold">
            {stepsData?.step_3?.desc_highlight || ""}
          </span>{" "}
          {stepsData?.step_3?.desc_2 || ""}
        </>
      ),
      imageSrc: step_3,
      imageAlt: "Customer redeeming voucher at front desk",
      borderColor: "border-[#4ADE80]",
      badgeBg: "bg-[#22C55E]",
      shadowClass:
        "shadow-[0_10px_25px_-5px_rgba(34,197,94,0.15),0_8px_16px_-6px_rgba(34,197,94,0.12)]",
    },
  ];

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-4 lg:p-6">
        {STEPS_DATA.map((step, index) => (
          <div key={step.id} className="relative w-full max-w-sm mx-auto">
            {/* Main Step Card */}
            <div
              className={`relative bg-white border-2 ${step.borderColor} ${step.shadowClass} rounded-3xl pt-10 pb-8 px-6 flex flex-col items-center justify-between text-center h-full`}
            >
              {/* Top-Left Step Badge */}
              <div
                className={`absolute -top-4 -left-4 h-10 w-10 flex items-center justify-center rounded-full ${step.badgeBg} text-lg font-bold text-white shadow-md border-2 border-white`}
              >
                {step.stepNumber}
              </div>

              {/* Image Container */}
              <div className="relative w-full h-64 flex items-center justify-center">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-3 mt-4 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {step.renderDescription()}
                </div>
              </div>
            </div>

            {/* Connecting Arrow Icon between steps */}
            {index < STEPS_DATA.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                <ArrowRightIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
