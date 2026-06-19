"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ItemPhotosProps {
  images: string[];
}

export default function ItemPhotos({ images }: ItemPhotosProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="space-y-3">
      {/* Main Slider */}
      <Swiper
        spaceBetween={10}
        navigation
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="rounded-2xl overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <Image
                src={image}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Thumbs]}
        watchSlidesProgress
        freeMode
        spaceBetween={12}
        slidesPerView={4}
        className="thumb-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="relative aspect-4/3 rounded-xl overflow-hidden border-2 border-transparent cursor-pointer">
              <Image
                src={image}
                alt="Thumbnail"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
