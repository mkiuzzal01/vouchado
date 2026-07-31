"use client";

import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import Container from "@/app/components/shared/Container";
import step_1 from "@/public/business/lounch_step (3).png";
import step_2 from "@/public/business/lounch_step (2).png";
import step_3 from "@/public/business/lounch_step (1).png";
import Image, { StaticImageData } from "next/image";

interface StepItem {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  borderColor: string;
  badgeBg: string;
  shadowClass: string;
}

const STEPS_DATA: StepItem[] = [
  {
    id: 1,
    stepNumber: 1,
    title: "Create your deal",
    description: "Choose discount, availability, and duration in minutes.",
    imageSrc: step_1,
    imageAlt:
      "Dashboard view showing options to scan voucher or add new service",
    borderColor: "border-[#2DD4BF]",
    badgeBg: "bg-linear-to-r from-teal-400 to-teal-500",
    shadowClass:
      "shadow-[0_10px_25px_-5px_rgba(45,212,191,0.12),0_8px_16px_-6px_rgba(45,212,191,0.12)]",
  },
  {
    id: 2,
    stepNumber: 2,
    title: "Customers purchase",
    description: "Users discover and buy vouchers on the marketplace.",
    imageSrc: step_2,
    imageAlt: "Notification preview showing user purchase status",
    borderColor: "border-[#C084FC]",
    badgeBg: "bg-linear-to-r from-purple-400 to-purple-500",
    shadowClass:
      "shadow-[0_10px_25px_-5px_rgba(192,132,252,0.12),0_8px_16px_-6px_rgba(192,132,252,0.12)]",
  },
  {
    id: 3,
    stepNumber: 3,
    title: "Voucher redemption",
    description: "Customer visits and redeems instantly via QR code.",
    imageSrc: step_3,
    imageAlt: "Smartphone screen scanning a dynamic QR code",
    borderColor: "border-[#4ADE80]",
    badgeBg: "bg-linear-to-r from-green-400 to-green-500",
    shadowClass:
      "shadow-[0_10px_25px_-5px_rgba(74,222,128,0.12),0_8px_16px_-6px_rgba(74,222,128,0.12)]",
  },
];

export default function LaunchSteps() {
  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-4 w-full p-6">
        {STEPS_DATA.map((step, index) => (
          <div key={step.id} className="relative lg:w-[80%] m-auto">
            {/* Main Step Card Container with themed shadow styling */}
            <div
              className={`relative bg-white border-2 ${step.borderColor} ${step.shadowClass} rounded-4xl p-6 pt-12 pb-10 flex flex-col items-center justify-between text-center h-full min-h-[380px]`}
            >
              {/* Overlapping Top-Left Badge */}
              <div
                className={`absolute -top-5 -left-5 h-11 w-11 flex items-center justify-center rounded-full ${step.badgeBg} text-lg font-bold text-white shadow-md border-4 border-white`}
              >
                {step.stepNumber}
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[170px] flex items-center justify-center">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-3 mt-6 w-full">
                <h3 className="text-3xl font-semibold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-[#52525b] font-normal">{step.description}</p>
              </div>
            </div>

            {/* Connecting Arrow Icon */}
            {index < STEPS_DATA.length - 1 && (
              <div className="hidden md:block absolute top-[50%] -right-22 transform -translate-y-1/2 z-20 opacity-80">
                <ArrowRightIcon size={80} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
