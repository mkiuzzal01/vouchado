import { useAppSelector } from "@/redux/hooks/globalhooks";
import { Award, Clock, ShieldCheck, Coins } from "lucide-react"; // Clean icons for the trust badges

export default function OrderSummary() {
  const { items, subTotal, totalPrice, couponDiscount, vatRate } =
    useAppSelector((state) => state.cart);

  console.log(subTotal);

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
          <h2 className="text-xl font-bold text-gray-800">Order Summery</h2>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              Items ({items.length})
            </span>
            <span className="font-bold text-gray-800">€ {subTotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Vat ({vatRate}%)</span>
            <span className="font-bold text-gray-800">
              € {subTotal * vatRate}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Coupon Discount</span>
            <span className="font-bold text-red-500">-€ {couponDiscount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Vouchado Coupon</span>
            <span className="font-bold text-red-500">-€ {couponDiscount}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100 mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-medium text-gray-600">Total</span>
          <span className="text-xl font-extrabold text-gray-900">
            € {totalPrice}
          </span>
        </div>

        {/* Loyalty Points Banner */}
        <div className="bg-gray-50/70 p-4 rounded-2xl flex items-center justify-between gap-4 mb-6 border border-gray-50">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 mb-1 leading-snug">
              Use your points & enjoy even more discount
            </h4>
          </div>
          <button className="bg-[#2bb3bb] hover:bg-[#239aa1] text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap transition-colors">
            Redeem poin...
          </button>
        </div>

        {/* Coupon Input Field */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your coupon code"
            className="flex-1 bg-gray-50 text-gray-700 text-sm px-4 py-3 rounded-xl border border-transparent focus:bg-white focus:border-gray-200 focus:outline-none transition-all placeholder-gray-400"
          />
          <button className="border border-[#2bb3bb] hover:bg-cyan-50/30 text-[#2bb3bb] font-semibold text-sm px-6 py-3 rounded-full transition-colors">
            Apply
          </button>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-[#2bb3bb] hover:bg-[#239aa1] text-white font-semibold py-4 rounded-full text-center transition-colors shadow-sm shadow-cyan-100">
          Proceed to Checkout
        </button>
      </div>

      <div className="bg-white rounded-2xl">
        {/* Trust Badges Card */}
        <div className="w-full p-6  flex flex-col gap-5">
          {/* Badge 1 */}
          <div className="flex items-start gap-4">
            <div className="text-[#2bb3bb] mt-0.5">
              <Award size={22} className="stroke-[1.75]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-[15px] leading-tight">
                Best Price Guarantee
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">
                Find a better price? We'll match it.
              </p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-start gap-4">
            <div className="text-[#2bb3bb] mt-0.5">
              <Clock size={22} className="stroke-[1.75]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-[15px] leading-tight">
                Free Cancellation
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">
                Cancel up to 24 hours before your visit for a full refund.
              </p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-start gap-4">
            <div className="text-[#2bb3bb] mt-0.5">
              <ShieldCheck size={22} className="stroke-[1.75]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-[15px] leading-tight">
                Secure Payments
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">
                Your payment information is 100% secure.
              </p>
            </div>
          </div>
        </div>

        {/* Points Earned Card */}
        <div className="w-full px-6 py-4  flex items-center gap-3">
          <div className="text-[#10b981] bg-emerald-50 p-1.5 rounded-full">
            <Coins size={20} />
          </div>
          <p className="text-[15px] font-semibold text-gray-600">
            You'll earn <span className="text-[#2bb3bb]">514 points</span> with
            this purchase
          </p>
        </div>
      </div>
    </div>
  );
}
