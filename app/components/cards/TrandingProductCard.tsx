import Image from "next/image";

export interface TrendingProductCardProps {
  imageUrl: string;
  category: string;
  title: string;
  rating: number;
  purchasedText?: string;
  currentPrice: number;
  originalPrice?: number;
  currencySymbol?: string;
  discountPercentage?: number;
  onFavoriteClick?: () => void;
}

export default function TrendingProductCard({
  imageUrl,
  category,
  title,
  rating,
  purchasedText,
  currentPrice,
  originalPrice,
  currencySymbol = "€",
  discountPercentage,
  onFavoriteClick,
}: TrendingProductCardProps) {
  return (
    <div className="w-full max-w-[360px] rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden font-sans">
      {/* Image Section */}
      <div className="relative h-[220px] w-full">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />

        {/* Discount Tag */}
        {discountPercentage && (
          <div className="absolute top-4 left-4 bg-[#1ec6cc] text-white text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            -{discountPercentage}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-500 hover:bg-white shadow-sm transition-all"
          aria-label="Add to favorites"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Category Badge */}
        <div className="absolute -bottom-3 left-4 bg-[#eef0f2] text-gray-700 text-xs font-semibold px-4 py-2 rounded-full border border-white shadow-sm">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pt-8 pb-5">
        {/* Title (Single line truncation with ellipsis) */}
        <h3
          className="text-lg font-bold text-gray-800 truncate mb-4"
          title={title}
        >
          {title}
        </h3>

        {/* Rating & Purchased Info Row */}
        <div className="flex items-center justify-between mb-5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-base font-bold text-gray-800">
            <svg
              className="w-5 h-5 text-[#ffb800]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating.toFixed(1)}
          </div>

          {/* Purchased Count */}
          {purchasedText && (
            <span className="text-sm font-medium text-slate-500">
              {purchasedText}
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-black text-slate-900">
            {currencySymbol} {currentPrice.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-base text-slate-400 line-through">
              {currencySymbol} {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
