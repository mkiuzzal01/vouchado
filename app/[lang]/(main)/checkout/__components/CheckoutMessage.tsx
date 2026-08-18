"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import Container from "@/app/components/shared/Container";
import EarnedBatch from "@/app/components/icons/EarnedBatch";
import Voucher from "@/app/components/icons/Voucher";
import Bag from "@/app/components/icons/Bag";
import QRCode from "../../vouchers/__components/QRCode";
import Loader from "@/app/loading";

import message from "@/public/notification/Success Notification.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { clearCouponCode } from "@/redux/features/auth/auth.slice";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useGetVerifySessionQuery } from "@/redux/features/deal/deal.api";

interface Props {
  session_id?: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

interface VoucherItem {
  id: string | number;
  voucher_code: string;
  expire_date: string;
}

export default function CheckoutMessage({ session_id, t }: Props) {
  const dispatch = useAppDispatch();
  const { points_per_order } = useAppSelector((state) => state.auth);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data: verifySession,
    isFetching,
    isLoading,
  } = useGetVerifySessionQuery(session_id, {
    skip: !session_id,
  });

  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearCouponCode());
  }, [dispatch]);

  if (isFetching || isLoading) {
    return <Loader />;
  }

  const orderDetails = {
    itemsCount: verifySession?.data?.data?.order?.item_count || 0,
    subTotal: verifySession?.data?.data?.order?.subtotal || 0,
    vat: verifySession?.data?.data?.order?.tax || 0,
    couponDiscount: verifySession?.data?.data?.order?.coupon_discount || 0,
    voucherDiscount: verifySession?.data?.data?.order?.voucher_discount || 0,
    total: verifySession?.data?.amount_total || 0,
    pointsEarned: points_per_order || 0,
  };

  const vouchers =
    verifySession?.data?.data?.order?.vouchers?.map((voucher: VoucherItem) => ({
      id: voucher.id,
      qty: 1,
      voucher_code: voucher.voucher_code,
      payment: verifySession?.data?.amount_total,
      expiry: voucher.expire_date,
    })) || [];

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Import jsPDF
      const jsPDFModule = await import("jspdf");
      const autoTableModule = await import("jspdf-autotable");
      const QRCodeModule = await import("qrcode");

      const jsPDF = jsPDFModule.default;
      const autoTable = autoTableModule.default;
      const QRCode = QRCodeModule.default;

      const doc = new jsPDF();
      const orderId = verifySession?.data?.order?.id || "N/A";

      // --- Header Section ---
      doc.setFontSize(20);
      doc.setTextColor(49, 191, 200);
      doc.text("INVOICE", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Order ID: #${orderId}`, 14, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 34);

      // --- Order Summary Table ---
      autoTable(doc, {
        startY: 42,
        head: [["Item Description", "Qty", "Subtotal (€)"]],
        body: [
          [
            t?.checkout?.message?.sub_total || "Sub Total",
            orderDetails.itemsCount.toString(),
            `€ ${orderDetails.subTotal}`,
          ],
        ],
        headStyles: { fillColor: [49, 191, 200] },
        styles: { fontSize: 10 },
      });

      // --- Calculations Breakdown ---
      const finalY =
        (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
          .finalY + 10;

      doc.setFontSize(11);
      doc.setTextColor(50);

      doc.text(`${t?.checkout?.message?.vat || "VAT (20%)"}:`, 120, finalY);
      doc.text(`€ ${orderDetails.vat}`, 180, finalY, { align: "right" });

      doc.text(
        `${t?.checkout?.message?.coupon_discount || "Coupon Discount"}:`,
        120,
        finalY + 6,
      );
      doc.text(`-€ ${orderDetails.couponDiscount}`, 180, finalY + 6, {
        align: "right",
      });

      doc.text(
        `${t?.checkout?.message?.view_coupons || "Voucher Discount"}:`,
        120,
        finalY + 12,
      );
      doc.text(`-€ ${orderDetails.voucherDiscount}`, 180, finalY + 12, {
        align: "right",
      });

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(`${t?.checkout?.message?.total || "Total"}:`, 120, finalY + 22);
      doc.text(`€ ${orderDetails.total}`, 180, finalY + 22, { align: "right" });

      // --- Generate QR Codes and add to PDF ---
      if (vouchers.length > 0) {
        // Create a canvas element for QR code generation
        const canvas = document.createElement("canvas");

        // Generate QR codes for each voucher and add to PDF
        for (let i = 0; i < vouchers.length; i++) {
          const voucher = vouchers[i];

          // Generate QR code on canvas
          await QRCode.toCanvas(canvas, voucher.voucher_code, {
            width: 100,
            margin: 2,
            errorCorrectionLevel: "H",
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          });

          // Convert canvas to image data
          const qrDataUrl = canvas.toDataURL("image/png");

          // Add voucher details to PDF
          const yPos = finalY + 35 + i * 45;

          // Add voucher info
          doc.setFontSize(9);
          doc.setFont("helvetica", "normal");
          doc.text(`Voucher ${i + 1}`, 14, yPos);
          doc.text(`ID: ${voucher.id}`, 14, yPos + 6);
          doc.text(`Code: ${voucher.voucher_code}`, 14, yPos + 12);
          doc.text(`Qty: ${voucher.qty}`, 14, yPos + 18);
          doc.text(`Payment: €${voucher.payment}`, 14, yPos + 24);
          doc.text(`Expiry: ${voucher.expiry}`, 14, yPos + 30);

          // Add QR code to the right side
          const qrX = 170;
          const qrY = yPos - 5;
          const qrSize = 30;

          try {
            doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
          } catch (error) {
            console.error("Error adding QR code:", error);
          }

          // Add a separator line between vouchers
          if (i < vouchers.length - 1) {
            doc.setDrawColor(200, 200, 200);
            doc.line(14, yPos + 35, 195, yPos + 35);
          }
        }
      }

      // --- Save the PDF ---
      doc.save(`Invoice_${orderId}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF invoice:", error);
      alert("Failed to download invoice. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 text-slate-800 space-y-6">
        {/* Success Banner Image Container */}
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <div className="relative w-full max-w-[530px] aspect-[530/432]">
            <Image
              src={message}
              alt="Success Banner"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold text-slate-800">
              {t?.checkout?.success?.title}
            </h1>
            <p className="text-xl text-slate-600">
              {t?.checkout?.success?.description}
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="p-4 sm:p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.01)]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-5">
            {t?.checkout?.message?.order_details}
          </h2>

          <div className="rounded-2xl p-4 sm:p-6 border border-slate-100 space-y-4 overflow-x-auto">
            <div className="min-w-[480px] space-y-4">
              <div className="grid grid-cols-3 text-xs font-semibold text-slate-400 tracking-wide pb-1">
                <div className="text-sm sm:text-lg md:text-xl">
                  {t?.checkout?.message?.item}
                </div>
                <div className="text-sm sm:text-lg md:text-xl text-center">
                  {t?.checkout?.message?.items}
                </div>
                <div className="text-sm sm:text-lg md:text-xl text-right">
                  {t?.checkout?.message?.sub_total}
                </div>
              </div>

              <div className="grid grid-cols-3 items-center">
                <p className="text-base sm:text-xl md:text-2xl font-semibold text-slate-800">
                  {t?.checkout?.message?.sub_total}
                </p>
                <p className="text-base sm:text-xl md:text-2xl text-center font-bold text-slate-800">
                  {orderDetails.itemsCount}
                </p>
                <span className="text-base sm:text-xl md:text-2xl text-right font-bold text-slate-900">
                  € {orderDetails.subTotal}
                </span>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-3.5 pt-1">
                <div className="grid grid-cols-3 text-base sm:text-xl md:text-2xl font-semibold text-slate-500">
                  <span className="col-span-2">
                    {t?.checkout?.message?.vat}
                  </span>
                  <span className="font-bold text-slate-900 text-right">
                    € {orderDetails.vat}
                  </span>
                </div>

                <div className="grid grid-cols-3 text-sm sm:text-lg md:text-xl font-semibold text-slate-500">
                  <span className="col-span-2">
                    {t?.checkout?.message?.coupon_discount}
                  </span>
                  <span className="font-bold text-rose-500 text-right">
                    -€ {orderDetails.couponDiscount}
                  </span>
                </div>

                <div className="grid grid-cols-3 text-sm sm:text-lg md:text-xl font-semibold text-slate-500">
                  <span className="col-span-2">
                    {t?.checkout?.message?.coupon_discount ||
                      "Voucher Discount"}
                  </span>
                  <span className="font-bold text-rose-500 text-right">
                    -€ {orderDetails.voucherDiscount}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="grid grid-cols-3 items-center pt-2">
                <span className="text-base sm:text-xl md:text-2xl font-semibold text-slate-900 col-span-2">
                  {t?.checkout?.message?.total}
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
            {t?.checkout?.message?.earned_prefix}{" "}
            <span className="text-emerald-600 font-extrabold">
              {orderDetails.pointsEarned}{" "}
            </span>{" "}
            {t?.checkout?.message?.earned_suffix}
          </p>
        </div>

        {/* Vouchers Section */}
        <div className="space-y-6">
          {vouchers.map((voucher: any, index: number) => (
            <div
              key={`${voucher?.id}-${index}`}
              className="bg-white border border-gray-100 rounded-2xl flex flex-col md:flex-row overflow-hidden"
            >
              <div className="flex-1 p-5 md:pt-6 md:pb-6 md:pl-12 md:pr-12 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <span className="block text-sm md:text-lg font-semibold text-slate-600 mb-1">
                      {t?.checkout?.message?.voucher_id}
                    </span>
                    <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 break-all">
                      {voucher?.id}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <span className="block text-sm md:text-lg font-semibold text-gray-600 mb-1">
                      {t?.checkout?.message?.qty}
                    </span>
                    <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800">
                      {voucher?.qty}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-6">
                  <span className="text-sm md:text-lg font-semibold text-gray-600 shrink-0">
                    {t?.checkout?.message?.code_name}
                  </span>

                  <p className="text-sm sm:text-base md:text-lg text-gray-800 font-semibold md:text-right md:max-w-md">
                    {voucher?.voucher_code}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm md:text-lg font-semibold text-gray-600">
                    {t?.checkout?.message?.payment}
                  </span>

                  <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-950">
                    € {voucher?.payment}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm md:text-lg font-semibold text-gray-600">
                    {t?.checkout?.message?.expire_date}
                  </span>

                  <span className="text-xs sm:text-base md:text-lg font-medium text-gray-950">
                    {voucher?.expiry}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/10 shrink-0">
                <QRCode voucher_code={voucher?.voucher_code} />
              </div>
            </div>
          ))}
        </div>

        {/* Action Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-6 border-t border-slate-100 w-full">
          <Link href="/vouchers" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 rounded-full border border-[#31BFC8] text-[#31BFC8] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition duration-200 active:scale-[0.99] whitespace-nowrap">
              <Voucher color="#31BFC8" size={24} />{" "}
              {t?.checkout?.message?.view_coupons}
            </button>
          </Link>

          <Link href="/deals" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 rounded-full border border-[#31BFC8] text-[#31BFC8] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition duration-200 active:scale-[0.99] whitespace-nowrap">
              <Bag color="#31BFC8" size={24} />{" "}
              {t?.checkout?.message?.explore_deals}
            </button>
          </Link>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#31BFC8] hover:shadow-lg text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition duration-200 active:scale-[0.99] whitespace-nowrap disabled:opacity-50"
          >
            <Download className="w-4 h-4" />{" "}
            {isDownloading
              ? "Downloading..."
              : t?.checkout?.message?.download_all}
          </button>
        </div>
      </div>
    </Container>
  );
}
