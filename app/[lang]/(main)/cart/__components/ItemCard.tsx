"use client";
import { X } from "lucide-react";
import Image from "next/image";
import product_cart from "@/public/services/service_details.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import {
  removeFromCart,
  toggleSelectItem,
  updateQuantity,
} from "@/redux/features/cart/cart.slice";
import ItemCounter from "./ItemCounter";
import { ICartItem } from "@/redux/features/cart/cart.slice";
import Link from "next/link";
import Instant from "@/app/components/icons/Instant";
import DaysCancellation from "@/app/components/icons/DaysCancellation";
import CartItemLocation from "@/app/components/icons/CartItemLocation";

interface ItemCardProps {
  item: ICartItem;
  lang: string;
}

export default function ItemCard({ item, lang }: ItemCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-5 border border-slate-100 rounded-2xl bg-white group w-full">
      {/* 1. Left Selection Checkbox */}
      <div className="flex items-center h-full self-start md:self-center shrink-0 pt-1 md:pt-0">
        <Checkbox
          id={`select-${item.id}`}
          checked={item.isSelected}
          onCheckedChange={(checked) =>
            dispatch(
              toggleSelectItem({
                id: item.id,
                isSelected: !!checked,
              }),
            )
          }
        />
      </div>

      {/* 2. Media Image Display */}
      <div className="w-full md:w-44 h-36 md:h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
        <Image
          width={400}
          height={300}
          src={item?.thumbnail || product_cart}
          alt={item.title}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>

      {/* 3. Core Details Context Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <Link href={`/${lang}/view/${item?.id}`}>
            <h3 className="text-base md:text-xl lg:text-[32px] font-semibold text-slate-900 hover:text-primary tracking-tight line-clamp-2 leading-snug">
              {item.title}
            </h3>
          </Link>

          {item.tagline && (
            <p className="text-xs md:text-sm lg:text-xl font-medium text-gray-500 mt-1 line-clamp-1">
              {item.tagline}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 font-medium">
            <CartItemLocation />
            <span className="text-base lg:text-xl font-semibold text-gray-600">
              {item.location}
            </span>
          </div>
        </div>

        {/* Informative Value Badges */}
        <div className="flex gap-4 mt-6">
          <div className="text-xl flex items-center gap-1 text-gray-600">
            <Instant size={20} />
            Instant Confirmation
          </div>
          <div className="text-xl flex items-center gap-1 text-gray-600">
            <DaysCancellation size={20} />
            Free Cancellation
          </div>
        </div>
      </div>

      {/* 4. Pricing & Quantity Adjustments Section */}
      <div className="grid grid-cols-2 md:flex flex-row md:flex-col justify-between items-end md:items-end w-full md:w-auto md:self-stretch mt-10 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0 gap-3 md:justify-between">
        {/* Quantity Selector Placement */}
        <div className="order-1">
          <ItemCounter
            value={item?.selectedQuantity}
            max={item?.totalQuantity}
            min={1}
            onChange={(newQty) =>
              dispatch(
                updateQuantity({
                  id: item?.id,
                  quantity: newQty,
                }),
              )
            }
          />
        </div>

        {/* Dynamic Display Price */}
        <div className="order-2 text-right">
          <span className="text-xl md:text-2xl font-black text-[#2BC4CA] block">
            €{(item?.currentPrice * item?.selectedQuantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* 5. Absolute Top-Right Delete Action Button */}
      <div className="absolute top-3 right-3 z-10">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => dispatch(removeFromCart(item?.id))}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full w-7 h-7 transition-colors bg-red-50/50 sm:bg-transparent"
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
}
