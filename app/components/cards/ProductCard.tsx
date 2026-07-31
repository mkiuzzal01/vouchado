"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "react-toastify";

import PinLocation from "../icons/PinLocation";
import Discount from "../icons/Discount";
import Start from "../icons/Start";
import WishList from "../icons/WishList";
import CountdownTimer from "../utils/CountdownTimer";
import { IDeals } from "@/redux/types/deals";
import { useCreateWishlistMutation } from "@/redux/features/wishlist/wishlist.api";

interface Props {
  lang: string;
  product: IDeals;
}

export default function ProductCard({ lang, product }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [createWishlist, { isLoading }] = useCreateWishlistMutation();

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await createWishlist({ deal_id: product?.id }).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        router.refresh();
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.error("Please login first to add to wishlist");
        router.push(`/${lang}/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  };

  return (
    <Link
      href={`/${lang}/view/${product?.slug}`}
      className="block rounded-2xl bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-shrink-0 border border-gray-100 group"
    >
      <div className="w-full md:w-[405px] h-full flex flex-col justify-between">
        {/* Image Container */}
        <div className="relative w-full h-[224px]">
          <Image
            src={product?.image || "/placeholder.jpg"}
            alt={product?.title || "Product image"}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {Boolean(product?.discount_percentage) && (
            <div className="absolute top-3 left-3 bg-[#1ec6cc] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10 shadow-sm">
              <Discount color="#fff" /> -{product?.discount_percentage}%
            </div>
          )}

          {/* Top Right Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            {product?.distance !== undefined && product?.distance !== null && (
              <div className="flex justify-center items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                <PinLocation />
                <span>{Number(product?.distance).toFixed(1)} km</span>
              </div>
            )}

            <button
              onClick={handleFavoriteClick}
              type="button"
              disabled={isLoading}
              aria-label="Add to wishlist"
              className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm transition-all duration-200 hover:bg-white hover:scale-105 text-gray-700 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin size-5 text-[#1ec6cc]" />
              ) : (
                <WishList size={20} />
              )}
            </button>
          </div>

          {/* Category Badge */}
          {product?.category && (
            <div className="absolute -bottom-3 left-4 bg-[#eef0f2] text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-white shadow-sm z-10 truncate max-w-[80%]">
              {product?.category}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 pt-7 pb-5 flex flex-col justify-between gap-4">
          {/* Title */}
          <h3 className="text-lg md:text-[20px] font-semibold text-gray-900 group-hover:text-[#1ec6cc] leading-snug line-clamp-2 transition-colors">
            {product?.title}
          </h3>

          {/* Rating + Location */}
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex items-center gap-1 font-semibold text-gray-800 text-base shrink-0">
              <Start size={18} /> {product?.rating || "0.0"}
            </div>

            <div className="w-px h-3.5 bg-gray-300 mx-3 shrink-0" />

            <div className="flex items-center gap-1 truncate text-base min-w-0">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <span className="text-[#637381] truncate">
                {product?.location || "N/A"}
              </span>
            </div>
          </div>

          {/* Price & Countdown Timer */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex items-baseline gap-2 truncate">
              <span className="text-2xl font-bold text-[#212B36]">
                €{product?.discounted_price}
              </span>

              {product?.original_price && (
                <span className="text-sm text-[#919EAB] line-through">
                  €{product?.original_price}
                </span>
              )}
            </div>

            {product?.service_end_at && (
              <div className="flex justify-end shrink-0">
                <CountdownTimer endDate={product?.service_end_at} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
