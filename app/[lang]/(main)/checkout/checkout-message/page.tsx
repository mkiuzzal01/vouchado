"use client";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import Container from "@/app/components/shared/Container";
import message from "@/public/notification/Success Notification.png";
import EarnedBatch from "@/app/components/icons/EarnedBatch";
import Voucher from "@/app/components/icons/Voucher";
import Bag from "@/app/components/icons/Bag";
import { VerifySession } from "@/redux/types/_global";
import QRCode from "../../coupons/__components/QRCode";

interface Props {
  verifySession: VerifySession;
}

export default function CheckoutMessagePage({ verifySession }: Props) {
  const orderDetails = {
    itemsCount: verifySession.data.order.item_count,
    subTotal: verifySession.data.order.subtotal,
    vat: verifySession.data.order.tax,
    couponDiscount: verifySession.data.order.coupon_discount,
    voucherDiscount: verifySession.data.order.voucher_discount,
    total: verifySession.amount_total,
    pointsEarned: 90,
  };

  const vouchers = verifySession.data.order.vouchers.map((voucher) => ({
    id: voucher.id,
    qty: 1,
    voucher_code: voucher.voucher_code,
    payment: verifySession.data.order.total,
    expiry: voucher.expire_date,
  }));

  return (
    <Container>
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 text-slate-800 space-y-6">
        {/* Success Banner Image Container */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-[530px] aspect-[530/432]">
            <Image
              src={message}
              alt="Success Banner"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Order Details Card */}
        <div className="p-4 sm:p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.01)]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-5">
            Order Details
          </h2>

          <div className="rounded-2xl p-4 sm:p-6 border border-slate-100 space-y-4 overflow-x-auto">
            {/* Table wrapper ensuring small mobile screens don't crush text data */}
            <div className="min-w-[480px] space-y-4">
              {/* Top Grid Column Headers & Sub-Total row */}
              <div className="grid grid-cols-3 text-xs font-semibold text-slate-400 tracking-wide pb-1">
                <div className="text-sm sm:text-lg md:text-xl">Item</div>
                <div className="text-sm sm:text-lg md:text-xl text-center">
                  Items
                </div>
                <div className="text-sm sm:text-lg md:text-xl text-right">
                  Sub Total
                </div>
              </div>

              <div className="grid grid-cols-3 items-center">
                <p className="text-base sm:text-xl md:text-2xl font-semibold text-slate-800">
                  Sub Total
                </p>
                <p className="text-base sm:text-xl md:text-2xl text-center font-bold text-slate-800">
                  {orderDetails.itemsCount}
                </p>
                <span className="text-base sm:text-xl md:text-2xl text-right font-bold text-slate-900">
                  € {orderDetails.subTotal}
                </span>
              </div>

              <hr className="border-slate-100" />

              {/* Calculations Breakdown */}
              <div className="space-y-3.5 pt-1">
                <div className="grid grid-cols-3 text-base sm:text-xl md:text-2xl font-semibold text-slate-500">
                  <span className="col-span-2">Vat (20%)</span>
                  <span className="font-bold text-slate-900 text-right">
                    € {orderDetails.vat}
                  </span>
                </div>

                <div className="grid grid-cols-3 text-sm sm:text-lg md:text-xl font-semibold text-slate-500">
                  <span className="col-span-2">Coupon Discount</span>
                  <span className="font-bold text-rose-500 text-right">
                    -€ {orderDetails.couponDiscount}
                  </span>
                </div>

                <div className="grid grid-cols-3 text-sm sm:text-lg md:text-xl font-semibold text-slate-500">
                  <span className="col-span-2">Vouchado Voucher</span>
                  <span className="font-bold text-rose-500 text-right">
                    -€ {orderDetails.voucherDiscount}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Total Footer Row */}
              <div className="grid grid-cols-3 items-center pt-2">
                <span className="text-base sm:text-xl md:text-2xl font-semibold text-slate-900 col-span-2">
                  Total
                </span>
                <span className="text-base sm:text-xl md:text-2xl font-semibold text-slate-900 text-right">
                  € {orderDetails.total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Points Reward Notification Banner */}
        <div className="relative bg-[#F4FBF7] rounded-2xl p-4 min-h-[64px] flex items-center justify-center text-center border border-emerald-100/50">
          <div className="absolute left-4 sm:left-6 text-emerald-600 flex items-center justify-center">
            <EarnedBatch />
          </div>

          <p className="text-xs sm:text-base md:text-xl font-bold text-slate-800 pl-10 pr-4 sm:px-12 tracking-tight">
            You Earned{" "}
            <span className="text-emerald-600 font-extrabold">
              {orderDetails.pointsEarned} Vouchado Points
            </span>{" "}
            with this deals.
          </p>
        </div>

        {/* Vouchers Section */}
        <div className="space-y-6">
          {vouchers.map((voucher, index) => (
            <div
              key={`${voucher?.id}-${index}`}
              className="bg-white border border-gray-100 rounded-2xl flex flex-col md:flex-row overflow-hidden"
            >
              {/* Left Content */}
              <div className="flex-1 p-5 md:pt-6 md:pb-6 md:pl-12 md:pr-12 flex flex-col gap-5">
                {/* Voucher ID & Qty */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <span className="block text-sm md:text-lg font-semibold text-slate-600 mb-1">
                      Voucher ID
                    </span>
                    <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 break-all">
                      {voucher?.id}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <span className="block text-sm md:text-lg font-semibold text-gray-600 mb-1">
                      Qty
                    </span>
                    <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800">
                      {voucher?.qty}
                    </span>
                  </div>
                </div>

                {/* Deal Name */}
                <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-6">
                  <span className="text-sm md:text-lg font-semibold text-gray-600 shrink-0">
                    Code / Name
                  </span>

                  <p className="text-sm sm:text-base md:text-lg text-gray-800 font-semibold md:text-right md:max-w-md">
                    {voucher?.voucher_code}
                  </p>
                </div>

                {/* Payment */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm md:text-lg font-semibold text-gray-600">
                    Payment
                  </span>

                  <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-950">
                    € {voucher?.payment}
                  </span>
                </div>

                {/* Expire Date */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm md:text-lg font-semibold text-gray-600">
                    Expire date
                  </span>

                  <span className="text-xs sm:text-base md:text-lg font-medium text-gray-950">
                    {voucher?.expiry}
                  </span>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex items-center justify-center p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/10 shrink-0">
                <QRCode voucher_code={voucher?.voucher_code} />
              </div>
            </div>
          ))}
        </div>

        {/* Action Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-6 border-t border-slate-100 w-full">
          <Link href="/coupons" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 rounded-full border border-[#31BFC8] text-[#31BFC8] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition duration-200 active:scale-[0.99] whitespace-nowrap">
              <Voucher color="#31BFC8" size={24} /> View Coupons
            </button>
          </Link>

          <Link href="/deals" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 rounded-full border border-[#31BFC8] text-[#31BFC8] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition duration-200 active:scale-[0.99] whitespace-nowrap">
              <Bag color="#31BFC8" size={24} /> Explore Deals
            </button>
          </Link>

          <button className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#31BFC8] hover:shadow-lg text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition duration-200 active:scale-[0.99] whitespace-nowrap">
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>
      </div>
    </Container>
  );
}
