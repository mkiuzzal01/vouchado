"use client";
import Image from "next/image";
import Link from "next/link";
import Discount from "../icons/Discount";
import Start from "../icons/Start";

import WishList from "../icons/WishList";
import { toast } from "react-toastify";
import { useCreateWishlistMutation } from "@/redux/features/wishlist/wishlist.api";
import { useRouter } from "next/navigation";

export interface Deal {
  id: number;
  image: string;
  discount_percentage: number;
  category: string;
  title: string;
  slug: string;
  rating: number | null;
  location: string;
  distance: string;
  original_price: string;
  discounted_price: string;
  service_end_at: string;
  purchased_count: number;
}

export interface TrendingProductCardProps {
  lang: "en" | "de";
  product: Deal;
}

export default function TrendingProductCard({
  lang,
  product,
}: TrendingProductCardProps) {
  const router = useRouter();
  const [createWishlist] = useCreateWishlistMutation();

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
      toast.error(error?.data?.message);
    }
  };

  return (
    <Link
      href={`/${lang}/view/${product?.slug}`}
      className="block w-full rounded-2xl sm:rounded-3xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative md:h-[220px] h-48 w-full flex justify-center items-center">
        <Image
          src={product?.image}
          alt={product?.title}
          fill
          className="object-cover"
        />

        {/* Discount */}
        {product?.discount_percentage && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1ec6cc] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1">
            <Discount color="#fff" /> -{product?.discount_percentage}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm transition-all z-10 hover:bg-white"
        >
          <WishList size={20} />
        </button>

        {/* Category */}
        <div className="absolute -bottom-3 left-3 sm:left-4 bg-[#eef0f2] text-gray-700 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-white shadow-sm">
          {product?.category}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-5 pt-6 sm:pt-8 pb-4 sm:pb-5">
        <h3 className="text-sm md:text-xl hover:text-[#1ec6cc] font-medium text-gray-800 line-clamp-2 mb-3 sm:mb-4 transition-colors">
          {product?.title}
        </h3>

        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
          <div className="flex items-center gap-1 font-semibold text-gray-800">
            <Start size={20} /> {product?.rating || 0}
          </div>

          <span className="font-normal text-[#637381] truncate">
            {product?.purchased_count || 0} purchased
          </span>
        </div>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm md:text-xl font-black text-[#212B36]">
            {product?.discounted_price}
          </span>

          {product?.original_price && (
            <span className="text-slate-400 line-through">
              {product?.original_price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
