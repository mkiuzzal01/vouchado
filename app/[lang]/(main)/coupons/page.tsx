import PageHero from "@/app/components/hero/PageHero";
import QRCode from "@/app/components/icons/QRCode";
import UsedVoucher from "@/app/components/icons/UsedVoucher";
import Container from "@/app/components/shared/Container";
import Promotions from "@/public/cart/coupons.png";
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
      <PageHero
        backgroundImage={Promotions.src}
        title="Voucher"
        description="Your vouchers are stored securely here for easy access when you need them."
      />

      <Container>
        <div className="py-4">
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
                className="bg-white border border-gray-100 rounded-2xl  flex flex-col md:flex-row items-stretch overflow-hidden"
              >
                {/* Left Content Area - Key-Value Structure matching image_30a065.png */}
                <div className="flex-1 pt-6 pb-6 pl-6 pr-4 md:pt-6 md:pb-6 md:pl-12 md:pr-12 flex flex-col justify-between gap-4 text-xs font-medium text-slate-500">
                  {/* Row 1: Voucher ID & Qty */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Voucher ID
                      </span>
                      <span className="text-base font-bold text-slate-950">
                        {voucher.id}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Qty
                      </span>
                      <span className="text-base font-bold text-slate-950">
                        {voucher.qty}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Deal Name */}
                  <div className="flex justify-between items-start gap-6">
                    <span className="block text-[11px] font-semibold text-slate-600 shrink-0 pt-0.5">
                      Deal Name
                    </span>
                    <p className="flex-1 text-right text-slate-800 font-semibold leading-relaxed max-w-md">
                      {voucher.dealName}
                    </p>
                  </div>

                  {/* Row 3: Payment */}
                  <div className="flex justify-between items-center">
                    <span className="block text-[11px] font-semibold text-slate-600">
                      Payment
                    </span>
                    <span className="text-base font-bold text-slate-950">
                      € {voucher.payment}
                    </span>
                  </div>

                  {/* Row 4: Expire date */}
                  <div className="flex justify-between items-center">
                    <span className="block text-[11px] font-semibold text-slate-600">
                      Expire date
                    </span>
                    <span className="text-sm font-medium text-slate-950">
                      {voucher.expiryDate}
                    </span>
                  </div>
                </div>

                {/* Right QR Code Container */}
                <div className="flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/10 shrink-0">
                  <div className="p-1 bg-white select-none">
                    <QRCode />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info/Help Banner at bottom */}
          <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
