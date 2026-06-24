"use client";
import React, { useState } from "react";
import Deal from "../../icons/Deal";
import AdventureIcon from "../../icons/AdventureIcon";
import EatAndDrinks from "../../icons/EatAndDrinks";
import Kid from "../../icons/Kid";
import Wellness from "../../icons/Wellness";
import Hotel from "../../icons/Hotel";
import Pen from "../../icons/Pen";

interface IconProps {
  size?: number;
  color?: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<IconProps>;
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
      icon: Deal,
    },
    {
      id: "adventure",
      label: "Adventure & Sports",
      icon: AdventureIcon,
    },
    {
      id: "food",
      label: "Eat and Drink",
      icon: EatAndDrinks,
    },
    {
      id: "family",
      label: "Family & Kids",
      icon: Kid,
    },
    {
      id: "beauty",
      label: "Beauty & Wellness",
      icon: Wellness,
    },
    {
      id: "creative",
      label: "Creative",
      icon: Pen,
    },
    {
      id: "hotel",
      label: "Hotel and Culture",
      icon: Hotel,
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onCategoryChange?.(id);
  };

  return (
    <div className={`w-full py-2 ${className}`}>
      <div
        className="
          flex items-center gap-3
          overflow-x-auto
          scroll-smooth
          px-2 py-1
          [-ms-overflow-style:none]
          scrollbar-none
          &::-webkit-scrollbar:hidden
          snap-x snap-mandatory
        "
      >
        {categories.map((cat) => {
          const isActive = selectedId === cat.id;

          const IconComponent = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`
                flex items-center gap-2 px-5 h-[46px]
                rounded-xl text-sm font-medium
                whitespace-nowrap shrink-0
                border transition-all duration-200 snap-start
                active:scale-97 outline-none
                ${
                  isActive
                    ? "bg-[#2BBCC2] border-[#2BBCC2] text-white"
                    : "bg-white border-[#E2E8F0] text-[#1F2E3D] hover:border-slate-300"
                }
              `}
            >
              <span className="flex items-center justify-center shrink-0">
                <IconComponent
                  size={24}
                  color={isActive ? "#ffffff" : "#292D32"}
                />
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
