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
      label: "All Services",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
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
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
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
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
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

          /* IMPORTANT: snap behavior */
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
                    ? "bg-[#1ec6cc] border-[#1ec6cc] text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }
              `}
            >
              <span className={isActive ? "text-white" : "text-slate-500"}>
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
