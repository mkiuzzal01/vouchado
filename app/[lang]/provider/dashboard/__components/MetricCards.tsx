import React from "react";
import {
  ShoppingBag,
  BarChart3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const metrics = [
  {
    id: 1,
    title: "Deals Sold This Month",
    value: "245",
    trend: "12% this month",
    isPositive: true,
    icon: ShoppingBag,
    color: "text-blue-500 bg-blue-50",
  },
  {
    id: 2,
    title: "Deals Sold (Total)",
    value: "1,782",
    trend: null,
    isPositive: true,
    icon: BarChart3,
    color: "text-teal-500 bg-teal-50",
  },
  {
    id: 3,
    title: "Deals Redeemed",
    value: "1,567",
    trend: "12% this month",
    isPositive: true,
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    id: 4,
    title: "Deals yet Unredeemed",
    value: "526",
    trend: "3% increase",
    isPositive: true,
    icon: AlertCircle,
    color: "text-orange-500 bg-orange-50",
  },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2.5">
              <span className={`p-2 rounded-xl shrink-0 ${m.color}`}>
                <Icon size={16} />
              </span>
              <span className="text-[11px] font-bold text-gray-400 tracking-wide uppercase">
                {m.title}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {m.value}
              </h3>
              {m.trend && (
                <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                  ↗ <span className="opacity-90">{m.trend}</span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
