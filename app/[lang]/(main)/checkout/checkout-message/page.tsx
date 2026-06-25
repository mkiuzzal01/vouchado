"use client";
import Image from "next/image";
import Link from "next/link";
import { Download, Eye, Compass } from "lucide-react";
import Container from "@/app/components/shared/Container";
import QRCode from "@/app/components/icons/QRCode";
import message from "@/public/notification/Success Notification.png";
import EarnedBatch from "@/app/components/icons/EarnedBatch";

export default function CheckoutMessagePage() {
  const orderDetails = {
    itemsCount: "04",
    subTotal: "468.86",
    vat: "11.65",
    couponDiscount: "10.00",
    voucherDiscount: "50.00",
    total: "516.31",
    pointsEarned: 90,
  };

  const vouchers = [
    {
      id: "#16544AFG646",
      qty: "09",
      name: "Admission to Iconic & Award-Winning US Olympic & Paralympic Interactive Museum for All-Ages",
      payment: "216.80",
      expiry: "24th October at 10:30 AM",
    },
    {
      id: "#16544AFG646",
      qty: "09",
      name: "Admission to Iconic & Award-Winning US Olympic & Paralympic Interactive Museum for All-Ages",
      payment: "216.80",
      expiry: "24th October at 10:30 AM",
    },
  ];

  return (
    <Container>
      <div className="max-w-4xl w-full mx-auto  rounded-3xl p-6 md:p-10 text-slate-800">
        {/* Success Header Image */}
        <div className="text-center flex flex-col items-center py-4">
          <Image
            src={message.src || message}
            alt="Success Banner"
            width={260}
            height={260}
            priority
            className="object-contain"
          />
        </div>

        {/* Order Details Card */}
        <div className="p-6 bg-white rounded-xl">
          <h2 className="text-lg font-bold text-slate-900 mb-3.5 tracking-tight">
            Order Details
          </h2>
          <div className="rounded-2xl p-5 border border-slate-100 space-y-3.5">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-500">
                Sub Total{" "}
                <span className="ml-1.5 px-2 py-0.5 bg-slate-200/60 rounded-md text-xs font-bold text-slate-600">
                  {orderDetails.itemsCount} Items
                </span>
              </span>
              <span className="font-bold text-slate-900">
                € {orderDetails.subTotal}
              </span>
            </div>

            <hr className="border-slate-200/60" />

            <div className="flex justify-between text-sm text-slate-600">
              <span>Vat (20%)</span>
              <span className="font-semibold text-slate-900">
                € {orderDetails.vat}
              </span>
            </div>

            <div className="flex justify-between text-sm text-rose-600 font-medium">
              <span>Coupon Discount</span>
              <span>-€ {orderDetails.couponDiscount}</span>
            </div>

            <div className="flex justify-between text-sm text-rose-600 font-medium">
              <span>Vouchado Voucher</span>
              <span>-€ {orderDetails.voucherDiscount}</span>
            </div>

            <hr className="border-slate-200" />

            <div className="flex justify-between items-center pt-0.5">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-xl font-extrabold text-slate-900">
                € {orderDetails.total}
              </span>
            </div>
          </div>
        </div>

        {/* Points Reward Notification Banner */}
        <div className="bg-[#229A16]/10 border-[#229A16] rounded-xl p-3.5 flex items-center justify-center gap-2.5 my-8 text-sm text-[#0F6357]">
          <EarnedBatch />
          <p className="font-medium">
            You Earned a{" "}
            <span className="font-bold text-[#229A16]">
              {orderDetails.pointsEarned} Vouchado Points
            </span>{" "}
            with this deal.
          </p>
        </div>

        {/* Vouchers Section */}
        <div className="space-y-6 mb-8">
          {vouchers.map((voucher, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.015)] flex flex-col md:flex-row justify-between gap-6 items-stretch hover:border-slate-200 transition-colors duration-200"
            >
              {/* Left Side Content - Structured Grid matching image_3090e1.png */}
              <div className="flex-1 space-y-4 text-xs font-medium text-slate-500">
                {/* Voucher ID & Qty Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block text-[11px] font-normal text-slate-400 mb-0.5">
                      Voucher ID
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {voucher.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-normal text-slate-400 mb-0.5">
                      Qty
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {voucher.qty}
                    </span>
                  </div>
                </div>

                {/* Deal Name / Service Name Row */}
                <div className="flex justify-between items-start gap-4">
                  <span className="w-24 shrink-0 block text-[11px] font-normal text-slate-400 pt-0.5">
                    {index === 0 ? "Deal Name" : "Service Name"}
                  </span>
                  <p className="flex-1 text-right text-slate-800 font-semibold leading-relaxed max-w-md">
                    {voucher.name}
                  </p>
                </div>

                {/* Payment Row */}
                <div className="flex justify-between items-center">
                  <span className="block text-[11px] font-normal text-slate-400">
                    {index === 0 ? "Payment" : "Order Payment"}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    € {voucher.payment}
                  </span>
                </div>

                {/* Expire Date Row */}
                <div className="flex justify-between items-center">
                  <span className="block text-[11px] font-normal text-slate-400">
                    Expire date
                  </span>
                  <span className="font-semibold text-slate-700">
                    {voucher.expiry}
                  </span>
                </div>
              </div>

              {/* Vertical Separator Line & QR Code Container */}
              <div className="w-full md:w-auto flex justify-center items-center border-t md:border-t-0 md:border-l border-slate-100/80 pt-4 md:pt-0 md:pl-8 shrink-0">
                <div className="p-1 bg-white select-none transition-transform hover:scale-[1.02]">
                  <QRCode />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6 border-t border-slate-100">
          <Link href="/coupons" className="w-full sm:w-auto">
            <button className="w-full px-5 py-2.5 rounded-full border border-teal-500 text-[#31BFC8] hover:text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#31BFC8] transition duration-200">
              <Eye className="w-4 h-4" /> View Coupons
            </button>
          </Link>

          <button className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-teal-500 text-[#31BFC8] hover:text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#31BFC8] transition duration-200">
            <Compass className="w-4 h-4" /> Explore Services
          </button>

          <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#31BFC8] hover:bg-[#28A1AA] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition duration-200">
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>
      </div>
    </Container>
  );
}
