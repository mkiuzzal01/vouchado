import PageHero from "@/app/components/hero/PageHero";
import QRCode from "@/app/components/icons/QRCode";
import Container from "@/app/components/shared/Container";
import Promotions from "@/public/cart/coupons.png";
import { Info, QrCode, RotateCw } from "lucide-react";

export default function page() {
  const vouchers = Array(3).fill({
    id: "#16544AFG646",
    qty: "09",
    dealName:
      "Admission to Iconic & Award-Winning US Olympic & Paralympic Interactive Museum for All-Ages",
    payment: "216.80",
    expiryDate: "24th October at 10:30 AM",
  });
  return (
    <div>
      <PageHero
        backgroundImage={Promotions.src}
        title="Voucher"
        description="Your vouchers are stored securely here for easy access when you need them."
      />

      <Container>
        <div className="py-4">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="inline-block w-5 h-5 text-teal-500">🎟️</span>{" "}
            Unused Voucher
          </h2>

          {/* Voucher List Container */}
          <div className="space-y-6">
            {" "}
            {/* 24px vertical space between items */}
            {vouchers.map((voucher, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row items-stretch overflow-hidden"
              >
                {/* Left Content Area - Padding: 48px left, 24px top/bottom */}
                <div className="flex-1 pt-6 pb-6 pl-6 pr-4 md:pt-6 md:pb-6 md:pl-12 md:pr-4 flex flex-col justify-between gap-4">
                  {/* Row 1: ID & Qty */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-gray-400 block text-xs mb-0.5">
                        Voucher ID
                      </span>
                      <span className="font-bold text-gray-950 text-base">
                        {voucher.id}
                      </span>
                    </div>
                    <div className="text-right md:text-left md:mr-16">
                      <span className="text-gray-400 block text-xs mb-0.5">
                        Qty
                      </span>
                      <span className="font-bold text-gray-955 text-base">
                        {voucher.qty}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Deal Name */}
                  <div>
                    <span className="text-gray-400 block text-xs mb-1">
                      Deal Name
                    </span>
                    <p className="font-semibold text-gray-850 text-sm leading-snug max-w-xl">
                      {voucher.dealName}
                    </p>
                  </div>

                  {/* Row 3: Payment & Expiry */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="text-gray-400 block text-xs mb-0.5">
                        Payment
                      </span>
                      <span className="font-bold text-gray-950">
                        € {voucher.payment}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-xs mb-0.5">
                        Expire date
                      </span>
                      <span className="font-medium text-gray-700 text-sm">
                        {voucher.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right QR Code Container - Padding: 48px all sides, separated by a thin border line */}
                <div className="flex items-center justify-center p-6 md:p-12 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/30">
                  <div className="p-1 bg-white rounded-xl shadow-sm border border-gray-200/50 text-slate-800">
                    <QRCode />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info/Help Banner at bottom */}
          <div className="mt-8 bg-gray-50/80 border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-xl text-teal-600 mt-0.5 sm:mt-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  Can't find your coupon?
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Coupons may take up to 5 minutes to appear.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-teal-500 rounded-full text-teal-600 font-medium text-xs hover:bg-teal-50/50 transition bg-white shadow-sm self-end sm:self-auto">
              <RotateCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
