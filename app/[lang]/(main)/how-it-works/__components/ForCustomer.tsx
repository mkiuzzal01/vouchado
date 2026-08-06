import Image from "next/image";
import Container from "@/app/components/shared/Container";
import bgImage from "@/public/section-headers/Hero Section (6).png";
import CheckIcon from "@/app/components/icons/CheckIcon";
import ArrowUp from "@/app/components/icons/ArrowUp";
import batch from "@/public/business/Frame 2147240691 (2).png";
import homeIcon from "@/public/business/Frame 2147240726.png";
import ForCustomerForm from "./ForCustomerForm";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  lang: string;
}

export default async function ForCustomer({ lang }: Props) {
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  const features = [
    t.how_it_work?.for_customer?.sec_1,
    t.how_it_work?.for_customer?.sec_2,
    t.how_it_work?.for_customer?.sec_3,
    t.how_it_work?.for_customer?.sec_4,
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
            <div className="relative w-full flex-1 flex flex-col gap-6">
              <div className="relative flex flex-row gap-4 items-center">
                <Image
                  src={homeIcon}
                  alt="Customer accounts"
                  width={180}
                  height={180}
                  priority
                />
                <div className="inline-flex font-semibold text-[48px] ">
                  <p className="text-white">
                    {t.how_it_work?.for_customer_left_section?.sec_1}{" "}
                    <span className="bg-gradient-to-r from-[#5ACCD3] to-[#2DAEB6] bg-clip-text text-transparent">
                      {" "}
                      {t.how_it_work?.for_customer_left_section?.sec_2}
                    </span>{" "}
                    {t.how_it_work?.for_customer_left_section?.sec_3}
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white">
                    <div>
                      <CheckIcon size={22} />
                    </div>

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
            <div className="w-full lg:w-[55%] 2xl:max-w-[800px]">
              <div className="bg-white rounded-4xl py-[32px] lg:px-[48px]">
                <ForCustomerForm lang={lang} t={t} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
