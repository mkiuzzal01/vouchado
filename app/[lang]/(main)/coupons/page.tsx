import PageHero from "@/app/components/hero/PageHero";
import QRCode from "@/app/components/icons/QRCode";
import UsedVoucher from "@/app/components/icons/UsedVoucher";
import Container from "@/app/components/shared/Container";
import Promotions from "@/public/section-headers/Hero Section (3).png";
import { Info, RotateCw } from "lucide-react";

export default function Page() {
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
      <PageHero backgroundImage={Promotions.src} title="Unused Voucher" />
      <Container className="my-20">
        <div className="w-full lg:max-w-7xl mx-auto ">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UsedVoucher />
            Unused Voucher
          </h2>

          {/* Voucher List Container */}
          <div className="space-y-6">
            {vouchers.map((voucher, index) => (
              <div
                key={index}
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
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 break-all">
                        {voucher.id}
                      </span>
                    </div>

                    <div className="sm:text-right">
                      <span className="block text-sm md:text-lg font-semibold text-gray-600 mb-1">
                        Qty
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                        {voucher.qty}
                      </span>
                    </div>
                  </div>

                  {/* Deal Name */}
                  <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-6">
                    <span className="text-sm md:text-lg font-semibold text-gray-600 shrink-0">
                      Deal Name
                    </span>

                    <p className="text-sm sm:text-base md:text-lg text-gray-800 font-semibold md:text-right md:max-w-md">
                      {voucher.dealName}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <span className="text-sm md:text-lg font-semibold text-gray-600">
                      Payment
                    </span>

                    <span className="text-lg md:text-2xl font-semibold text-gray-950">
                      € {voucher.payment}
                    </span>
                  </div>

                  {/* Expire Date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <span className="text-sm md:text-lg font-semibold text-gray-600">
                      Expire date
                    </span>

                    <span className="text-sm md:text-lg font-medium text-gray-950">
                      {voucher.expiryDate}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex items-center justify-center p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/10 shrink-0">
                  <div className="bg-white p-1">
                    <QRCode />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info/Help Banner at bottom */}
          <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-50 rounded-xl text-teal-600 mt-0.5 sm:mt-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm lg:text-2xl">
                  Can't find your coupon?
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Coupons may take up to 5 minutes to appear.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-teal-500 rounded-full text-teal-600 font-medium text-sm lg:text-lg hover:bg-teal-50/50 transition bg-white shadow-sm self-end sm:self-auto">
              <RotateCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
