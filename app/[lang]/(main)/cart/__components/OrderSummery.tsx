"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import RedeemForm from "@/app/components/forms/RedeemForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import OrderSummeryIcon from "@/app/components/icons/OrderSummery";
import TrustSection from "./TrustSection";
import Coupon from "./Coupon";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { clearCouponCode } from "@/redux/features/auth/auth.slice";

interface Props {
  lang: string;
}

export default function OrderSummary({ lang }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
        toast.success(res.message);
        dispatch(clearCart());
        dispatch(clearCouponCode());
        router.replace(res?.data?.checkout_url);
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.error("Please login first to checkout");
        router.push(`/${lang}/login?redirect=${window?.location?.pathname}`);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-white p-6 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <OrderSummeryIcon />
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Summary
          </h2>
        </div>

        {/* Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-xl">
            <span className="text-gray-600 font-medium">
              Items ({totalItems})
            </span>
            <span className="font-bold text-gray-800">
              € {subTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-xl">
            <span className="text-gray-600 font-medium">
              VAT ({vat_percentage}%)
            </span>
            <span className="font-bold text-gray-800">
              € {vatAmount.toFixed(2)}
            </span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-600 font-medium">Coupon Discount</span>
              <span className="font-bold text-red-500">
                -€ {couponDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {redeemDiscountAmount > 0 && (
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-600 font-medium">Points Discount</span>
              <span className="font-bold text-red-500">
                -€ {redeemDiscountAmount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <hr className="border-gray-400 mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6 text-xl">
          <span className="font-medium text-gray-600">Total</span>
          <span className="font-extrabold text-gray-800">
            € {totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Loyalty Banner */}
        <div className="bg-gray-50/70 p-4 rounded-2xl flex items-center justify-between gap-4 mb-6 border border-gray-50">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Use your points & enjoy even more discount
            </h4>
            <p className="text-sm text-gray-500">
              {user?.loyalty_point ?? 0} points available.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2bb3bb] hover:bg-[#239aa1] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors"
          >
            Redeem Points
          </button>
        </div>

        {/* Coupon Input */}
        <Coupon />

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={!selectedItems.length || isLoading}
          className="flex justify-center items-center w-full bg-[#2bb3bb] hover:bg-[#239aa1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition-colors mt-4"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Proceed to Checkout"
          )}
        </button>

        {/* Trust Section */}
        <TrustSection totalPrice={totalPrice} />
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
