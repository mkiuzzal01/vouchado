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
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function FilterDeals({ t }: Props) {
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

  const filterOptions = [
    {
      value: "this_month",
      label:
        t?.provider_profile?.dashboard?.deals_purchased?.table?.filter_by
          ?.this_month,
    },
    {
      value: "previous_month",
      label:
        t?.provider_profile?.dashboard?.deals_purchased?.table?.filter_by
          ?.previous_month,
    },
    {
      value: "redeemed",
      label:
        t?.provider_profile?.dashboard?.deals_purchased?.table?.filter_by
          ?.redeemed,
    },
    {
      value: "not_redeemed",
      label:
        t?.provider_profile?.dashboard?.deals_purchased?.table?.filter_by
          ?.not_redeemed,
    },
  ] as const;

  const activeLabel =
    filterOptions.find((item) => item.value === selectedFilter)?.label ??
    t?.provider_profile?.dashboard?.deals_purchased?.table?.filter_by?.title;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-sm">
          <Filter className="h-4 w-4" />
          {activeLabel}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>
          {
            t?.provider_profile?.dashboard?.deals_purchased?.table?.filter_by
              ?.desc
          }
        </DropdownMenuLabel>
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
