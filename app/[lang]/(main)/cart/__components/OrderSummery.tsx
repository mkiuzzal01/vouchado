import RedeemForm from "@/app/components/forms/RedeemForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import Link from "next/link";
import { useState } from "react";
import TrustSection from "./TrustSection";
import OrderSummery from "@/app/components/icons/OrderSummery";

export default function OrderSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, subTotal, totalPrice, couponDiscount, vatRate } =
    useAppSelector((state) => state.cart);

  const totalItems = items.reduce(
    (total, item) => total + item.selectedQuantity,
    0,
  );

  const vatAmount = subTotal * vatRate;

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {/* Main Order Summary Card */}
      <div className="w-full bg-white p-6 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <OrderSummery />
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Summary
          </h2>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xl font-medium">
              Items ({totalItems})
            </span>

            <span className="font-bold text-xl text-gray-800">
              € {subTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xl font-medium">
              VAT ({(vatRate * 100).toFixed(0)}%)
            </span>

            <span className="font-bold text-xl text-gray-800">
              € {vatAmount.toFixed(2)}
            </span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xl font-medium">
                Coupon Discount
              </span>

              <span className="font-bold text-xl text-red-500">
                -€ {couponDiscount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-400 mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium text-gray-600">Total</span>

          <span className="text-xl font-extrabold text-gray-800">
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
              2000 vouchado points are available. You can add upto €20 discount.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2bb3bb] hover:bg-[#239aa1] text-white text-xs font-semibold px-3 py-2 rounded-full"
          >
            Redeem Points
          </button>
        </div>

        {/* Coupon */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your coupon code"
            className="flex-1 bg-gray-50 text-gray-700 text-sm px-4 py-3 rounded-xl border border-transparent focus:bg-white focus:border-gray-200 focus:outline-none"
          />

          <button className="border border-[#2bb3bb] hover:bg-cyan-50 text-[#2bb3bb] font-semibold text-sm px-6 py-3 rounded-full">
            Apply
          </button>
        </div>

        {/* Checkout */}
        <Link href={`/en/checkout`}>
          <button
            disabled={!items.length}
            className="w-full bg-[#2bb3bb] hover:bg-[#239aa1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition-colors"
          >
            Proceed to Checkout
          </button>
        </Link>
        {/* Trust Section */}
        <TrustSection totalPrice={totalPrice} />
      </div>

      <ModalContainer
        title="Redeem Your Loyalty Points"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <RedeemForm />
      </ModalContainer>
    </div>
  );
}
