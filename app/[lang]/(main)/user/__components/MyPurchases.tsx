"use client";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useState } from "react";
import OrderDetails from "./OrderDetails";

const purchaseGroups = [
  {
    date: "May 15, 2024",
    orderId: "#123456",
    items: [
      {
        id: 1,
        title:
          "Admission to Iconic & Award-Winning US Olympic & Paralympic Interactive Museum for All-Ages",
        ticketType: "Single Day Ticket",
        location: "321 17th Street,",
        price: "115.90",
        img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=150&q=80",
      },
      {
        id: 2,
        title:
          "Admission to Iconic & Award-Winning US Olympic & Paralympic Interactive Museum for All-Ages",
        ticketType: "Single Day Ticket",
        location: "321 17th Street,",
        price: "115.90",
        img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=150&q=80",
      },
    ],
  },
];

export default function MyPurchases() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-gray-900">My Purchases</h2>
        <button className="text-xs font-semibold text-teal-600 flex items-center gap-0.5 hover:underline">
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
        {purchaseGroups.map((group, idx) => (
          <div
            key={idx}
            className="border border-gray-100 rounded-2xl p-4 space-y-4 bg-gray-50/20"
          >
            {/* Order Meta row */}
            <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900">{group.date}</span>
                <span className="text-gray-400 font-medium">
                  Order ID: {group.orderId}
                </span>
              </div>
              <button
                onClick={() => setShowOrderDetails(true)}
                className="text-gray-500 font-medium flex items-center gap-0.5 hover:text-gray-800"
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
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-shadow hover:shadow-sm"
                >
                  {/* Item Image */}
                  <img
                    src={item.img}
                    alt=""
                    className="w-full sm:w-24 h-24 sm:h-20 object-cover rounded-lg border border-gray-100 shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium">
                      {item.ticketType}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <svg
                        className="w-3 h-3 text-teal-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="text-teal-600 font-bold text-base whitespace-nowrap self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-none w-full sm:w-auto text-right">
                    € {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ModalContainer
        title="Order Details"
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
      >
        <OrderDetails />
      </ModalContainer>
    </div>
  );
}
