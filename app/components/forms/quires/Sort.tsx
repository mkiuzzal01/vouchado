"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  total: string;
}

const SORT_OPTIONS = [
  { value: "none", label: "Sort By" },
  { value: "popular", label: "Popularity" },
  { value: "low_to_high", label: "Price: Low to High" },
  { value: "high_to_low", label: "Price: High to Low" },
];

export default function Sort({ total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("popular") || "none";

  const handleSortChange = (value: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "none") {
      params.set("popular", value);
    } else {
      params.delete("popular");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === currentSort);

  return (
    <div className="flex items-center justify-between w-full py-4">
      {/* Total Deals Counter */}
      <div>
        <h1 className="text-[#637381] font-medium text-[15px]">
          {total} Deals Available
        </h1>
      </div>

      <div className={cn("w-1/6 min-w-[170px] space-y-1")}>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger
            id="sort"
            style={{ height: "42px" }}
            className="w-full bg-white border-[#E2E8F0] hover:border-slate-300 focus:ring-0 text-black outline-none rounded-md"
          >
            <SelectValue placeholder="Sort By">
              {selectedOption ? selectedOption.label : undefined}
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="bg-white text-black border shadow-md">
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
