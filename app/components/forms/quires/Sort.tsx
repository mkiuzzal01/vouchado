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
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  total: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function Sort({ total, t }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const SORT_OPTIONS = [
    { value: "none", label: t.shared.sort.title },
    { value: "popular", label: t.shared.sort.options.popular },
    { value: "low_to_high", label: t.shared.sort.options.low_to_high },
    { value: "high_to_low", label: t.shared.sort.options.high_to_low },
  ];

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
          {total} {t.nearby.deals_available}
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
