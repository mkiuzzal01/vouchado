"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { toast } from "react-toastify";
import { toggleWishlist } from "@/redux/features/wishlist/wishlinst.slice";
import Discount from "../icons/Discount";
import Start from "../icons/Start";

export interface TrendingProductCardProps {
  lang: "en" | "de";
  productId: string;
  imageUrl: string;
  category: string;
  title: string;
  rating: number;
  purchasedText?: string;
  currentPrice: number;
  originalPrice?: number;
  currencySymbol?: string;
  discountPercentage?: number;
}

export default function TrendingProductCard({
  lang,
  productId,
  imageUrl,
  category,
  title,
  rating,
  purchasedText,
  currentPrice,
  originalPrice,
  currencySymbol = "€",
  discountPercentage,
}: TrendingProductCardProps) {
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const product = useMemo(
    () => ({
      id: productId,
      imageUrl,
      category,
      title,
      rating,
      currentPrice,
      originalPrice,
      currencySymbol,
      discountPercentage,
    }),
    [
      productId,
      imageUrl,
      category,
      title,
      rating,
      currentPrice,
      originalPrice,
      currencySymbol,
      discountPercentage,
    ],
  );

  // Check wishlist state
  const isWishlisted = useMemo(
    () => wishlistItems.some((item) => item.id === productId),
    [wishlistItems, productId],
  );

  const handleWishlist = () => {
    dispatch(
      toggleWishlist({
        ...product,
        location: "not provided",
        endsIn: "not provided",
        distance: "not provided",
      }),
    );

    if (isWishlisted) {
      toast.warn("Added to wishlist");
    } else {
      toast.success("Removed from wishlist");
    }
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-white border border-gray-100  overflow-hidden">
      {/* Image Section */}
      <div className="relative h-44 sm:h-[220px] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Discount */}
        {discountPercentage && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1ec6cc] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1">
            <Discount color="#fff" /> -{discountPercentage}%
          </div>
        )}

        {/* Favorite */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm transition-all"
        >
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              isWishlisted
                ? "text-[#1ec6cc]"
                : "text-gray-600 hover:text-[#1ec6cc]"
            }`}
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Category */}
        <div className="absolute -bottom-3 left-3 sm:left-4 bg-[#eef0f2] text-gray-700 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-white shadow-sm">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-5 pt-6 sm:pt-8 pb-4 sm:pb-5">
        <Link href={`/${lang}/view/${productId}`}>
          <h3
            className="text-sm md:text-md font-semibold text-gray-800 line-clamp-2 mb-3 sm:mb-4 hover:text-primary transition-colors"
            title={title}
          >
            {title}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
          <div className="flex items-center gap-1 text-sm sm:text-base font-normal text-gray-800">
            <Start /> {rating.toFixed(1)}
          </div>

          {purchasedText && (
            <span className="text-xs sm:text-sm text-slate-500 truncate">
              {purchasedText}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm md:text-lg font-black text-slate-900">
            {currencySymbol} {currentPrice.toFixed(2)}
          </span>

          {originalPrice && (
            <span className="text-sm sm:text-base text-slate-400 line-through">
              {currencySymbol} {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
