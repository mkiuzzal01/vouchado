import BusineesInfoForm from "@/app/components/forms/BusineesInfoForm";
import Image from "next/image";
import Container from "@/app/components/shared/Container";
import bgImage from "@/public/section-headers/Hero Section (6).png";
import CheckIcon from "@/app/components/icons/CheckIcon";
import homeIcon from "@/public/for-business/Frame 2147240661.png";
import ArrowUp from "@/app/components/icons/ArrowUp";
import batch from "@/public/for-business/Frame 2147240691.png";

interface Props {
  lang: string;
}

export default function CreateBusiness({ lang }: Props) {
  const features = [
    "Get Free of fee (provision) for 6 months",
    "get bootsed for 12 month",
    "get featured in our newsletter",
    "no risk - only win",
  ];

  return (
    <Container>
      <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-black/5 min-h-[1100px] md:min-h-[780px]">
        {/* Background */}
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <Image
          src={batch}
          alt="batch"
          width={211}
          height={58}
          priority
          className="relative pb-10 lg:pb-0 lg:absolute left-10 top-10"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-5 py-8 sm:px-8 sm:py-12 md:px-12 lg:px-20 lg:py-24">
          {/* Left */}
          <div className="relative w-full lg:w-[45%] flex flex-col gap-6">
            <Image
              src={homeIcon}
              alt="Grow your business"
              className="w-72 lg:w-auto h-auto"
              priority
            />

            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white">
                  <CheckIcon size={22} />

                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="absolute -bottom-10 lg:-bottom-20 right-5 lg:right-10">
              <div className="w-full">
                <ArrowUp height={59} width={332} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-[55%] xl:max-w-[800px]">
            <div className="bg-white rounded-4xl py-[32px] px-5 lg:px-[48px]">
              <BusineesInfoForm lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
