"use client";

import { Check, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filterOptions = [
  {
    value: "this_month",
    label: "This Month",
  },
  {
    value: "previous_month",
    label: "Previous Month",
  },
  {
    value: "redeemed",
    label: "Redeemed",
  },
  {
    value: "unredeemed",
    label: "Unredeemed",
  },
] as const;

export default function FilterDeals() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedFilter = searchParams.get("filter");

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeLabel =
    filterOptions.find((item) => item.value === selectedFilter)?.label ??
    "Filter";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-sm">
          <Filter className="h-4 w-4" />
          {activeLabel}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Deals Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {filterOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            className="flex cursor-pointer items-center justify-between"
          >
            {option.label}

            {selectedFilter === option.value && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
