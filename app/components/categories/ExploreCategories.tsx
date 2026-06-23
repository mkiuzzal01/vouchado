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

export default function ExploreCategories() {
  const categories = [
    {
      icon: <Adventures size={70} />,
      name: "Adventure & Sports",
    },
    {
      icon: <Eat size={70} />,
      name: "Eat and Drink",
    },
    {
      icon: <Kids size={70} />,
      name: "Family & Kids",
    },
    {
      icon: <Beauty size={70} />,
      name: "Beauty & Wellness",
    },
    {
      icon: <Creative size={70} />,
      name: "Creative",
    },
    {
      icon: <Cultural size={70} />,
      name: "Hotel & Culture",
    },
    {
      icon: <Beauty size={70} />,
      name: "Beauty & Wellness",
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
            <div className="flex h-42 cursor-pointer flex-col items-center gap-3 rounded-2xl bg-white p-5 my-2 border transition">
              <div className="flex items-center justify-center">
                {category.icon}
              </div>

              <p className="text-sm font-bold">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
