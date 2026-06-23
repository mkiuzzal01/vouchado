"use client";

import Deals from "@/app/components/icons/Deals";
import { Search, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    name: "Premium Spa Package",
    category: "Food & Beverage",
    discount: "30%",
    revenue: "€1,200",
    sold: "40 / 100",
    redemption: "40 / 100",
    remaining: "3 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    name: "Premium Spa Package",
    category: "Leisure & Activities",
    discount: "20%",
    revenue: "€1,500",
    sold: "60 / 150",
    redemption: "60 / 150",
    remaining: "5 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 4,
    name: "Premium Spa Package",
    category: "Travel & Exploration",
    discount: "15%",
    revenue: "€900",
    sold: "30 / 75",
    redemption: "30 / 75",
    remaining: "4 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 5,
    name: "Premium Spa Package",
    category: "Health & Fitness",
    discount: "25%",
    revenue: "€1,800",
    sold: "50 / 100",
    redemption: "50 / 100",
    remaining: "6 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 6,
    name: "Premium Spa Package",
    category: "Food & Beverage",
    discount: "30%",
    revenue: "€1,200",
    sold: "40 / 80",
    redemption: "40 / 80",
    remaining: "3 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 7,
    name: "Premium Spa Package",
    category: "Education",
    discount: "20%",
    revenue: "€1,500",
    sold: "20 / 50",
    redemption: "20 / 50",
    remaining: "5 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 8,
    name: "Premium Spa Package",
    category: "Wellness",
    discount: "15%",
    revenue: "€1,000",
    sold: "30 / 60",
    redemption: "30 / 60",
    remaining: "4 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 9,
    name: "Premium Spa Package",
    category: "Travel",
    discount: "10%",
    revenue: "€900",
    sold: "15 / 40",
    redemption: "15 / 40",
    remaining: "7 days",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80",
  },
];

interface Props {
  title?: string;
  description?: string;
}

export default function ActiveDealsTable({
  title = "Active Deals",
  description = "Currently running",
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Outer Layout Top Bar: Title on Left, Floating Search Bar on Right */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Deals />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {title}
            </h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              {description}
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-xs shadow-sm focus:outline-none focus:border-slate-300 placeholder-slate-400 text-slate-700"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Primary Container Panel Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-700 bg-slate-50/40">
                <th className="py-4 px-6 font-semibold">Deals Name</th>
                <th className="py-4 px-4 font-semibold">Category</th>
                <th className="py-4 px-4 font-semibold">Discount</th>
                <th className="py-4 px-4 font-semibold">Revenue</th>
                <th className="py-4 px-4 font-semibold">Sold</th>
                <th className="py-4 px-4 font-semibold">Redemption</th>
                <th className="py-4 px-4 font-semibold">Remaining</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-500 font-medium">
              {dealItems.map((deal) => (
                <tr
                  key={deal.id}
                  className="hover:bg-slate-50/30 transition-colors duration-150"
                >
                  <td className="py-3 px-6 min-w-[240px]">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        width={50}
                        height={50}
                        className="w-14 h-9 rounded-xl object-cover object-center border border-slate-100 shadow-2xl shrink-0"
                      />
                      <span className="font-bold text-slate-800">
                        {deal.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-normal">
                    {deal.category}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-700">
                    {deal.discount}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">
                    {deal.revenue}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-normal">
                    {deal.sold}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-normal">
                    {deal.redemption}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-normal">
                    {deal.remaining}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center gap-4">
                      {/* Action buttons matching exact layout shades */}
                      <button className="text-[#00C3DA] hover:opacity-70 transition-opacity">
                        <Edit2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button className="text-[#FF5B5C] hover:opacity-70 transition-opacity">
                        <Trash2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Center Pagination Panel matching layout mock */}
        <div className="py-5 border-t border-slate-100 flex justify-center items-center gap-1 text-xs font-bold text-slate-400">
          <button
            className="p-2 text-slate-300 hover:text-slate-500 cursor-not-allowed"
            disabled
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center">
            1
          </button>
          <button className="w-7 h-7 rounded-full hover:bg-slate-50 text-slate-600 flex items-center justify-center transition">
            2
          </button>
          <button className="w-7 h-7 rounded-full hover:bg-slate-50 text-slate-600 flex items-center justify-center transition">
            3
          </button>
          <button className="w-7 h-7 rounded-full hover:bg-slate-50 text-slate-600 flex items-center justify-center transition">
            4
          </button>
          <button className="w-7 h-7 rounded-full hover:bg-slate-50 text-slate-600 flex items-center justify-center transition">
            5
          </button>

          <span className="px-1 text-slate-300 font-normal text-sm">...</span>

          <button className="p-2 text-slate-500 hover:text-slate-800 transition">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
