"use client";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import Image from "next/image";
import Location from "@/app/components/icons/Location";
import { PurchaseHistory, PurchaseItem } from "@/redux/types/user_profile";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface MyPurchasesProps {
  purchaseHistory: PurchaseHistory[];
}

export default function MyPurchases({ purchaseHistory }: MyPurchasesProps) {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderId, setOrderId] = useState<number>();

  if (purchaseHistory.length === 0) {
    return <NotFoundData description="No purchases found" />;
  }

  const handleShowOrderDetails = (orderId: number) => {
    setOrderId(orderId);
    setShowOrderDetails(true);
  };

  const handleViewPurchasesHistory = () => {};

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
          My Purchases
        </h2>
        <button
          onClick={handleViewPurchasesHistory}
          className="text-sm sm:text-lg font-semibold text-[#31BFC8] flex items-center gap-0.5 hover:underline self-start sm:self-auto"
        >
          View Purchases History
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Orders Container */}
      <div className="space-y-6">
        {purchaseHistory?.map((order: PurchaseHistory, idx: number) => (
          <div
            key={order?.id || idx}
            className="border border-gray-100 rounded-2xl p-3 sm:p-4 space-y-4 bg-gray-50/20"
          >
            {/* Order Meta row */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-100 pb-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-lg">
                <span className="font-semibold text-gray-900">
                  {order?.date}
                </span>
                <span className="text-gray-400 font-medium">
                  Order ID: {order?.order_number}
                </span>
              </div>
              <button
                onClick={() => handleShowOrderDetails(order?.id)}
                className="text-xs sm:text-base text-gray-500 font-semibold flex items-center gap-0.5 hover:text-gray-800 self-end sm:self-auto"
              >
                View details
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Order Items list */}
            <div className="space-y-3">
              {(order?.items || []).map(
                (item: PurchaseItem, itemIdx: number) => (
                  <div
                    key={item.id || itemIdx}
                    className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-shadow hover:shadow-sm"
                  >
                    {/* Item Image Layout */}
                    <div className="relative w-full h-44 sm:w-[140px] sm:h-[110px] shrink-0">
                      <Image
                        src={
                          item?.image ||
                          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=150&q=80"
                        }
                        alt={item?.title || "Tour item"}
                        fill
                        className="object-cover rounded-lg border border-gray-100"
                        sizes="(max-width: 640px) 100vw, 140px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                        {item?.title}
                      </h4>
                      <p className="text-sm sm:text-lg text-gray-400 font-semibold">
                        {item?.deal_name || "Deal Ticket"}
                      </p>
                      <div className="flex items-center gap-1 text-xs sm:text-base font-semibold text-gray-400">
                        <Location size={16} />
                        <span className="truncate">{item?.location}</span>
                      </div>
                    </div>

                    {/* Pricing Output */}
                    <div className="text-teal-600 font-bold text-base sm:text-xl whitespace-nowrap self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-none w-full sm:w-auto text-right">
                      € {item?.price}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <ModalContainer
        title="Order Details"
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
      >
        <OrderDetails orderId={orderId} />
      </ModalContainer>
    </div>
  );
}
