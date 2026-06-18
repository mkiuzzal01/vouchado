"use client";

import CounterItem from "@/app/components/shared/CounterItem";
import { MapPin, Zap, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import product_cart from "@/public/services/service_details.png";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/redux/features/cart/cart.slice";
import ItemCounter from "./ItemCounter";

export interface CartItem {
  id: string;
  title: string;
  tagline: string;
  quantity: number;
  rating: number;
  reviewsCount: number;
  location: string;
  priceOriginal: number;
  discountBadge: number;
}

interface ItemCardProps {
  item: CartItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
      {/* IMAGE */}
      <div className="w-full md:w-44 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          width={500}
          height={500}
          src={product_cart}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>

          {item.tagline && (
            <p className="text-xs text-gray-500 mt-1">{item.tagline}</p>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <MapPin size={14} />
            <span className="line-clamp-1">{item.location}</span>
          </div>
        </div>

        {/* BADGES */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Zap size={14} />
            Instant Confirmation
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw size={14} />
            Free Cancellation
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex md:flex-col justify-between items-end md:items-end w-full md:w-auto">
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          <X size={18} />
        </Button>

        <ItemCounter value={item.quantity} onChange={() => {}} />
        {/* PRICE */}
        <div className="text-right">
          <span className="text-xl font-bold text-[#00b2b2]">
            €{item.priceOriginal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
