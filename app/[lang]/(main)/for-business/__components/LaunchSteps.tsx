"use client";

import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import Container from "@/app/components/shared/Container";
import step_1 from "@/public/business/lounch_step (3).png";
import step_2 from "@/public/business/lounch_step (2).png";
import step_3 from "@/public/business/lounch_step (1).png";
import Image, { StaticImageData } from "next/image";
import { getDictionary } from "@/app/[lang]/dictionaries";

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

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function LaunchSteps({ t }: Props) {
  const STEPS_DATA: StepItem[] = [
    {
      id: 1,
      stepNumber: 1,
      title: t.for_business.steps.step_1.title,
      description: t.for_business.steps.step_1.desc,
      imageSrc: step_1,
      imageAlt:
        "Dashboard view showing options to scan voucher or add new service",
      borderColor: "border-[#14B8A6]",
      badgeBg: "bg-gradient-to-r from-[#14B8A6] to-[#0D9488]",
      shadowClass:
        "shadow-[0_10px_25px_-5px_rgba(20,184,166,0.15),0_8px_16px_-6px_rgba(20,184,166,0.12)]",
    },
    {
      id: 2,
      stepNumber: 2,
      title: t.for_business.steps.step_2.title,
      description: t.for_business.steps.step_2.desc,
      imageSrc: step_2,
      imageAlt: "Notification preview showing user purchase status",
      borderColor: "border-[#C084FC]",
      badgeBg: "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]",
      shadowClass:
        "shadow-[0_10px_25px_-5px_rgba(139,92,246,0.15),0_8px_16px_-6px_rgba(139,92,246,0.12)]",
    },
    {
      id: 3,
      stepNumber: 3,
      title: t.for_business.steps.step_3.title,
      description: t.for_business.steps.step_3.desc,
      imageSrc: step_3,
      imageAlt: "Smartphone screen scanning a dynamic QR code",
      borderColor: "border-[#4ADE80]",
      badgeBg: "bg-gradient-to-r from-[#16A34A] to-[#15803D]",
      shadowClass:
        "shadow-[0_10px_25px_-5px_rgba(22,163,74,0.15),0_8px_16px_-6px_rgba(22,163,74,0.12)]",
    },
  ];

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-4 w-full p-6">
        {STEPS_DATA.map((step, index) => (
          <div key={step.id} className="relative lg:w-[80%]  m-auto">
            {/* Main Step Card Container with themed shadow styling */}
            <div
              className={`relative bg-white border-2 ${step.borderColor} ${step.shadowClass} rounded-4xl pt-12 pb-10 flex flex-col items-center justify-between text-center h-full`}
            >
              {/* Overlapping Top-Left Badge */}
              <div
                className={`absolute -top-5 -left-5 h-11 w-11 flex items-center justify-center rounded-full ${step.badgeBg} text-lg font-bold text-white shadow-md border-4 border-white`}
              >
                {step.stepNumber}
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[336px] flex items-center justify-center">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-3 mt-6 w-full px-6">
                <h3 className="text-2xl font-semibold text-[#111827]">
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
