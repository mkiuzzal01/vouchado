"use client";

import Image from "next/image";
import Link from "next/link";
import PinLocation from "../icons/PinLocation";
import Discount from "../icons/Discount";
import Start from "../icons/Start";
import { Loader2, MapPin } from "lucide-react";
import WishList from "../icons/WishList";
import CountdownTimer from "../utils/CountdownTimer";
import { IDeals } from "@/redux/types/deals";
import { useCreateWishlistMutation } from "@/redux/features/wishlist/wishlist.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  lang: string;
  product: IDeals;
}

export default function ProductCard({ lang, product }: Props) {
  const router = useRouter();
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
        toast.error("Login first to add to wishlist");
        router.push(`/${lang}/login`);
      }
    }
  };

  return (
    <Link
      href={`/${lang}/view/${product?.slug}`}
      className="block w-full rounded-2xl bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full md:aspect-4/3 aspect-16/10 md:h-[200px]">
        <Image
          src={product?.image || "placeholder.jpg"}
          alt={product?.title}
          width={500}
          height={224}
          className="w-full h-full object-cover"
        />

        {/* Discount */}
        {product?.discount_percentage && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1ec6cc] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1">
            <Discount color="#fff" /> -{product?.discount_percentage}%
          </div>
        )}

        {/* Top Right Actions */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-2 z-10">
          {product?.distance && (
            <div className="flex justify-center items-center gap-1 bg-white/80 text-gray-800 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-sm">
              <PinLocation />
              <div>{product?.distance}</div>
            </div>
          )}

          <button
            onClick={handleFavoriteClick}
            type="button"
            disabled={isLoading}
            className="bg-white/80 p-1.5 rounded-full shadow-sm transition-all duration-200 hover:bg-white"
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-5" />
            ) : (
              <WishList size={20} />
            )}
          </button>
        </div>

        {/* Category */}
        <div className="absolute -bottom-3 left-3 sm:left-4 bg-[#eef0f2] text-gray-600 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-full border border-white">
          {product?.category}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="text-sm md:text-[20px] font-medium text-gray-900 hover:text-[#1ec6cc] leading-snug mb-2 sm:mb-3 line-clamp-2 transition-colors">
          {product?.title}
        </h3>

        {/* Rating + Location */}
        <div className="flex items-center text-[16px] sm:text-sm text-gray-500 mb-3 sm:mb-5">
          <div className="flex items-center gap-1 text-[16px] font-semibold text-gray-800">
            <Start size={20} /> {product?.rating}
          </div>

          <div className="w-px h-3 bg-gray-300 mx-2 sm:mx-3" />

          <div className="flex text-[16px] items-center gap-1 truncate">
            <MapPin size={20} />
            <span className="text-[#637381]">{product?.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-sm md:text-2xl font-bold text-[#212B36]">
              € {product?.discounted_price}
            </span>

            {product?.original_price && (
              <span className="text-xs md:text-[16px] text-[#919EAB] line-through">
                € {product?.original_price}
              </span>
            )}
          </div>

          {product?.service_end_at && (
            <div className="flex justify-end">
              <CountdownTimer endDate={product?.service_end_at} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
