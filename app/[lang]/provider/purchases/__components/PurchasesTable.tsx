import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

const mockRows = [
  {
    id: 1,
    name: "Premium Spa Package",
    cat: "Beauty & Wellness",
    user: "Savannah Nguyen",
    buy: "$ 320",
    rev: "$ 290",
    status: "Redeemed",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    name: "Gourmet Dining Experience",
    cat: "Food & Beverage",
    user: "Brooklyn Simmons",
    buy: "$ 280",
    rev: "$ 260",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 3,
    name: "Adventure Sports Package",
    cat: "Leisure & Activities",
    user: "Guy Hawkins",
    buy: "$ 210",
    rev: "$ 190",
    status: "Reject",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 4,
    name: "Cultural Immersion Tour",
    cat: "Travel & Exploration",
    user: "Esther Howard",
    buy: "$ 180",
    rev: "$ 150",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 5,
    name: "Fitness Bootcamp Retreat",
    cat: "Health & Fitness",
    user: "Cameron Williamson",
    buy: "$ 225",
    rev: "$ 200",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 6,
    name: "Culinary Experience Workshop",
    cat: "Food & Beverage",
    user: "Jane Cooper",
    buy: "$ 150",
    rev: "$ 130",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 7,
    name: "Digital Marketing Bootcamp",
    cat: "Education",
    user: "Marvin McKinney",
    buy: "$ 165",
    rev: "$ 100",
    status: "Redeemed",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 8,
    name: "Yoga and Meditation Retreat",
    cat: "Wellness",
    user: "Darrell Steward",
    buy: "$ 135",
    rev: "$ 120",
    status: "Redeemed",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=80&q=80",
  },
];

export default function PurchasesTable() {
  return (
    <Table>
      <TableHeader className="bg-gray-50/60">
        <TableRow className="border-b border-gray-100 hover:bg-transparent">
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4">
            Service Name
          </TableHead>
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4">
            Category
          </TableHead>
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4">
            Customer
          </TableHead>
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4">
            Purchase
          </TableHead>
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4">
            Revenue
          </TableHead>
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4">
            Status
          </TableHead>
          <TableHead className="h-10 text-[11px] font-bold text-gray-400 tracking-wider px-4 text-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
        {mockRows.map((row) => (
          <TableRow
            key={row.id}
            className="border-none hover:bg-gray-50/30 transition-colors"
          >
            {/* Service Item */}
            <TableCell className="py-3.5 px-4 flex items-center gap-3 max-w-xs">
              <Image
                src={row.img}
                alt=""
                width={80}
                height={70}
                className="w-9 h-7 object-cover rounded-md border border-gray-100 shrink-0"
              />
              <span className="font-bold text-gray-900 truncate">
                {row.name}
              </span>
            </TableCell>

            {/* Category */}
            <TableCell className="py-3.5 px-4 text-gray-400 font-medium">
              {row.cat}
            </TableCell>

            {/* Customer */}
            <TableCell className="py-3.5 px-4 text-gray-600">
              {row.user}
            </TableCell>

            {/* Purchase & Revenue prices */}
            <TableCell className="py-3.5 px-4 font-bold text-gray-900">
              {row.buy}
            </TableCell>
            <TableCell className="py-3.5 px-4 font-bold text-gray-900">
              {row.rev}
            </TableCell>

            {/* Status Badge Grouping */}
            <TableCell className="py-3.5 px-4">
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
            </TableCell>

            {/* Action Trigger */}
            <TableCell className="py-3.5 px-4 text-center">
              <button className="p-1.5 border border-gray-100 text-teal-500 rounded-lg bg-white hover:bg-teal-50/50 hover:border-teal-200 transition-all inline-flex items-center justify-center">
                <MessageSquare size={13} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
