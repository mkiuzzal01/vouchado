import SMS from "@/app/components/icons/SMS";
import Start from "@/app/components/icons/Start";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const tableData = [
  {
    id: 1,
    service: "Premium Spa Package",
    category: "Beauty & Wellness",
    customer: "Savannah Nguyen",
    voucherId: "ID: 22739",
    expireDate: "9/4/12",
    rating: 5,
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
    voucherId: "ID: 43178",
    expireDate: "1/3/14",
    rating: null,
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
    voucherId: "ID: 22739",
    expireDate: "1/15/12",
    rating: null,
    purchase: "$ 210",
    revenue: "$ 190",
    status: "Reject",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 4,
    service: "Cultural Immersion Tour",
    category: "Travel & Exploration",
    customer: "Esther Howard",
    voucherId: "ID: 39635",
    expireDate: "12/4/17",
    rating: null,
    purchase: "$ 180",
    revenue: "$ 150",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 5,
    service: "Fitness Bootcamp Retreat",
    category: "Health & Fitness",
    customer: "Cameron Williams...",
    voucherId: "ID: 43756",
    expireDate: "7/18/17",
    rating: null,
    purchase: "$ 225",
    revenue: "$ 200",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 6,
    service: "Culinary Experience Works...",
    category: "Food & Beverage",
    customer: "Jane Cooper",
    voucherId: "ID: 70668",
    expireDate: "4/4/18",
    rating: null,
    purchase: "$ 150",
    revenue: "$ 130",
    status: "Unredeemed",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 7,
    service: "Yoga and Meditation Retreat",
    category: "Wellness",
    customer: "Darrell Steward",
    voucherId: "ID: 97174",
    expireDate: "8/21/15",
    rating: 5,
    purchase: "$ 135",
    revenue: "$ 120",
    status: "Redeemed",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=80&q=80",
  },
];

export default function DealsTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-[#F4F6F8]">
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Service Name
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Category
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Customer
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Voucher ID
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Expire Date
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Reating
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Purchase
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Revenue
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              Status
            </TableHead>
            <TableHead className="w-16 py-4 px-4"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              className="border-none hover:bg-gray-50/40 transition-colors"
            >
              {/* Service Details */}
              <TableCell className="py-3.5 px-4 flex items-center gap-3 max-w-xs">
                <Image
                  src={row.img}
                  alt=""
                  width={80}
                  height={70}
                  className="w-9 h-7 object-cover rounded-md border border-gray-100 shrink-0"
                />
                <span className="font-bold text-gray-900 truncate">
                  {row.service}
                </span>
              </TableCell>

              {/* Category */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-400 font-semibold">
                {row.category}
              </TableCell>

              {/* Customer */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row.customer}
              </TableCell>

              {/* Voucher ID */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-400 font-semibold">
                {row.voucherId}
              </TableCell>

              {/* Expire Date */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row.expireDate}
              </TableCell>

              {/* Rating */}
              <TableCell className="py-3.5 px-4 text-gray-500">
                {row.rating ? (
                  <div className="flex items-center gap-1">
                    {/* Inline Star Icon */}
                    <Start />
                    <span className=" text-sm text-gray-500 font-semibold">
                      {row.rating}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 font-semibold">—</span>
                )}
              </TableCell>

              {/* Purchase */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row.purchase}
              </TableCell>

              {/* Revenue */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row.revenue}
              </TableCell>

              {/* Dynamic Badging */}
              <TableCell className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-semibold border ${
                    row.status === "Redeemed"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : row.status === "Unredeemed"
                        ? "bg-slate-50 border-slate-200 text-slate-500"
                        : "bg-rose-50 border-rose-100 text-rose-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      row.status === "Redeemed"
                        ? "bg-emerald-500"
                        : row.status === "Unredeemed"
                          ? "bg-slate-400"
                          : "bg-rose-500"
                    }`}
                  ></span>
                  {row.status}
                </span>
              </TableCell>

              {/* Action Chat Trigger */}
              <TableCell className="py-3.5 px-4 text-center">
                <button className="p-1.5 border-3 border-gray-100 text-teal-400 rounded-full bg-white hover:bg-teal-50/30 hover:border-teal-100 transition-all inline-flex items-center justify-center">
                  <SMS />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
