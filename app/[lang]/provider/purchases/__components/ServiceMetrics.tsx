import React from "react";
import { DollarSign, CheckCircle2, Clock } from "lucide-react";

export default function ServiceMetrics() {
  const metrics = [
    {
      title: "Deal Sold",
      value: "210",
      icon: DollarSign,
      color: "text-blue-500 bg-blue-50/60",
    },
    {
      title: "Deal Redeemed",
      value: "165",
      icon: CheckCircle2,
      color: "text-teal-500 bg-teal-50/60",
    },
    {
      title: "Redemption Pending",
      value: "46",
      icon: Clock,
      color: "text-cyan-500 bg-cyan-50/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {metrics.map((m, index) => {
        const Icon = m.icon;
        return (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${m.color}`}>
                <Icon size={14} />
              </span>
              <span className="text-[11px] font-bold text-gray-400 tracking-wide">
                {m.title}
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {m.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
