"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Adventures from "../icons/Avantures";
import Beauty from "../icons/Beauty";
import Cultural from "../icons/Caltural";
import Creative from "../icons/Creative";
import Eat from "../icons/Eat";
import Kids from "../icons/Kids";
import Container from "../shared/Container";

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
      name: "Beauty and Wellness",
    },
    {
      icon: <Creative size={70} />,
      name: "Creative",
    },
    {
      icon: <Cultural size={70} />,
      name: "Hotel and Culture",
    },
  ];

  return (
    <Container>
      <section className="py-8">
        <h2 className="mb-6 text-2xl font-semibold">Explore Categories</h2>

        <Swiper
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
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
              <div className="bg-white p-5 rounded-xl flex flex-col items-center gap-3 text-center cursor-pointer">
                <div className="flex items-center justify-center">
                  {category.icon}
                </div>

                <p className="text-sm font-medium">{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
}
