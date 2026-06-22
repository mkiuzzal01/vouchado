import Container from "@/app/components/shared/Container";
import { CheckCircle, Download, Eye, Compass } from "lucide-react";
import Link from "next/link";
import QRCode from "@/app/components/icons/QRCode";

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
      <div className="my-4 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 font-sans text-gray-800">
        {/* Success Header */}
        <div className="text-center flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white mb-4 shadow-md shadow-teal-100">
            <CheckCircle className="w-10 h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Payment Successful
          </h1>
          <p className="text-sm text-gray-500 max-w-sm">
            Your order has been confirmed and your redemption voucher is ready
            to use.
          </p>
        </div>

        {/* Order Details Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Order Details
          </h2>
          <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-500">Sub Total</span>
              <span className="font-medium text-gray-500">
                {orderDetails.itemsCount}
              </span>
              <span className="font-bold text-gray-900">
                € {orderDetails.subTotal}
              </span>
            </div>
            <hr className="border-gray-200/60" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Vat (20%)</span>
              <span className="font-semibold text-gray-900">
                € {orderDetails.vat}
              </span>
            </div>
            <div className="flex justify-between text-sm text-red-500 font-medium">
              <span>Coupon Discount</span>
              <span>-€ {orderDetails.couponDiscount}</span>
            </div>
            <div className="flex justify-between text-sm text-red-500 font-medium">
              <span>Vouchado Voucher</span>
              <span>-€ {orderDetails.voucherDiscount}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-lg font-extrabold text-gray-900">
                € {orderDetails.total}
              </span>
            </div>
          </div>
        </div>

        {/* Points Notification Banner */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2 mb-8 justify-center text-sm text-emerald-800">
          <span className="inline-block w-5 h-5 bg-emerald-500 text-white rounded-full text-center text-xs leading-5">
            ✓
          </span>
          <p>
            You Earned a{" "}
            <span className="font-bold text-emerald-600">
              {orderDetails.pointsEarned} Vouchado Points
            </span>{" "}
            with this deal.
          </p>
        </div>

        {/* Vouchers List */}
        <div className="space-y-4 mb-8">
          {vouchers.map((voucher, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between gap-6 items-start md:items-center"
            >
              <div className="flex-1 space-y-2 text-sm">
                <div className="flex justify-between md:justify-start gap-12">
                  <div>
                    <span className="text-gray-400 block text-xs">
                      Voucher ID
                    </span>
                    <span className="font-bold text-gray-900">
                      {voucher.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Qty</span>
                    <span className="font-bold text-gray-900">
                      {voucher.qty}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs mb-0.5">
                    Deal Name
                  </span>
                  <p className="font-medium text-gray-800 leading-tight">
                    {voucher.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-gray-400 block text-xs">Payment</span>
                    <span className="font-bold text-gray-900">
                      € {voucher.payment}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">
                      Expire date
                    </span>
                    <span className="font-semibold text-gray-700">
                      {voucher.expiry}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="w-full md:w-auto flex justify-center items-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <div className="p-2 bg-gray-50 rounded-xl border border-gray-200/60 text-slate-800">
                  <QRCode />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 border-t border-gray-100">
          <Link href="/coupons">
            <button className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-teal-500 text-teal-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-teal-50 transition">
              <Eye className="w-4 h-4" /> View Coupons
            </button>
          </Link>
          <button className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-teal-500 text-teal-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-teal-50 transition">
            <Compass className="w-4 h-4" /> Explore Service
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-teal-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-teal-600 shadow-sm transition">
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>
      </div>
    </Container>
  );
}
