import { productItems } from "@/redux/items/ItemData";
import ProductCard from "@/app/components/cards/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

interface Props {
  lang: string;
}

export default function SimilarItem({ lang }: Props) {
  return (
    <div className="py-6 md:py-10">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-6">
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
        {productItems?.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard
              id={item.id}
              lang={lang}
              imageUrl={item.imageUrl}
              category={item.category}
              title={item.title}
              rating={item.rating}
              location={item.location}
              currentPrice={item.currentPrice}
              originalPrice={item.originalPrice}
              currencySymbol={""}
              discountPercentage={item.discountPercentage}
              distance={item.distance}
              endsIn={item.endsIn}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
