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
import LocationIcon from "../icons/LocationIcon";

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
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4 md:right-10 md:top-[10%] lg:left-[60%] lg:top-[10%] xl:top-[18%] z-20 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
            <div className="w-20 h-20 sm:w-40 sm:h-40 md:w-[204px] md:h-[204px] border-2 border-white bg-gradient-to-br from-[#5ACCD3]/80 to-[#2DAEB6]/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 text-center shadow-lg">
              <p className="text-[#FFFFFFA3] text-xs sm:text-sm md:text-base font-semibold leading-tight">
                {t?.home.hero.offer_badge.location_badge}
              </p>
              <p className="text-white text-sm sm:text-4xl md:text-[54px] font-bold leading-none my-0.5 md:my-1">
                {t?.home.hero.offer_badge.discount}
              </p>
              <p className="text-[#FFFFFFA3] text-xs sm:text-lg md:text-[27px] font-semibold leading-tight">
                {t?.home.hero.offer_badge.daily_deals}
              </p>
            </div>
          </div>
          <div className="relative grow flex items-center">
            {/* Text Content */}
            <div className="relative z-10 w-full max-w-2xl md:max-w-md lg:max-w-lg xl:max-w-5xl lg:left-[18px] space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4 xl:space-y-3 text-center md:text-left mt-20">
              {/* Badge */}
              <div className="inline-flex gap-2 items-center rounded-full bg-[#31BFC8]/40  px-4 py-1.5 md:px-3 md:py-1 lg:px-4 lg:py-2 text-[10px] sm:text-xs md:text-[10px] lg:text-[11px] xl:text-xs font-semibold tracking-widest text-white backdrop-blur-md shadow-sm">
                <LocationIcon /> {t?.home?.hero?.badge}
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
                {t?.home?.hero?.sub_title_1}
                <span className="text-[#31BFC8] drop-shadow-sm">
                  {t?.home?.hero?.sub_title_2}
                </span>{" "}
                {t?.home?.hero?.sub_title_3}
              </h4>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-sm lg:text-base xl:text-lg font-normal text-[#FFFFFFCC] max-w-xl mx-auto md:mx-0">
                {t?.home?.hero?.desc_1}
                <span className="text-[#31BFC8] drop-shadow-sm">
                  {t?.home?.hero?.desc_2}
                </span>
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
