"use client";

import { MapPin, Zap, RefreshCw, X } from "lucide-react";
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

interface ItemCardProps {
  item: ICartItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
      {/* 1. Left Selection Checkbox */}
      <div className="flex items-center h-full self-start md:self-center pr-1">
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

      {/* 3. Media Image Display */}
      <div className="w-full md:w-44 h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
        <Image
          width={400}
          height={300}
          src={product_cart}
          alt={item.title}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>

      {/* 4. Core Details Context Section */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 pr-6 tracking-tight line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {item.tagline && (
            <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
              {item.tagline}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            <span className="line-clamp-1 text-slate-600">{item.location}</span>
          </div>
        </div>

        {/* Informative Value Badges */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-slate-500 mt-4 md:mt-0">
          <div className="flex items-center gap-1 text-slate-600">
            <Zap size={13} className="text-cyan-500" />
            Instant Confirmation
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <RefreshCw size={13} className="text-emerald-500" />
            Free Cancellation
          </div>
        </div>
      </div>

      {/* 5. Pricing & Quantity Adjustments Row */}
      <div className="flex md:flex-col justify-between items-center md:items-end w-full md:w-auto self-end md:self-stretch pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
        {/* Quantity Counter Wrapper */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-red-600 hover:text-red-500 hover:bg-red-50 rounded-full w-8 h-8 transition-colors"
        >
          <X size={16} />
        </Button>
        <div className="order-1 md:order-2">
          <ItemCounter
            value={item.selectedQuantity}
            max={item.totalQuantity}
            min={1}
            onChange={(newQty) =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: newQty,
                }),
              )
            }
          />
        </div>

        {/* Item Interactive Subtotal Pricing */}
        <div className="text-right order-2 md:order-1 mb-0 md:mb-4">
          <span className="text-2xl font-black text-cyan-600">
            €{(item.currentPrice * item.selectedQuantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
