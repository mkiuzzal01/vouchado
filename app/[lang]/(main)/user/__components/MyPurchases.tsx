"use client";

import { useState } from "react";
import Image from "next/image";
import ModalContainer from "@/app/components/shared/ModalContainer";
import NotFoundData from "@/app/components/shared/NotFoundData";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import Location from "@/app/components/icons/Location";
import OrderDetails from "./OrderDetails";
import { PurchaseHistory, PurchaseItem } from "@/redux/types/user_profile";
import { IPagination } from "@/redux/types/_global";
import ReviewForm from "@/app/components/forms/ReviewForm";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface MyPurchasesProps {
  lang: string;
  purchaseHistory: PurchaseHistory[];
  pagination?: IPagination;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=150&q=80";

export default function MyPurchases({
  purchaseHistory,
  lang,
  pagination,
  t,
}: MyPurchasesProps) {
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  if (!purchaseHistory || purchaseHistory.length === 0) {
    return <NotFoundData description="No purchases found" />;
  }

  const handleShowOrderDetails = (id: number) => {
    setSelectedOrderId(id);
    setShowOrderDetails(true);
  };

  const handleShowReviewModal = (itemId: number) => {
    setSelectedOrderId(itemId);
    setShowReviewModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderDetails(false);
    setSelectedOrderId(null);
    setShowReviewModal(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xs transition-all">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
          {t.user_profile.my_purchases.title}
        </h2>
      </div>

      {/* Orders List Container */}
      <div className="space-y-6">
        {purchaseHistory.map((order, idx) => {
          const currentOrderId = order?.id ?? idx;

          return (
            <div
              key={currentOrderId}
              className="border border-gray-100 rounded-2xl p-4 sm:p-5 bg-gray-50/40 space-y-4 hover:border-gray-200 transition-colors"
            >
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="font-semibold text-gray-900">
                    {order?.date || "N/A"}
                  </span>
                  <span className="text-gray-300 font-light">•</span>
                  <span className="text-gray-500 font-medium">
                    Order ID:{" "}
                    <span className="text-gray-700">{order?.order_number}</span>
                  </span>
                </div>

                {order?.id !== undefined && (
                  <button
                    type="button"
                    onClick={() => handleShowOrderDetails(order.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#26c2cb] hover:text-[#1eb0b8] transition-colors self-start sm:self-auto focus:outline-hidden focus:ring-2 focus:ring-[#26c2cb]/20 rounded-md px-1 py-0.5"
                  >
                    <span>{t.user_profile.my_purchases.view_details}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Order Items List */}
              <div className="space-y-3">
                {(order?.items || []).map(
                  (item: PurchaseItem, itemIdx: number) => (
                    <div
                      key={item?.id ?? itemIdx}
                      className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-shadow"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
                        {/* Image Frame */}
                        <div className="w-full sm:w-28 sm:h-28 lg:w-32 lg:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
                          <Image
                            src={item?.image || DEFAULT_IMAGE}
                            alt={item?.title || "Tour item"}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                            {item?.title || "Untitled Product"}
                          </h3>

                          <p className="text-lg font-semibold text-gray-500">
                            {item?.deal_name || "Standard Ticket"}
                          </p>

                          {item?.location && (
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-400 pt-0.5">
                              <Location size={16} />
                              <span className="truncate">{item?.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Price & Call-To-Action */}
                      <div className="w-full sm:w-auto border-t sm:border-none border-gray-100 pt-3 sm:pt-0 flex sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-4 shrink-0">
                        {/* Price */}
                        <span className="text-lg lg:text-3xl font-bold text-[#26c2cb] tracking-tight">
                          € {item?.price ?? "0.00"}
                        </span>

                        {/* CTA Button Group */}
                        <div className="flex flex-col items-end gap-1">
                          {item?.id !== undefined && (
                            <button
                              type="button"
                              onClick={() => handleShowReviewModal(item?.id)}
                              className="px-5 py-2 bg-[#26c2cb] hover:bg-[#1eb0b8] active:scale-95 text-white lg:text-sm text-xs font-semibold rounded-full shadow-xs transition-all focus:outline-hidden focus:ring-2 focus:ring-[#26c2cb]/40"
                            >
                              {t.user_profile.my_purchases.leave_review}
                            </button>
                          )}
                          <span className="lg:text-sm text-xs text-[#637381] font-bold">
                            {t.user_profile.my_purchases.point}
                          </span>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        })}

        {/* Pagination */}
        {pagination && (
          <div className="pt-4 flex justify-center sm:justify-end">
            <ReusablePagination
              total={pagination.total}
              per_page={pagination.per_page}
              current_page={pagination.current_page}
            />
          </div>
        )}
      </div>

      {/* Modal Dialogs */}
      <ModalContainer
        width="3xl"
        title={t.user_profile.my_purchases.view_details}
        isOpen={showOrderDetails}
        onClose={handleCloseModal}
      >
        {selectedOrderId !== null && (
          <OrderDetails lang={lang} orderId={selectedOrderId} t={t} />
        )}
      </ModalContainer>

      <ModalContainer
        width="lg"
        title="Rate this product"
        isOpen={showReviewModal}
        onClose={handleCloseModal}
      >
        {selectedOrderId !== null && (
          <ReviewForm
            onClose={handleCloseModal}
            lang={lang}
            item_id={selectedOrderId}
          />
        )}
      </ModalContainer>
    </div>
  );
}
