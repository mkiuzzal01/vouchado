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
import { getDictionary } from "@/app/[lang]/dictionaries";
import Status from "./Status";

interface IProps {
  t: Awaited<ReturnType<typeof getDictionary>>;
  deal: any;
  lang: string;
}

export default function DealsTable({ deal, t, lang }: IProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-[#F4F6F8]">
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.service}
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.category}
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.customer}
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {
                t?.provider_profile?.dashboard?.deals_purchased?.table
                  ?.voucher_id
              }
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {
                t?.provider_profile?.dashboard?.deals_purchased?.table
                  ?.expire_date
              }
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.rating}
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.purchase}
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.revenue}
            </TableHead>
            <TableHead className="text-base font-semibold text-[#212B36] py-4 px-4">
              {t?.provider_profile?.dashboard?.deals_purchased?.table?.status}
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
                <Status lang={lang} status={row?.status} />
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
