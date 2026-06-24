import { Star, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <Star className="size-4 fill-amber-400 stroke-amber-400" />
        <span className="font-bold text-foreground text-base">4.8</span>
        <span className="text-muted-foreground/90">(12,500+ reviews)</span>
      </div>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-border" aria-hidden="true" />

      {/* Selling Status */}
      <div className="flex items-center gap-1.5">
        <Hourglass className="size-4 stroke-[1.75] text-muted-foreground" />
        <span className="text-muted-foreground/90">Likely to sell out</span>
      </div>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-border" aria-hidden="true" />

      {/* Countdown */}
      <div className="font-medium text-red-500 dark:text-red-400">
        Ends in 3h
      </div>
    </div>
  );
}
