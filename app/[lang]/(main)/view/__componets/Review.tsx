import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface ReviewItem {
  id: string | number;
  name: string;
  date: string;
  comment: string;
  rating?: string;
}

interface Props {
  reviews: ReviewItem[];
  reviews_avg_rating: string | null;
  totalReviews?: number;
}

export default function Review({
  reviews,
  reviews_avg_rating,
  totalReviews = 0,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg lg:text-2xl font-bold text-gray-900">
            Customer Reviews
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span className="text-gray-900 font-extrabold text-4xl">
              {reviews_avg_rating}
            </span>

            <span className="text-5xl text-amber-500">★★★★★</span>
          </div>
          <p>Based on {totalReviews || reviews.length} reviews</p>
        </div>
      </div>

      {/* Swiper Slider Wrapper Instead of Grid */}
      <div className="w-full pb-10 review-swiper-container">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {reviews.map((rev) => (
            <SwiperSlide key={rev.id} className="h-auto flex">
              <div className="shadow bg-white my-2 flex flex-col justify-between w-full h-full rounded-2xl border border-gray-100 p-5 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="text-amber-500 font-medium">★★★★★</span>
                    <span>{rev.date}</span>
                  </div>

                  <h5 className="text-lg font-bold text-gray-900">
                    {rev.name}
                  </h5>

                  <p className="text-sm font-normal text-gray-600 line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
