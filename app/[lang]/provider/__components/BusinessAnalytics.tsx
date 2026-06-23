"use client";

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

// --- Mock Data representing 30 days ---
const chartData = [
  { day: "01", revenue: 7.0, purchase: 2.0 },
  { day: "02", revenue: 7.5, purchase: 2.0 },
  { day: "03", revenue: 7.9, purchase: 2.1 },
  { day: "04", revenue: 8.1, purchase: 2.5 },
  { day: "05", revenue: 8.2, purchase: 3.0 },
  { day: "06", revenue: 8.1, purchase: 3.5 },
  { day: "07", revenue: 7.8, purchase: 4.0 },
  { day: "08", revenue: 7.3, purchase: 4.0 },
  { day: "09", revenue: 6.8, purchase: 3.5 },
  { day: "10", revenue: 6.5, purchase: 3.0 },
  { day: "11", revenue: 6.5, purchase: 2.5 },
  { day: "12", revenue: 6.8, purchase: 2.2 },
  { day: "13", revenue: 7.2, purchase: 2.1 }, // Highlighted day in image
  { day: "14", revenue: 7.7, purchase: 2.1 },
  { day: "15", revenue: 8.1, purchase: 2.2 },
  { day: "16", revenue: 8.3, purchase: 2.3 },
  { day: "17", revenue: 8.4, purchase: 2.4 },
  { day: "18", revenue: 8.2, purchase: 2.4 },
  { day: "19", revenue: 7.8, purchase: 2.3 },
  { day: "20", revenue: 7.2, purchase: 2.2 },
  { day: "21", revenue: 6.5, purchase: 2.2 },
  { day: "22", revenue: 5.9, purchase: 2.4 },
  { day: "23", revenue: 5.5, purchase: 2.5 },
  { day: "24", revenue: 5.3, purchase: 2.5 },
  { day: "25", revenue: 5.6, purchase: 2.2 },
  { day: "26", revenue: 6.2, purchase: 2.0 },
  { day: "27", revenue: 6.9, purchase: 1.8 },
  { day: "28", revenue: 7.5, purchase: 1.8 },
  { day: "29", revenue: 8.0, purchase: 1.9 },
  { day: "30", revenue: 8.5, purchase: 1.9 },
];

// --- Shadcn Chart Style Configuration ---
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#1ec6cc",
  },
  purchase: {
    label: "Purchase",
    color: "#e2e8f0",
  },
} satisfies ChartConfig;

export default function BusinessAnalytics() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Top Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Business Analytics
        </h1>

        {/* Shadcn Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full bg-white text-xs font-semibold px-4 py-2 border-slate-200 text-slate-700 shadow-sm gap-2 hover:bg-slate-50"
            >
              This Month <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-slate-100 text-xs text-slate-700"
          >
            <DropdownMenuItem>This Week</DropdownMenuItem>
            <DropdownMenuItem>This Month</DropdownMenuItem>
            <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Graph Card Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        {/* Graph Inner Sub-header Legend */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-[#1ec6cc] tracking-wide">
            Total Revenue
          </h2>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#1ec6cc]" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#e2e8f0]" />
              <span>Purchase</span>
            </div>
          </div>
        </div>

        {/* Shadcn Graph Frame Wrapper */}
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                {/* Glow Filter logic to create smooth visual line drop-shadow blur effect */}
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
                domain={[0, 12]}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                ticks={[0, 2, 4, 6, 8, 10, 12]}
                className="text-[11px] font-semibold text-slate-400"
              />

              {/* Native Shadcn custom interactive Tooltip setup */}
              <ChartTooltip
                cursor={{
                  stroke: "#1ec6cc",
                  strokeWidth: 20,
                  strokeOpacity: 0.12,
                  strokeLinecap: "round",
                }}
                content={<ChartTooltipContent />}
              />

              {/* Purchase Curve (Light Gray Line) */}
              <Line
                type="monotone"
                dataKey="purchase"
                stroke="var(--color-purchase)"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />

              {/* Revenue Curve (Teal Main Highlighted Line) */}
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
