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
  const bannerData = t?.for_business?.promotional_banner;

  return (
    <Container className="py-8">
      {/* Banner Container */}
      <div className="relative rounded-3xl min-h-[328px] overflow-hidden px-6 py-10 sm:px-10 sm:py-12 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Banner Background Image Layer */}
        <Image
          src={bg_image}
          alt="Background pattern"
          fill
          priority
          className="object-cover"
        />

        {/* LEFT SIDE: Icon + Typography */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 max-w-4xl w-full">
          {/* Storefront Icon */}
          <div className="shrink-0 select-none pointer-events-none">
            <Image
              src={readyGrowIcon}
              alt="Vouchado grow your business storefront icon"
              width={120}
              height={120}
              quality={95}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-[120px] md:h-[120px] object-contain"
            />
          </div>

          {/* Typography Block */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {bannerData?.title_1 || ""}{" "}
              <span className="text-[#1ec6cc] block sm:inline">
                {bannerData?.title_2 || ""}
              </span>
              <span className=" block sm:inline">
                {" "}
                {bannerData?.title_3 || ""}
              </span>
            </h2>

            <p className="text-white/90 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
              {bannerData?.desc_1 || ""}{" "}
              <span className="text-[#1ec6cc] font-semibold">
                {bannerData?.desc_highlight_1 || ""}
              </span>{" "}
              {bannerData?.desc_2 || ""}{" "}
              <span className="text-[#1ec6cc] font-semibold">
                {bannerData?.desc_highlight_2 || ""}
              </span>{" "}
              {bannerData?.desc_3 || ""}{" "}
              <span className="text-[#1ec6cc] font-semibold">
                {bannerData?.desc_highlight_3 || ""}
              </span>{" "}
              {bannerData?.desc_4 || ""}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Action Buttons */}
        <div className="relative z-10 flex flex-col gap-3.5 w-full sm:w-auto shrink-0">
          {/* Primary Action Link */}
          <Link
            href={`/${lang}/provider-login`}
            className="w-full sm:w-auto bg-[#1ec6cc] hover:bg-[#19b1b7] text-[#073A3F] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full active:scale-[0.99] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group whitespace-nowrap text-center"
          >
            <span>{bannerData?.cta_primary || "Jetzt Partner werden"}</span>
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
          </Link>

          {/* Secondary Action Link */}
          <Link
            href={`/${lang}/contact`}
            className="w-full sm:w-auto border border-white text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-white/10 active:scale-[0.99] transition-all duration-200 whitespace-nowrap text-center block"
          >
            {bannerData?.cta_secondary || "Mit unserem Team sprechen"}
          </Link>
        </div>
      </div>
    </Container>
  );
}
