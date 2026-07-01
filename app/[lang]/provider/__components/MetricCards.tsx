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
            className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center sm:items-start gap-4">
              {/* Responsive Icon Container Wrapper */}
              <span
                className={`p-4 rounded-xl shrink-0 ${m.color || "bg-gray-100"}`}
              >
                {Icon && (
                  <span className="block sm:hidden">
                    <Icon size={44} />
                  </span>
                )}
                {Icon && (
                  <span className="hidden sm:block">
                    <Icon size={44} />
                  </span>
                )}
              </span>

              {/* Text Layout */}
              <div className="flex flex-col space-y-0.5 min-w-0">
                <h3 className="text-sm sm:text-base xl:text-lg font-medium text-[#161C24] truncate">
                  {m?.title}
                </h3>
                <h4 className="text-xl sm:text-2xl xl:text-3xl font-bold text-[#161C24] truncate">
                  {m?.value}
                </h4>
                {/* Bottom Section: Trend Analytics */}
                {m?.trend && (
                  <div className="pt-1">
                    <p
                      className={`text-xs sm:text-sm font-semibold flex items-center gap-1 ${
                        m.isPositive ? "text-[#229A16]" : "text-red-500"
                      }`}
                    >
                      <span className="text-base leading-none">
                        {m?.isPositive ? "↗" : "↘"}
                      </span>
                      <span>{m?.trend}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
