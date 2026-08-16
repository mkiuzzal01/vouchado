interface Props {
  stat: any;
}

export default function MetricCards({ stat }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stat?.map((m: any) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            className="bg-white border border-gray-100/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs"
          >
            {/* Top Section: Icon & Header Content */}
            <div>
              <div className="flex items-start gap-3.5 mb-4">
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${
                    m.color || "bg-gray-100"
                  }`}
                >
                  {Icon && <Icon size={24} />}
                </div>

                {/* Card Title */}
                {/* Main Value */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug pt-0.5 min-w-0">
                    {m?.title}
                  </h3>
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {m?.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Section: Separator & Trend Analytics */}
            {m?.trend && (
              <div className="pt-3 border-t border-gray-100">
                <p
                  className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${
                    m.isPositive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  <span className="text-sm leading-none">
                    {m?.isPositive ? "↗" : "↘"}
                  </span>
                  <span>{m?.trend}</span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
