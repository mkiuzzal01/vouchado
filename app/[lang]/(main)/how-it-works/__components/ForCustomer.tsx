import Image from "next/image";
import Container from "@/app/components/shared/Container";
import bgImage from "@/public/section-headers/Hero Section (6).png";
import CheckIcon from "@/app/components/icons/CheckIcon";
import ArrowUp from "@/app/components/icons/ArrowUp";
import batch from "@/public/business/Frame 2147240691 (2).png";
import homeIcon from "@/public/business/Frame 2147240661 (2).png";
import ForCustomerForm from "./ForCustomerForm";

interface Props {
  lang: string;
}

export default function ForCustomer({ lang }: Props) {
  const features = [
    "The best deals don't last forever.",
    "Be among the first to grab the hottest offers in your city.",
    "Discover new places, save money, and enjoy exclusive deals.",
    "And have FUN!",
  ];

  return (
    <Container>
      <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-black/5 min-h-[1100px] md:min-h-[780px] px-10 md:px-[60px] xl:px-[100px] py-10 lg:py-[60px] xl:py-[120px] mb-[164px] space-y-4">
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

        <div className="flex flex-col gap-30">
          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="relative w-full lg:w-[45%] flex flex-col gap-6">
              <Image
                src={homeIcon}
                alt="Customer accounts"
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
              <div className="bg-white rounded-4xl py-[32px] lg:px-[48px]">
                <ForCustomerForm lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
