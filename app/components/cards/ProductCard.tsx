"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { toggleWishlist } from "@/redux/features/wishlist/wishlinst.slice";

import Location from "../icons/Location";
import PinLocation from "../icons/PinLocation";
import Discount from "../icons/Discount";
import Start from "../icons/Start";
import { MapPin } from "lucide-react";

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

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevents clicking the wishlist icon from navigating to the view page
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.warn("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  return (
    <Link
      href={`/${lang}/view/${id}`}
      className="block w-full rounded-2xl bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full md:aspect-4/3 aspect-16/10 md:h-[200px]">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={224}
          className="w-full h-full object-cover"
        />

        {/* Discount */}
        {discountPercentage && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1ec6cc] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1">
            <Discount color="#fff" /> -{discountPercentage}%
          </div>
        )}

        {/* Top Right Actions */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-2 z-10">
          {distance && (
            <div className="flex justify-center items-center gap-1 bg-white/80 text-gray-800 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-sm">
              <PinLocation />
              <div>{distance}</div>
            </div>
          )}

          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={handleFavoriteClick}
            className="bg-white/80 p-1.5 rounded-full shadow-sm transition-all duration-200 hover:bg-white"
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
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="text-sm md:text-[20px] font-medium text-gray-900 hover:text-[#1ec6cc] leading-snug mb-2 sm:mb-3 line-clamp-2 transition-colors">
          {title}
        </h3>

        {/* Rating + Location */}
        <div className="flex items-center text-[16px] sm:text-sm text-gray-500 mb-3 sm:mb-5">
          <div className="flex items-center gap-1 text-[16px] font-semibold text-gray-800">
            <Start size={20} /> {rating.toFixed(1)}
          </div>

          <div className="w-px h-3 bg-gray-300 mx-2 sm:mx-3" />

          <div className="flex text-[16px] items-center gap-1 truncate">
            <MapPin size={20} />
            <span className="text-[#637381]">{location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-sm md:text-2xl font-bold text-[#212B36]">
              {currencySymbol}
              {currentPrice.toFixed(2)}
            </span>

            {originalPrice && (
              <span className="text-xs md:text-[16px] text-[#919EAB] line-through">
                {currencySymbol}
                {originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {endsIn && (
            <div className="flex justify-end">
              <div className="bg-[#fff0f0] text-[#FF4842] text-[10px] sm:text-[13px] px-3 py-1 rounded-sm">
                Ends in {endsIn}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
