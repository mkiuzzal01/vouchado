import React from "react";

interface MetricItem {
  id?: string | number;
  title?: string;
  value?: string;
  trend?: string;
  isPositive?: boolean;
  icon?: React.ComponentType<{ size?: number }>;
  color?: string;
}

export default function MetricCards({ metrics }: { metrics: MetricItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            className="bg-white rounded-2xl p-5 space-y-4 flex justify-start items-start gap-4"
          >
            <div className="flex items-center gap-3">
              <span className={`p-4 rounded-xl shrink-0 ${m.color}`}>
                {Icon && <Icon size={44} />}
              </span>
            </div>

            {/* Bottom Section: Value and Trend */}
            <div className="space-y-1">
              <h3 className="text-sm xl:text-[20px] font-medium text-[#161C24] tracking-wide">
                {m?.title}
              </h3>
              <h3 className="text-[26px] xl:text-[32px] font-bold text-[#161C24] tracking-tight">
                {m?.value}
              </h3>
              {m?.trend && (
                <p
                  className={`text-[14px] font-medium flex items-center gap-1 ${
                    m.isPositive ? "text-[#229A16]" : "text-red-500"
                  }`}
                >
                  {/* Fixed negative arrow direction bug while keeping styling untouched */}
                  <span>{m?.isPositive ? "↗" : "↘"}</span>
                  <span>{m?.trend}</span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
