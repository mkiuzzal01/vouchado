"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Trash2, CheckSquare } from "lucide-react";
import ItemCard from "./ItemCard";
import { clearCart, toggleSelectAll } from "@/redux/features/cart/cart.slice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface Props {
  lang: string;
}

export default function YourItems({ lang }: Props) {
  const { items } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const selectedCount = items?.filter((item) => item?.isSelected)?.length || 0;
  const isAllSelected =
    items?.length > 0 && items?.every((item) => item?.isSelected);

  const onContinueShopping = () => {
    router.back();
  };

  if (!items?.length) {
    return (
      <NotFoundData
        title="Your cart is empty"
        description="Looks like you haven't added any items to your cart yet."
      />
    );
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-2xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b border-slate-100 gap-3">
          <h2 className="text-xl font-bold text-slate-900">
            Your Items ({items?.length})
          </h2>

          <div className="flex items-center gap-3">
            {selectedCount === 0 && (
              <button
                type="button"
                onClick={() => dispatch(toggleSelectAll(true))}
                className="text-xs font-semibold text-[#31BFC8] hover:underline cursor-pointer"
              >
                Select all items
              </button>
            )}

            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Checkbox
                id="select-all"
                checked={isAllSelected}
                onCheckedChange={(checked) =>
                  dispatch(toggleSelectAll(!!checked))
                }
              />
              <label
                htmlFor="select-all"
                className="text-sm font-semibold text-slate-700 cursor-pointer select-none"
              >
                Select all ({selectedCount}/{items.length})
              </label>
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4 mb-6">
          {items?.map((item) => (
            <ItemCard key={item?.id} item={item} lang={lang} />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={onContinueShopping}
            className="w-full sm:w-auto rounded-full border-2 bg-transparent border-[#31BFC8] text-[#31BFC8] hover:border-[#31BFC8] hover:bg-[#31BFC8]/10 hover:text-[#31BFC8] font-semibold p-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>

          <Button
            variant="ghost"
            onClick={() => dispatch(clearCart())}
            className="w-full sm:w-auto text-slate-500 hover:text-red-600 hover:bg-red-50 font-medium px-4 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
