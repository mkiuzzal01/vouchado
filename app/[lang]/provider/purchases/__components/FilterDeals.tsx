"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const filterOptions = [
  {
    key: "time_range",
    value: "this_month",
    label: "This Month",
  },
  {
    key: "time_range",
    value: "previous_month",
    label: "Previous Month",
  },
  {
    key: "status",
    value: "redeemed",
    label: "Redeemed",
  },
  {
    key: "status",
    value: "unredeemed",
    label: "Unredeemed",
  },
];

export default function FilterDeals() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTime = searchParams.get("time_range");
  const currentStatus = searchParams.get("status");

  const activeTimeLabel =
    filterOptions.find(
      (item) => item.key === "time_range" && item.value === currentTime,
    )?.label || "";

  const activeStatusLabel =
    filterOptions.find(
      (item) => item.key === "status" && item.value === currentStatus,
    )?.label || "";

  const filterSummary = [activeTimeLabel, activeStatusLabel]
    .filter(Boolean)
    .join(", ");

  const handleFilterToggle = (
    key: "time_range" | "status" | "RESET",
    value?: string | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "RESET") {
      params.delete("time_range");
      params.delete("status");
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 py-3 px-4 rounded-full text-xs font-bold transition-all shadow-sm border border-transparent",
            filterSummary
              ? "bg-[#31BFC8] text-white"
              : "bg-white text-slate-700 border-slate-200",
          )}
        >
          <Filter className="w-4 h-4" />
          {filterSummary ? `Filter (${filterSummary})` : "Filter"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Deals Filter</DropdownMenuLabel>

        {filterOptions.map((option) => {
          const isActive =
            (option.key === "time_range" && currentTime === option.value) ||
            (option.key === "status" && currentStatus === option.value);

          return (
            <DropdownMenuItem
              key={`${option.key}-${option.value}`}
              onClick={() =>
                handleFilterToggle(
                  option.key as any,
                  isActive ? null : option.value,
                )
              }
            >
              <span>{option.label}</span>

              {isActive && <Check className="w-4 h-4 text-[#31BFC8]" />}
            </DropdownMenuItem>
          );
        })}

        {filterSummary && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleFilterToggle("RESET")}>
              <X className="w-4 h-4 mr-2" />
              Clear Active Filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
