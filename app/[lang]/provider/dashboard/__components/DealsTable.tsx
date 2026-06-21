import React from "react";
import { MessageSquare } from "lucide-react";

const tableData = [
  {
    id: 1,
    service: "Premium Spa Package",
    category: "Beauty & Wellness",
    customer: "Savannah Nguyen",
    purchase: "$ 320",
    revenue: "$ 290",
    status: "Redeemed",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    service: "Gourmet Dining Experience",
    category: "Food & Beverage",
    customer: "Brooklyn Simmons",
    purchase: "$ 280",
    revenue: "$ 260",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 3,
    service: "Adventure Sports Package",
    category: "Leisure & Activities",
    customer: "Guy Hawkins",
    purchase: "$ 210",
    revenue: "$ 190",
    status: "Reject",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80",
  },
];

export default function DealsTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-bold text-gray-400 tracking-wider">
            <th className="py-3 px-4">Service Name</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Purchase</th>
            <th className="py-3 px-4">Revenue</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50/40 transition-colors">
              {/* Service Details Group */}
              <td className="py-3.5 px-4 flex items-center gap-3 max-w-xs">
                <img
                  src={row.img}
                  alt=""
                  className="w-9 h-7 object-cover rounded-md border border-gray-100 shrink-0"
                />
                <span className="font-bold text-gray-900 truncate">
                  {row.service}
                </span>
              </td>

              <td className="py-3.5 px-4 text-gray-400 font-medium">
                {row.category}
              </td>
              <td className="py-3.5 px-4 text-gray-600">{row.customer}</td>
              <td className="py-3.5 px-4 font-bold text-gray-900">
                {row.purchase}
              </td>
              <td className="py-3.5 px-4 font-bold text-gray-900">
                {row.revenue}
              </td>

              {/* Dynamic Badging */}
              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    row.status === "Redeemed"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : row.status === "Unredeemed"
                        ? "bg-gray-50 border-gray-200 text-gray-500"
                        : "bg-rose-50 border-rose-100 text-rose-500"
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${
                      row.status === "Redeemed"
                        ? "bg-emerald-500"
                        : row.status === "Unredeemed"
                          ? "bg-gray-400"
                          : "bg-rose-500"
                    }`}
                  ></span>
                  {row.status}
                </span>
              </td>

              {/* Action Chat Icon link bubble */}
              <td className="py-3.5 px-4 text-center">
                <button className="p-1.5 border border-gray-100 text-teal-500 rounded-lg bg-white hover:bg-teal-50/50 hover:border-teal-200 transition-all inline-flex items-center justify-center">
                  <MessageSquare size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
