import Image from "next/image";
import Container from "@/app/components/shared/Container";
import Link from "next/link";
import readyGrowIcon from "@/public/business/Frame 2147240726.png";
import bg_image from "@/public/section-headers/Hero Section (5).png";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  lang: string;
}

export default function PromoReadyGrow({ lang, t }: Props) {
  return (
    <Container className="py-8">
      {/* Banner Container matching image_ae98e0.png shape */}
      <div className="relative rounded-3xl min-h-[328px] overflow-hidden px-6 py-10 sm:px-10 sm:py-12 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 ">
        {/* Banner Background Asset Layer */}
        <Image
          src={bg_image}
          alt="Background pattern"
          fill
          priority
          className="object-cover"
        />

        {/* LEFT SIDE: Icon + Typography Wrapper */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 max-w-6xl w-full">
          {/* Storefront Icon */}
          <div className="shrink-0 select-none pointer-events-none">
            <Image
              src={readyGrowIcon}
              alt="Vouchado grow your business storefront icon"
              width={120}
              height={120}
              quality={95}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px] object-contain"
            />
          </div>

          {/* Typography */}
          <div className="space-y-2.5">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {t.for_business.promotional_banner.title}
            </h2>
            <p className="text-white/85 text-xl lg:text-2xl font-normal ">
              {t.for_business.promotional_banner.description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Action Buttons Block */}
        <div className="relative z-10 flex flex-col gap-3.5 w-full sm:w-auto shrink-0 ">
          {/* Primary Action Button */}
          <Link href={`/${lang}/provider-login`} className="w-full sm:w-auto">
            <button className="w-full bg-[#49c2c9] hover:bg-[#3db3ba] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full active:scale-[0.99] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group whitespace-nowrap">
              <span>{t.for_business.promotional_banner.cta_primary}</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </Link>

          {/* Secondary Action Button */}
          <Link
            href={`/${lang}/contact`}
            className="w-full sm:w-auto border border-white text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-white/10 active:scale-[0.99] transition-all duration-200 whitespace-nowrap text-center block"
          >
            {t.for_business.promotional_banner.cta_secondary}
          </Link>
        </div>
      </div>
    </Container>
  );
}
