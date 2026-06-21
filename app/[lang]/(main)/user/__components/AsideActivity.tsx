const activities = [
  { id: 1, name: "Spa booking", points: "+100", isPositive: true },
  { id: 2, name: "US Olympic & Paralym...", points: "+50", isPositive: true },
  { id: 3, name: "Redeemed €50 vou...", points: "-1000", isPositive: false },
  { id: 4, name: "Spa booking", points: "+100", isPositive: true },
];

export default function AsideActivity() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">
        Recent activities
      </h3>

      <div className="space-y-2">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-1.5 bg-teal-50 rounded-lg text-teal-600 shrink-0">
                {/* Simplified placeholder icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </span>
              <span className="text-xs font-medium text-gray-700 truncate">
                {act.name}
              </span>
            </div>
            <span
              className={`text-xs font-bold shrink-0 ${act.isPositive ? "text-teal-600" : "text-rose-500"}`}
            >
              {act.points}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-3 py-2 text-center text-xs font-semibold text-teal-500 border border-teal-500/30 rounded-xl hover:bg-teal-50/50 transition-colors">
        View more
      </button>
    </div>
  );
}
