"use client";
import Container from "../shared/Container";
import Stats from "../utils/Stats";
import Verified from "../icons/Verified";
import CallSupport from "../icons/CallSupport";
import Payment from "../icons/Payment";
import hero from "@/public/hero/discount.png";
import Image from "next/image";
import HeroSearch from "../forms/quires/HeroSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import bannerImage from "@/public/hero/hero.png";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  banner: any;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function Hero({ banner, t }: Props) {
  const featuresData = [
    {
      title: t?.home?.hero?.features?.verified_deals,
      icon: <Verified size={20} />,
    },
    {
      title: t?.home?.hero?.features?.secure_checkout,
      icon: <Payment size={20} />,
    },
    {
      title: t?.home?.hero?.features?.support,
      icon: <CallSupport size={20} />,
    },
  ];

  return (
    <div className="w-full xl:max-w-[90%] 2xl:max-w-[1856px] mx-auto mt-4 sm:mt-6">
      <div className="relative rounded-2xl md:rounded-[32px] flex flex-col justify-between shadow-2xl min-h-[859px]">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-[32px] overflow-hidden bg-gray-100">
          {banner?.data && banner.data.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              speed={3000}
              loop={banner.data.length > 1}
              className="w-full h-full"
            >
              {banner.data.map((item: any, index: number) => (
                <SwiperSlide key={item?.id || item?._id || index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={item?.image}
                      alt={item?.title || `Banner ${index + 1}`}
                      fill
                      sizes="100vw"
                      priority={index === 0}
                      className="object-cover object-[80%_center] md:object-top"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* Static fallback image shown before data loads or when data is empty */
            <div className="relative w-full h-full">
              <Image
                src={bannerImage} // Replace with your static image path from public folder
                alt="Default Banner"
                fill
                sizes="100vw"
                priority
                className="object-cover object-[80%_center] md:object-top"
              />
            </div>
          )}
        </div>
        {/* overlay */}
        <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-[32px] overflow-hidden bg-black/20 backdrop-blur-[2px]" />

        <div className="max-w-[1744px] mx-auto px-3.5 sm:px-6 lg:px-4 w-full grow flex flex-col ">
          {/* Offer Badge (Absolute Positioning for perfect responsiveness) */}
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4 md:right-10 md:top-1/10 lg:left-[60%] lg:top-[10%] xl:top-[18%] z-20 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
            <Image
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44 drop-shadow-2xl"
              src={hero}
              alt="70% Off Special Offer"
            />
          </div>

          <div className="relative grow flex items-center">
            {/* Text Content */}
            <div className="relative z-10 w-full max-w-2xl md:max-w-md lg:max-w-lg xl:max-w-5xl lg:left-[18px] space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4 xl:space-y-3 text-center md:text-left mt-20">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-[#BFEBEE1F]  px-4 py-1.5 md:px-3 md:py-1 lg:px-4 lg:py-2 text-[10px] sm:text-xs md:text-[10px] lg:text-[11px] xl:text-xs font-semibold tracking-widest text-white backdrop-blur-md shadow-sm">
                {t?.home?.hero?.badge}
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[88px] font-bold leading-[1.1] text-white drop-shadow-md">
                {t?.home?.hero?.title?.first} <br className="hidden sm:block" />
                <span className="text-[#31BFC8] drop-shadow-sm">
                  {t?.home?.hero?.title?.second}
                </span>{" "}
                {t?.home?.hero?.title?.third}
              </h1>

              {/* Subheading */}
              <h4 className="text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-semibold text-white drop-shadow">
                {t?.home?.hero?.sub_title}
              </h4>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-sm lg:text-base xl:text-lg font-normal text-[#FFFFFFCC] max-w-xl mx-auto md:mx-0">
                {t?.home?.hero?.desc}
              </p>

              <div>
                <div className="w-full mx-auto md:mx-0 md:scale-[0.9] lg:scale-[0.95] xl:scale-100 origin-center md:origin-left">
                  <HeroSearch
                    locationPlaceholder={t?.shared?.search?.search_location}
                    servicePlaceholder={t?.shared?.search?.search_category}
                    buttonText={t?.shared?.search?.search_button}
                  />
                </div>

                {/* Features */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-2 lg:gap-3 mt-4 sm:pt-6 md:pt-3 lg:pt-4 xl:pt-6">
                  {featuresData.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-center gap-2 rounded-full  bg-[#31BFC8]/40  md:bg-[#BFEBEE1F] px-4 py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 text-[10px] sm:text-xs md:text-[10px] lg:text-[11px] xl:text-xs font-medium text-white  [&>svg]:scale-75 lg:[&>svg]:scale-90 xl:[&>svg]:scale-100"
                    >
                      {feature.icon}
                      {feature.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Component - Positioned at the bottom */}
        <Stats t={t} />
      </div>
    </div>
  );
}
