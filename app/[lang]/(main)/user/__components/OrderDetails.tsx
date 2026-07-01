"use client";

import LocationIcon from "@/app/components/icons/LocationIcon";
import ReusableAlert from "@/app/components/shared/ReusableAlart";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function OrderDetails() {
  const [dialogType, setDialogType] = useState<"cancel" | null>(null);

  const handleCancelOrder = () => {
    // Add your cancellation API logic here if needed
    setDialogType(null);
  };

  return (
    <div className="w-full space-y-6 px-4 sm:px-0">
      {/* Services List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Services</h3>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 rounded-2xl bg-white shadow-sm"
          >
            {/* Service Thumbnail */}
            <div className="relative w-full h-48 sm:w-[180px] sm:h-[180px] shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=180&q=80"
                alt="Service location"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Service Meta Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3 sm:space-y-2">
              <div className="space-y-1">
                <span className="inline-block px-2 py-1 bg-[#EFF0F1CC] text-gray-800 font-medium text-[10px] rounded-full">
                  Beauty and Wellness
                </span>
                <h4 className="text-base sm:text-xl font-normal text-gray-900 truncate">
                  Live Concert Tickets for Summer Fest
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-0.5 text-amber-500">
                    ★ <span className="text-gray-700 font-bold">4.0</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <LocationIcon color="#637381" size={16} />
                    <span className="text-gray-700 font-medium">
                      New York, NY
                    </span>
                  </div>
                </div>
              </div>

              {/* Micro Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link href="/en/coupons" className="flex-1 sm:flex-initial">
                  <button className="w-full text-center bg-[#31BFC8] hover:bg-[#2EAEB6] text-white text-[11px] font-bold px-4 py-2 rounded-full transition-colors">
                    View Coupon
                  </button>
                </Link>
                <Link href="/en/view/1" className="flex-1 sm:flex-initial">
                  <button className="w-full text-center border border-gray-200 text-gray-500 hover:bg-gray-50 text-[11px] font-bold px-4 py-2 rounded-full transition-colors">
                    View Details
                  </button>
                </Link>
                <Link href={"/en/chat"} className="flex-1 sm:flex-initial">
                  <button className="w-full text-center border border-gray-200 text-gray-500 hover:bg-gray-50 text-[11px] font-bold px-4 py-2 rounded-full transition-colors">
                    Chat with Seller
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Summary Block */}
      <div className="bg-gray-50/70 border border-gray-100/80 rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Main Grid Header */}
        <div className="grid grid-cols-3 text-[11px] font-bold text-gray-400 tracking-wider">
          <div className="text-sm sm:text-xl font-medium">Item</div>
          <div className="text-center text-sm sm:text-xl font-medium">
            Items
          </div>
          <div className="text-right text-sm sm:text-xl font-medium">
            Sub Total
          </div>
        </div>

        {/* Sub Total Values */}
        <div className="grid grid-cols-3 items-center border-b border-gray-200/60 pb-3">
          <div className="text-sm sm:text-2xl font-semibold text-gray-800">
            Sub Total
          </div>
          <div className="text-center text-sm sm:text-2xl font-semibold text-gray-600">
            02
          </div>
          <div className="text-right text-sm sm:text-2xl font-semibold text-gray-800">
            € 468.86
          </div>
        </div>

        {/* Breakdowns */}
        <div className="space-y-2 border-b border-gray-200/60 pb-3 text-xs sm:text-sm font-semibold text-gray-500">
          <div className="flex justify-between">
            <span>Vat (20%)</span>
            <span className="text-gray-800">€ 11.65</span>
          </div>
          <div className="flex justify-between">
            <span>voucher Discount</span>
            <span className="text-rose-500">-€ 10.00</span>
          </div>
          <div className="flex justify-between">
            <span>Vouchado voucher</span>
            <span className="text-rose-500">-€ 50.00</span>
          </div>
        </div>

        {/* Total Block */}
        <div className="flex justify-between items-center text-lg sm:text-2xl font-semibold text-gray-900 pt-1">
          <span>Total</span>
          <span>€ 516.31</span>
        </div>
      </div>

      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link href={"/en/cart"} className="w-full sm:flex-1">
          <button className="w-full py-2.5 text-center text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Purchase again
          </button>
        </Link>
        <button
          onClick={() => setDialogType("cancel")}
          className="w-full sm:flex-1 py-2.5 text-center text-xs font-bold text-rose-500 border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors"
        >
          Cancel Order
        </button>
      </div>

      {/* Dynamic Action Dialog Context */}
      <ReusableAlert
        open={dialogType !== null}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={dialogType === "cancel" ? "Cancel Order?" : "Delete Account?"}
        description={
          dialogType === "cancel"
            ? "Are you sure you want to cancel your order?"
            : "This action is completely irreversible. Your active packages, statistics profile, and data listings will be cleared instantly."
        }
        confirmText={
          dialogType === "cancel" ? "Cancel Order" : "Confirm Deletion"
        }
        onConfirm={dialogType === "cancel" ? handleCancelOrder : () => {}}
        variant={dialogType === "cancel" ? "danger" : "default"}
      />
    </div>
  );
}
