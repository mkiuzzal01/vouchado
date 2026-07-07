import ProductCard from "@/app/components/cards/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

interface Props {
  lang: string;
  similar_deals?: any;
}

export default function SimilarItem({ lang, similar_deals }: Props) {
  return (
    <div className="py-6 md:py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Similar Experiences
      </h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        spaceBetween={16}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {similar_deals?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <ProductCard lang={lang} product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
