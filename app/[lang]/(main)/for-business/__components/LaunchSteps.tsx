"use client";

import Container from "@/app/components/shared/Container";
import step_1 from "@/public/business/launch_step (1).png";
import step_2 from "@/public/business/launch_step (2).png";
import step_3 from "@/public/business/launch_step (3).png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface StepItem {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const STEPS_DATA: StepItem[] = [
  {
    id: 1,
    stepNumber: 1,
    title: "Create your deal",
    description: "Choose discount, availability, and duration in minutes.",
    imageSrc: step_3,
    imageAlt:
      "Dashboard view showing options to scan voucher or add new service",
  },
  {
    id: 2,
    stepNumber: 2,
    title: "Customers purchase",
    description: "Users discover and buy vouchers on the marketplace.",
    imageSrc: step_1,
    imageAlt: "Notification preview showing user purchase status",
  },
  {
    id: 3,
    stepNumber: 3,
    title: "Voucher redemption",
    description: "Customer visits and redeems instantly via QR code.",
    imageSrc: step_2,
    imageAlt: "Smartphone screen scanning a dynamic QR code",
  },
];

export default function LaunchSteps() {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full">
        {STEPS_DATA.map((step, index) => (
          <div key={step.id} className="relative flex flex-col mb-10">
            {/* Image Preview Container */}
            <div className="relative w-full aspect-[2.3/1] md:aspect-[1.47/1] rounded-2xl overflow-hidden flex items-center justify-center p-4">
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={90}
                className="object-contain p-2 select-none pointer-events-none"
                priority={step.id === 1}
              />
            </div>

            {/* Text Blocks with Circular Number Badge */}
            <div className="flex items-start gap-3 px-1">
              {/* Visual Number Indicator */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#23ad9b] to-[#2DD4BF] text-xs font-bold text-white mt-0.5">
                {step.stepNumber}
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4B5563] font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {index > 0 && (
              <div className="hidden md:flex items-center justify-center absolute top-[40%] -left-10 lg:-left-8 z-10  text-xl font-light text-slate-400 select-none">
                <ArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
