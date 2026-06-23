"use client";

import React, { useState } from "react";

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface FilterWithCategoryProps {
  onCategoryChange?: (id: string) => void;
  initialSelectedId?: string;
  className?: string;
}

export default function FilterWithCategory({
  onCategoryChange,
  initialSelectedId = "all",
  className = "",
}: FilterWithCategoryProps) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const categories: CategoryItem[] = [
    {
      id: "all",
      label: "All Deals",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 4 Grid Squares */}
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: "adventure",
      label: "Adventure & Sports",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Detailed overlapping mountain ridges lines */}
          <path d="M3 20L10 6L16 16.5" />
          <path d="M13 13.5L16.5 9L21 20" />
          <path d="M2 20h20" />
        </svg>
      ),
    },
    {
      id: "food",
      label: "Eat and Drink",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hand holding a dome serving plate / cloche */}
          <path d="M5 13a7 7 0 0 1 14 0H5z" />
          <path d="M12 4v2" />
          <path d="M3 16h18" />
          <path d="M17 16c0 2-2 3-5 3s-5-1-5-3" />
        </svg>
      ),
    },
    {
      id: "family",
      label: "Family & Kids",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Winking/Smiling baby/child face with single hair curl */}
          <circle cx="12" cy="13" r="8" />
          <path d="M12 5a3 3 0 0 1-2-3" />
          <path d="M9.5 11.5a.5.5 0 1 1-.01 0" />
          <path d="M14.5 11.5a.5.5 0 1 1-.01 0" />
          <path d="M9.5 15.5c.8 1.5 2.7 2 4.5 0" />
        </svg>
      ),
    },
    {
      id: "beauty",
      label: "Beauty & Wellness",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Sacred Lotus Flower multi-leaf configuration sitting on platform */}
          <path d="M12 21a6 6 0 0 0 6-6c0-3.5-6-9-6-9s-6 5.5-6 9a6 6 0 0 0 6 6z" />
          <path d="M12 9c1.5 2.5 3.5 4 3.5 6a3.5 3.5 0 0 1-7 0c0-2 2-3.5 3.5-6z" />
          <path d="M6 17c-1.5-1-2.5-2.5-2.5-4 0-2 2.5-3 4-1" />
          <path d="M18 17c1.5-1 2.5-2.5 2.5-4 0-2-2.5-3-4-1" />
        </svg>
      ),
    },
    {
      id: "creative",
      label: "Creative",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Angled artist paint brush */}
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          <path d="M3 21h4l2-2-4-4-2 2v4z" />
        </svg>
      ),
    },
    {
      id: "hotel",
      label: "Hotel and Culture",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Desk reception service call bell */}
          <path d="M12 4V2" />
          <path d="M12 4a7 7 0 0 1 7 7v3H5v-3a7 7 0 0 1 7-7z" />
          <path d="M3 17h18a1 1 0 0 1 1 1v2H2v-2a1 1 0 0 1 1-1z" />
        </svg>
      ),
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onCategoryChange?.(id);
  };

  return (
    <div className={`w-full py-2 ${className}`}>
      {/* MOBILE SCROLL ROW */}
      <div
        className="
          flex items-center gap-3
          overflow-x-auto
          scroll-smooth
          px-2 py-2

          /* hide scrollbar */
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          /* snap behavior */
          snap-x snap-mandatory
        "
      >
        {categories.map((cat) => {
          const isActive = selectedId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`
                flex items-center gap-2.5
                px-4 h-[42px]
                rounded-xl
                text-sm font-semibold
                whitespace-nowrap
                shrink-0
                border transition-all duration-200
                snap-start
                active:scale-95
                ${
                  isActive
                    ? "bg-[#1ec6cc] border-[#1ec6cc] text-white shadow-md shadow-[#1ec6cc]/20"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }
              `}
            >
              <span
                className={`transition-colors ${isActive ? "text-white" : "text-slate-500"}`}
              >
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
