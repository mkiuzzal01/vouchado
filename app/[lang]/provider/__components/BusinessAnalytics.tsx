"use client";

import React, { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getDictionary } from "../../dictionaries";

interface ChartDataItem {
  date: string;
  purchases_amount: number;
  purchases_count: number;
  revenue: number;
}

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  analytics: {
    chart_data?: ChartDataItem[];
    summary?: {
      total_purchases_amount: number;
      total_purchases_count: number;
      total_revenue: number;
    };
  };
}

export default function BusinessAnalytics({ analytics, t }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chartConfig = {
    revenue: {
      label: t.provider_profile?.settings?.analytics?.legend.revenue,
      color: "#1ec6cc",
    },
    purchases_count: {
      label: t.provider_profile?.settings?.analytics?.legend.purchases,
      color: "#e2e8f0",
    },
  } satisfies ChartConfig;

  // Read current active matching presets
  const currentFilter =
    searchParams.get("filter") ||
    t.provider_profile?.settings?.analytics?.filter?.this_month;

  // Text label mapper for the trigger indicator element
  const filterLabels: Record<string, string> = {
    this_week: t.provider_profile?.settings?.analytics?.filter?.this_week,
    this_month: t.provider_profile?.settings?.analytics?.filter?.this_month,
    last_3_months:
      t.provider_profile?.settings?.analytics?.filter?.last_3_months,
  };

  const handleFilterChange = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Set filter key
    params.set("filter", filterValue);

    // Manage date parameters if empty or needed for customized intervals
    // If selecting standard filters, you can clear specific custom date metrics
    params.delete("from_date");
    params.delete("to_date");

    // Push state updating router route context smoothly
    router.push(`${pathname}?${params.toString()}`);
  };

  // Extract and format data points for Recharts
  const processedChartData = useMemo(() => {
    if (!analytics?.chart_data || !Array.isArray(analytics.chart_data)) {
      return [];
    }

    return analytics.chart_data.map((item) => {
      let dayLabel = "";
      try {
        const parts = item.date.split("-");
        dayLabel = parts[2] || item.date;
      } catch {
        dayLabel = item.date;
      }
      return {
        ...item,
        day: dayLabel,
      };
    });
  }, [analytics?.chart_data]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Top Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {t.provider_profile?.settings?.analytics?.title}
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full bg-white text-xs font-semibold px-4 py-2 border-slate-200 text-slate-700 shadow-sm gap-2 hover:bg-slate-50 capitalize"
            >
              {filterLabels[currentFilter] ||
                t.provider_profile?.settings?.analytics?.filter
                  ?.select_filter}{" "}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl bg-white border-slate-100 text-xs text-slate-700"
          >
            <DropdownMenuItem onClick={() => handleFilterChange("this_week")}>
              {t.provider_profile?.settings?.analytics?.filter?.this_week}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterChange("this_month")}>
              {t.provider_profile?.settings?.analytics?.filter?.this_month}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterChange("last_3_months")}
            >
              {t.provider_profile?.settings?.analytics?.filter?.last_3_months}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Graph Card Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-[#1ec6cc] tracking-wide">
            {t.provider_profile?.settings?.analytics?.total_revenue}: $
            {analytics?.summary?.total_revenue ?? 0}
          </h2>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#1ec6cc]" />
              <span>
                {t.provider_profile?.settings?.analytics?.legend.revenue}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#e2e8f0]" />
              <span>
                {t.provider_profile?.settings?.analytics?.legend.purchases}
              </span>
            </div>
          </div>
        </div>

        {/* Shadcn Graph Frame Wrapper */}
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedChartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx={0}
                    dy={6}
                    stdDeviation={4}
                    floodColor="#1ec6cc"
                    floodOpacity={0.15}
                  />
                </filter>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                className="text-[11px] font-semibold text-slate-400"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                className="text-[11px] font-semibold text-slate-400"
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={{
                  stroke: "#1ec6cc",
                  strokeWidth: 20,
                  strokeOpacity: 0.12,
                  strokeLinecap: "round",
                }}
                content={<ChartTooltipContent />}
              />
              <Line
                type="monotone"
                dataKey="purchases_count"
                stroke="var(--color-purchases_count)"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={3.5}
                dot={false}
                filter="url(#glow)"
                activeDot={{
                  r: 6,
                  style: { fill: "#1ec6cc", strokeWidth: 0 },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
