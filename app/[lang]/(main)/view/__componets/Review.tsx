import ModalContainer from "@/app/components/shared/ModalContainer";
import { useState } from "react";
import ViewAllReview from "./ViewAllReview";

interface ReviewItem {
  id: string | number;
  name: string;
  date: string;
  comment: string;
  rating?: number;
}

interface Props {
  rating: number;
  reviews: ReviewItem[];
  totalReviews?: number;
}

export default function Review({ rating, reviews, totalReviews = 0 }: Props) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className="space-y-6 pt-8 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg lg:text-2xl font-bold text-gray-900">
            Customer Reviews
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span className="text-gray-900 font-extrabold text-sm">
              {rating.toFixed(1)}
            </span>

            <span className="text-amber-500">★★★★★</span>

            <span>Based on {totalReviews}+ reviews</span>
          </div>
        </div>

        <button
          onClick={() => setShowAllReviews(true)}
          className="rounded-full cursor-pointer border border-gray-200 px-4 py-1.5 text-xs font-bold text-[#0E6A70] hover:bg-gray-50 transition"
        >
          View all reviews
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between my-2 rounded-2xl shadow-md bg-[#FAFAFA]/60 p-4 transition hover:shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="text-amber-500 font-medium">★★★★★</span>
                <span>{rev.date}</span>
              </div>

              <h5 className="text-xl font-bold text-gray-900">{rev.name}</h5>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                "{rev.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
      <ModalContainer
        title="All Reviews"
        isOpen={showAllReviews}
        onClose={() => setShowAllReviews(false)}
      >
        <ViewAllReview reviews={reviews} />
      </ModalContainer>
    </div>
  );
}
