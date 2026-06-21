interface ReviewItem {
  id: string | number;
  name: string;
  comment: string;
  date: string;
}

interface Props {
  reviews: ReviewItem[];
}

export default function ViewAllReview({ reviews }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-amber-500">★★★★★</span>

              <span className="text-gray-400">{review.date}</span>
            </div>

            <h5 className="text-sm font-semibold text-gray-900">
              {review.name}
            </h5>

            <p className="text-sm leading-relaxed text-gray-600 line-clamp-4">
              "{review.comment}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
