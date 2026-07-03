"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Adventures from "../icons/Avantures";
import Beauty from "../icons/Beauty";
import Cultural from "../icons/Caltural";
import Creative from "../icons/Creative";
import Eat from "../icons/Eat";
import Kids from "../icons/Kids";
import Container from "../shared/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import Link from "next/link";
import Fashion from "../icons/Fashion";

export default function ExploreCategories() {
  const categories = [
    {
      icon: <Adventures size={64} />,
      name: "Adventure & Sports",
      tranding: true,
    },
    {
      icon: <Eat size={64} />,
      name: "Eat and Drink",
      tranding: false,
    },
    {
      icon: <Kids size={64} />,
      name: "Family & Kids",
      tranding: false,
    },
    {
      icon: <Beauty size={64} />,
      name: "Beauty & Wellness",
      tranding: false,
    },
    {
      icon: <Creative size={64} />,
      name: "Creative",
      tranding: false,
    },
    {
      icon: <Cultural size={64} />,
      name: "Hotel & Culture",
      tranding: false,
    },
    {
      icon: <Fashion />,
      name: "Fashion",
      tranding: false,
    },
  ];

  return (
    <Container>
      <div className="flex items-center justify-between">
        <SectionHeader title="Explore Categories" />

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button className="category-prev flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:bg-gray-50">
            <ChevronLeft size={24} />
          </button>

          <button className="category-next flex h-10 w-10 items-center justify-center rounded-full border bg-white hover:bg-gray-50">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link href={`/category/${category.name}`} className="block">
              <div className="relative flex justify-between h-[176px] py-[32px] px-2 cursor-pointer flex-col items-center gap-3 rounded-2xl bg-white border transition  hover:shadow-xl hover:-translate-y-1">
                {category.tranding && (
                  <span className="absolute top-4 right-4 bg-[#FF4141] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Hot
                  </span>
                )}

                <div className="flex items-center justify-center">
                  {category.icon}
                </div>

                <p className="text-sm md:text-xs xl:text-lg font-bold text-center">
                  {category.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
