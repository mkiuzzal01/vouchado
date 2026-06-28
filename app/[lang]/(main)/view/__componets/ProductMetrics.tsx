import { Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import Star from "@/app/components/icons/Star";
import Start from "@/app/components/icons/Start";

interface ProductMetricsProps {
  className?: string;
}

export function ProductMetrics({ className }: ProductMetricsProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground select-none",
        className,
      )}
    >
      {/* Ratings */}
      <div className="flex items-center gap-1.5">
        <Start size={24} />
        <span className="font-bold text-foreground text-3xl">4.8</span>
        <span className="text-lg font-medium text-[#454F5B]">
          (12,500+ reviews)
        </span>
      </div>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-border" aria-hidden="true" />

      {/* Selling Status */}
      <div className="flex items-center gap-1.5">
        <Hourglass className="size-4 stroke-[1.75] text-muted-foreground" />
        <span className="text-lg font-medium text-[#454F5B]">
          Likely to sell out
        </span>
      </div>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-border" aria-hidden="true" />

      {/* Countdown */}
      <div className="text-lg font-medium text-red-500">Ends in 3h</div>
    </div>
  );
}
