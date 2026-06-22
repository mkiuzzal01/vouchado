import {
  Search,
  BarChart3,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const dealItems = [
  {
    id: 1,
    name: "Premium Spa Package",
    category: "Beauty & Wellness",
    discount: "50%",
    revenue: "€3,200",
    sold: "125 / 200",
    redemption: "100 / 200",
    remaining: "7 days",
  },
  {
    id: 2,
    name: "Gourmet Tasting Menu",
    category: "Food & Beverage",
    discount: "30%",
    revenue: "€1,200",
    sold: "40 / 100",
    redemption: "40 / 100",
    remaining: "3 days",
  },
  {
    id: 3,
    name: "Guided City Tour",
    category: "Leisure & Activities",
    discount: "20%",
    revenue: "€1,500",
    sold: "60 / 150",
    redemption: "60 / 150",
    remaining: "5 days",
  },
];

export default function DealsTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Table Sub-Header Controls */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-xl text-teal-500">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-800">
            Currently running
          </h2>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 transition text-slate-700"
          />
        </div>
      </div>

      {/* Table Grid Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-6">Deals Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Revenue</th>
              <th className="py-3 px-4">Sold</th>
              <th className="py-3 px-4">Redemption</th>
              <th className="py-3 px-4">Remaining</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs text-slate-600 font-medium">
            {dealItems.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-50/40 transition">
                <td className="py-3.5 px-6 flex items-center gap-3 min-w-[220px]">
                  <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-slate-200" />
                  <span className="font-bold text-slate-800 truncate">
                    {deal.name}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-normal">
                  {deal.category}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-700">
                  {deal.discount}
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-semibold">
                  {deal.revenue}
                </td>
                <td className="py-3.5 px-4 text-slate-500">{deal.sold}</td>
                <td className="py-3.5 px-4 text-slate-500">
                  {deal.redemption}
                </td>
                <td className="py-3.5 px-4 text-slate-500">{deal.remaining}</td>
                <td className="py-3.5 px-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="text-slate-400 hover:text-teal-500 transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls Footer */}
      <div className="p-4 border-t border-slate-50 flex justify-center items-center gap-1.5 text-xs font-semibold text-slate-500">
        <button
          className="p-1.5 rounded-lg border border-slate-200 text-slate-400 opacity-50"
          disabled
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
          1
        </button>
        <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
