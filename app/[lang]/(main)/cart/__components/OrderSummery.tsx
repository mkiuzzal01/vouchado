"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import RedeemForm from "@/app/components/forms/RedeemForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import OrderSummeryIcon from "@/app/components/icons/OrderSummery";
import TrustSection from "./TrustSection";
import Coupon from "./Coupon";
import product_cart from "@/public/services/service_details.png";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface Props {
  lang: string;
  t?: any;
}

export default function OrderSummary({ lang, t }: Props) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToCancelation, setAgreedToCancelation] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { user } = useAppSelector((state) => state.auth);
  const {
    items,
    subTotal,
    vatAmount,
    totalPrice,
    couponDiscount,
    vat_percentage,
    redeemPointsDiscount,
    redeemDiscountAmount,
  } = useAppSelector((state) => state.cart);

  const selectedItems = items.filter((item) => item.isSelected);
  const totalItems = selectedItems.reduce(
    (acc, item) => acc + item.selectedQuantity,
    0,
  );

  const handleCheckout = async () => {
    const payload = {
      items: selectedItems.map((item) => ({
        deal_id: item.id,
        quantity: item.selectedQuantity,
        redeem_points: redeemPointsDiscount,
        coupon_code: user?.coupon_code || null,
      })),
    };

    try {
      const res = await createOrder(payload).unwrap();
      if (res?.message) {
        router.push(res?.data?.checkout_url);
      }
    } catch (error: any) {
      console.log(error);

      if (error?.status == 422) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Please login first to checkout");
        router.push(`/${lang}/login?redirect=${window?.location?.pathname}`);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <OrderSummeryIcon />
          <h2 className="text-2xl font-semibold text-gray-800">
            {t?.cart?.order_summary || "Order Summary"}
          </h2>
        </div>

        {/* Selected Items Compact List Preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#2bb3bb]" />
              {t?.cart?.selected_items || "Selected Items"} (
              {selectedItems.length})
            </span>
            {selectedItems.length > 0 && (
              <span className="text-xs font-semibold text-gray-500">
                {totalItems}{" "}
                {totalItems === 1
                  ? t?.cart?.unit || "unit"
                  : t?.cart?.units || "units"}
              </span>
            )}
          </div>

          {selectedItems.length > 0 ? (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {selectedItems.map((item) => {
                const itemPrice =
                  typeof item.currentPrice === "string"
                    ? Number(item.currentPrice.replace(/[^0-9.]/g, ""))
                    : item.currentPrice;
                const unitPrice = isNaN(itemPrice) ? 0 : itemPrice;
                const itemTotal = (unitPrice * item.selectedQuantity).toFixed(
                  2,
                );

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100/80 hover:bg-gray-100/50 transition-colors"
                  >
                    {/* Thumbnail & Info */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white">
                        <Image
                          src={item.thumbnail || product_cart}
                          alt={item.title || "Cart item"}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-800 truncate leading-snug">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
                          {item.selectedQuantity} × €{unitPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Total for item */}
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-gray-900 block">
                        €{itemTotal}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-800 text-xs font-medium text-center">
              {t?.cart?.no_items_selected ||
                "No items selected. Please select items from your cart to proceed."}
            </div>
          )}
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Financial Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-lg sm:text-xl">
            <span className="text-gray-600 font-medium">
              {t?.cart?.subtotal || "Subtotal"} ({totalItems}{" "}
              {totalItems === 1 ? "item" : "items"})
            </span>
            <span className="font-bold text-gray-800">
              € {subTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-lg sm:text-xl">
            <span className="text-gray-600 font-medium">
              {t?.cart?.vat || "VAT"} ({vat_percentage}%)
            </span>
            <span className="font-bold text-gray-800">
              € {vatAmount.toFixed(2)}
            </span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between items-center text-lg sm:text-xl">
              <span className="text-gray-600 font-medium">
                {t?.cart?.coupon_discount || "Coupon Discount"}
              </span>
              <span className="font-bold text-red-500">
                -€ {couponDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {redeemDiscountAmount > 0 && (
            <div className="flex justify-between items-center text-lg sm:text-xl">
              <span className="text-gray-600 font-medium">
                {t?.cart?.points_discount || "Points Discount"}
              </span>
              <span className="font-bold text-red-500">
                -€ {redeemDiscountAmount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <hr className="border-gray-300 mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6 text-xl">
          <span className="font-medium text-gray-600">
            {t?.cart?.total || "Total"}
          </span>
          <span className="font-extrabold text-[#2bb3bb] text-2xl">
            € {totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Loyalty Banner */}
        <div className="bg-gray-50/70 p-4 rounded-2xl flex items-center justify-between gap-4 mb-6 border border-gray-100">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              {t?.cart?.use_points ||
                "Use your points & enjoy even more discount"}
            </h4>
            <p className="text-xs text-gray-500">
              {user?.loyalty_point ?? 0}{" "}
              {t?.cart?.points_available || "points available."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-[#2bb3bb] hover:bg-[#239aa1] text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors shrink-0 cursor-pointer"
          >
            {t?.cart?.redeem_points || "Redeem Points"}
          </button>
        </div>

        {/* Coupon Input */}
        <Coupon />

        <div className="flex items-center gap-2 py-2">
          <Checkbox
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
          />
          <label className="text-xs text-gray-700" htmlFor="terms">
            {t?.auth?.register?.agree_terms || "I agree to Tech Takes"}{" "}
            <Link
              href={`/${lang}/terms`}
              className="underline text-primary font-semibold"
            >
              {t?.auth?.register?.terms_of_service || "Terms of Service"}
            </Link>{" "}
            {t?.auth?.register?.and || "and"}{" "}
            <Link
              href={`/${lang}/privacy`}
              className="underline text-primary font-semibold"
            >
              {t?.auth?.register?.privacy_policy || "Privacy Policy"}
            </Link>
            .
          </label>
        </div>
        <div className="flex items-center gap-2 py-2">
          <Checkbox
            checked={agreedToCancelation}
            onCheckedChange={(checked) => setAgreedToCancelation(!!checked)}
          />
          <label className="text-xs text-gray-700" htmlFor="terms">
            {t?.cart?.agree_cancelation || "I agree with"}{" "}
            <Link
              href={`/${lang}/cancelation`}
              className="underline text-primary font-semibold"
            >
              {t?.cart?.cancelation_policy || "Cancelation Policy"}
            </Link>
            .
          </label>
        </div>
        {/* Checkout Button */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={
            !selectedItems.length ||
            isLoading ||
            !agreedToTerms ||
            !agreedToCancelation
          }
          className="flex justify-center items-center w-full bg-[#2bb3bb] hover:bg-[#239aa1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition-colors mt-4 cursor-pointer shadow-md"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            t?.cart?.proceed_checkout || "Proceed to Checkout"
          )}
        </button>

        {/* Trust Section */}
        <TrustSection totalPrice={totalPrice} t={t} />
      </div>

      <ModalContainer
        title="Redeem Your Loyalty Points"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <RedeemForm onClose={() => setIsOpen(false)} />
      </ModalContainer>
    </div>
  );
}
