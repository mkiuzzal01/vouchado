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
import Link from "next/link";

interface IProps {
  deal: any;
}

export default function DealsTable({ deal }: IProps) {
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
          {deal?.data?.slice(0, 5).map((row: any) => (
            <TableRow
              key={row.id}
              className="border-none hover:bg-gray-50/40 transition-colors"
            >
              {/* Service Details */}
              <TableCell className="py-3.5 px-4 flex items-center gap-3 max-w-xs">
                <Image
                  src={row?.service_image}
                  alt={row?.service_name}
                  width={80}
                  height={70}
                  className="w-9 h-7 object-cover rounded-md border border-gray-100 shrink-0"
                />
                <span className="font-bold text-gray-900 truncate">
                  {row?.service_name}
                </span>
              </TableCell>

              {/* Category */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-400 font-semibold">
                {row?.category}
              </TableCell>

              {/* Customer */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row?.customer}
              </TableCell>

              {/* Voucher ID */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-400 font-semibold">
                {row?.voucher_code}
              </TableCell>

              {/* Expire Date */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row?.expire_date}
              </TableCell>

              {/* Rating */}
              <TableCell className="py-3.5 px-4 text-gray-500">
                {row?.rating ? (
                  <div className="flex items-center gap-1">
                    {/* Inline Star Icon */}
                    <Start />
                    <span className=" text-sm text-gray-500 font-semibold">
                      {row?.rating}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 font-semibold">—</span>
                )}
              </TableCell>

              {/* Purchase */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row?.purchase}
              </TableCell>

              {/* Revenue */}
              <TableCell className="py-3.5 px-4 text-sm text-gray-500 font-semibold">
                {row?.revenue}
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
                  {row?.status}
                </span>
              </TableCell>

              {/* Action Chat Trigger */}
              <TableCell className="py-3.5 px-4 text-center">
                <Link href={"/chat"}>
                  <button className="p-1.5 border-3 border-gray-100 text-teal-400 rounded-full bg-white hover:bg-teal-50/30 hover:border-teal-100 transition-all inline-flex items-center justify-center">
                    <SMS />
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
