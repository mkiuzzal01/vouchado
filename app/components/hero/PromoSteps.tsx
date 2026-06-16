"use client";

import React from "react";

export interface PromoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PromoSteps() {
  const promos: PromoItem[] = [
    {
      title: "Best Price Guarantee",
      description: "Find it cheaper? We'll match it.",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Instant Confirmation",
      description: "Book and get confirmed instantly.",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11" />
        </svg>
      ),
    },
    {
      title: "Secure Payments",
      description: "100% secure and protected.",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      description: "We're here to help anytime.",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Outer Card Block Container Frame Wrapper */}
      <div className="border border-gray-100 rounded-3xl pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {promos.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/80 p-4 relative flex items-center gap-4 rounded-3xl
              /* Right borders for desktop (lg layout) */
              ${idx < promos.length - 1 ? "lg:border-r lg:border-gray-200/60" : ""}
              /* Dynamic borders for medium grids (sm layout layout) */
              ${idx % 2 === 0 ? "sm:border-r sm:border-gray-200/60 lg:border-r-0" : ""}
              /* Clean balance fallback override string */
              ${idx === 2 ? "lg:border-r lg:border-gray-200/60" : ""}
            `}
            >
              {/* Visual Soft Tinted Circular Icon Wrapper Background */}
              <div className="w-12 h-12 rounded-full bg-[#1ec6cc]/10 text-[#1ec6cc] flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              {/* Typography Labels Block Copy */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[14px] font-extrabold text-slate-900 tracking-tight mb-0.5">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-500 font-medium leading-normal max-w-[190px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
