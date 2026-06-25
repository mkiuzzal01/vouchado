import RedeemForm from "@/app/components/forms/RedeemForm";
import FreeCancellation from "@/app/components/icons/FreeCancellation";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import SecurePayment from "@/app/components/icons/SecurePayment";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { Award, Clock, ShieldCheck, Coins } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    <div className="w-full max-w-md flex flex-col gap-4 font-sans">
      {/* Main Order Summary Card */}
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="text-[#2bb3bb]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 6H7V6h10v2zm0 4H7v-2h10v2zm0 4H7v-2h10v2z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              Items ({totalItems})
            </span>

            <span className="font-bold text-gray-800">
              € {subTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              VAT ({(vatRate * 100).toFixed(0)}%)
            </span>

            <span className="font-bold text-gray-800">
              € {vatAmount.toFixed(2)}
            </span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Coupon Discount</span>

              <span className="font-bold text-red-500">
                -€ {couponDiscount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-100 mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-medium text-gray-600">Total</span>

          <span className="text-xl font-extrabold text-gray-900">
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
            className="bg-[#2bb3bb] hover:bg-[#239aa1] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
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
      </div>

      {/* Trust Section */}
      <div className="bg-white rounded-2xl">
        <div className="w-full p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="text-[#2bb3bb] mt-0.5">
              <InstantConfirm />
            </div>

            <div>
              <h4 className="font-bold text-gray-800">Best Price Guarantee</h4>

              <p className="text-sm text-gray-500">
                Find a better price? We'll match it.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-[#2bb3bb] mt-0.5">
              <FreeCancellation />
            </div>

            <div>
              <h4 className="font-bold text-gray-800">Free Cancellation</h4>

              <p className="text-sm text-gray-500">
                Cancel up to 24 hours before your visit for a full refund.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-[#2bb3bb] mt-0.5">
              <SecurePayment />
            </div>

            <div>
              <h4 className="font-bold text-gray-800">Secure Payments</h4>

              <p className="text-sm text-gray-500">
                Your payment information is 100% secure.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-4 flex items-center gap-3">
          <div className="text-[#10b981] bg-emerald-50 p-1.5 rounded-full">
            <Coins size={20} />
          </div>

          <p className="text-[15px] font-semibold text-gray-600">
            You'll earn{" "}
            <span className="text-[#2bb3bb]">{Math.floor(totalPrice)}</span>{" "}
            points with this purchase
          </p>
        </div>
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
