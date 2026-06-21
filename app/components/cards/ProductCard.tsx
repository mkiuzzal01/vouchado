"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { toggleWishlist } from "@/redux/features/wishlist/wishlinst.slice";

import Location from "../icons/Location";

export interface ProductCardProps {
  id: string;
  lang?: string;
  imageUrl: string;
  category: string;
  title: string;
  rating: number;
  location: string;
  currentPrice: number;
  originalPrice?: number;
  currencySymbol?: string;
  discountPercentage?: number;
  distance?: string;
  endsIn?: string;
}

export default function ProductCard({
  id,
  lang,
  imageUrl,
  category,
  title,
  rating,
  location,
  currentPrice,
  originalPrice,
  currencySymbol = "€",
  discountPercentage,
  distance,
  endsIn,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const product = useMemo(
    () => ({
      id,
      imageUrl,
      category,
      title,
      rating,
      location,
      currentPrice,
      originalPrice,
      currencySymbol,
      discountPercentage,
      distance,
      endsIn,
    }),
    [
      id,
      imageUrl,
      category,
      title,
      rating,
      location,
      currentPrice,
      originalPrice,
      currencySymbol,
      discountPercentage,
      distance,
      endsIn,
    ],
  );

  const isWishlisted = useMemo(
    () => wishlistItems.some((item) => item.id === id),
    [wishlistItems, id],
  );

  const handleFavoriteClick = () => {
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.warn("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden font-sans">
      {/* Image */}
      <div className="relative w-full md:aspect-4/3 aspect-16/10 md:h-[200px]">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />

        {/* Discount */}
        {discountPercentage && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1ec6cc] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1">
            -{discountPercentage}%
          </div>
        )}

        {/* Top Right */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-2">
          {distance && (
            <div className="bg-white/80 text-gray-800 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-sm">
              {distance}
            </div>
          )}

          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={handleFavoriteClick}
            className="bg-white/80 p-1.5 rounded-full shadow-sm transition-all duration-200"
          >
            <svg
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
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
        </div>

        {/* Category */}
        <div className="absolute -bottom-3 left-3 sm:left-4 bg-[#eef0f2] text-gray-600 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-full border border-white">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 pt-6 sm:pt-7">
        {/* Title */}
        <Link href={`/${lang}/view/${id}`}>
          <h3 className="text-sm sm:text-[17px] font-semibold text-gray-900 leading-snug mb-2 sm:mb-3 line-clamp-2 hover:text-[#1ec6cc] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Rating + Location */}
        <div className="flex items-center text-[11px] sm:text-sm text-gray-500 mb-3 sm:mb-5">
          <div className="flex items-center gap-1 font-bold text-gray-800">
            ⭐ {rating.toFixed(1)}
          </div>

          <div className="w-px h-3 bg-gray-300 mx-2 sm:mx-3" />

          <div className="flex items-center gap-1 truncate">
            <Location size={18} color="#d1d5dc " />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-sm md:text-lg font-bold text-gray-900">
              {currencySymbol}
              {currentPrice.toFixed(2)}
            </span>

            {originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {currencySymbol}
                {originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {endsIn && (
            <div className="bg-[#fff0f0] text-[#ff6b6b] text-[10px] sm:text-[13px] px-2 py-1 rounded-md">
              {endsIn}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
