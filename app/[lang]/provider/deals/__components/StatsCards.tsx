import { DollarSign, CheckCircle, AlertCircle, Ticket } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Revenue",
    value: "€4,580",
    icon: DollarSign,
    bgColor: "bg-blue-50 text-blue-500",
  },
  {
    id: 2,
    title: "Total Active",
    value: "245",
    icon: CheckCircle,
    bgColor: "bg-emerald-50 text-emerald-500",
  },
  {
    id: 3,
    title: "Total Expired",
    value: "12",
    icon: AlertCircle,
    bgColor: "bg-cyan-50 text-cyan-500",
  },
  {
    id: 4,
    title: "Redemption",
    value: "25",
    icon: Ticket,
    bgColor: "bg-teal-50 text-teal-500",
    showSeeAll: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative flex flex-col justify-between min-h-[110px]"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <stat.icon
                  className={`w-4 h-4 p-0.5 rounded-md ${stat.bgColor}`}
                />
                {stat.title}
              </span>
              <h3 className="text-2xl font-bold text-slate-800">
                {stat.value}
              </h3>
            </div>
            {stat.showSeeAll && (
              <button className="text-xs font-medium text-teal-500 hover:underline absolute top-6 right-6">
                See all
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
