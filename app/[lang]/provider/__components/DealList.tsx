"use client";

import React from "react";
import { Search, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dealItems = [
  {
    id: 1,
    category: "Beauty & Wellness",
    discount: "50%",
    revenue: "€3,200",
    sold: "125 / 200",
    redemption: "100 / 200",
    remaining: "7 days",
  },
  {
    id: 2,
    category: "Food & Beverage",
    discount: "30%",
    revenue: "€1,200",
    sold: "40 / 100",
    redemption: "40 / 100",
    remaining: "3 days",
  },
  {
    id: 3,
    category: "Leisure & Activities",
    discount: "20%",
    revenue: "€1,500",
    sold: "60 / 150",
    redemption: "60 / 150",
    remaining: "5 days",
  },
  {
    id: 4,
    category: "Travel & Exploration",
    discount: "15%",
    revenue: "€900",
    sold: "30 / 75",
    redemption: "30 / 75",
    remaining: "4 days",
  },
  {
    id: 5,
    category: "Health & Fitness",
    discount: "25%",
    revenue: "€1,800",
    sold: "50 / 100",
    redemption: "50 / 100",
    remaining: "6 days",
  },
  {
    id: 6,
    category: "Food & Beverage",
    discount: "30%",
    revenue: "€1,200",
    sold: "40 / 80",
    redemption: "40 / 80",
    remaining: "3 days",
  },
  {
    id: 7,
    category: "Education",
    discount: "20%",
    revenue: "€1,500",
    sold: "20 / 50",
    redemption: "20 / 50",
    remaining: "5 days",
  },
  {
    id: 8,
    category: "Wellness",
    discount: "15%",
    revenue: "€1,000",
    sold: "30 / 60",
    redemption: "30 / 60",
    remaining: "4 days",
  },
  {
    id: 9,
    category: "Travel",
    discount: "10%",
    revenue: "€900",
    sold: "15 / 40",
    redemption: "15 / 40",
    remaining: "7 days",
  },
];

export default function DealList() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
      {/* Outer Layout Top Bar */}
      <div className="py-4">
        <h1 className="text-xl text-slate-800 tracking-tight">Deals list</h1>
      </div>

      {/* Primary Card Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="py-4 px-6 text-slate-700">
                Deals Name
              </TableHead>
              <TableHead className="py-4 px-4 text-slate-700">
                Category
              </TableHead>
              <TableHead className="py-4 px-4 text-slate-700">
                Discount
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold text-slate-700">
                Revenue
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold text-slate-700">
                Sold
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold text-slate-700">
                Redemption
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold text-slate-700">
                Remaining
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold text-center text-slate-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs text-slate-500 font-medium divide-y divide-slate-100">
            {dealItems.map((deal) => (
              <TableRow
                key={deal.id}
                className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors"
              >
                <TableCell className="py-3 px-6 min-w-[240px]">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80"
                      alt="Premium Spa Package"
                      className="w-14 h-9 rounded-xl object-cover border border-slate-100 shrink-0 shadow-sm"
                    />
                    <span className="font-bold text-slate-800">
                      Premium Spa Package
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 text-slate-400 font-normal">
                  {deal.category}
                </TableCell>
                <TableCell className="py-3 px-4 font-bold text-slate-700">
                  {deal.discount}
                </TableCell>
                <TableCell className="py-3 px-4 text-slate-500">
                  {deal.revenue}
                </TableCell>
                <TableCell className="py-3 px-4 text-slate-400 font-normal">
                  {deal.sold}
                </TableCell>
                <TableCell className="py-3 px-4 text-slate-400 font-normal">
                  {deal.redemption}
                </TableCell>
                <TableCell className="py-3 px-4 text-slate-400 font-normal">
                  {deal.remaining}
                </TableCell>
                <TableCell className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-[#00C3DA] hover:opacity-70 transition-opacity">
                      <Edit2 className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button className="text-[#FF5B5C] hover:opacity-70 transition-opacity">
                      <Trash2 className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Panel */}
        <div className="py-5 border-t border-slate-100 flex justify-center items-center gap-1 text-xs font-bold text-slate-400">
          <button className="p-2 text-slate-300 cursor-not-allowed" disabled>
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center">
            1
          </button>
          {[2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className="w-7 h-7 rounded-full hover:bg-slate-50 text-slate-600 flex items-center justify-center transition"
            >
              {page}
            </button>
          ))}

          <span className="px-1 text-slate-300 font-normal text-sm">...</span>

          <button className="p-2 text-slate-500 hover:text-slate-800 transition">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
