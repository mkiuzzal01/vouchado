import { getDictionary } from "@/app/[lang]/dictionaries";
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
import Status from "../../__components/Status";

interface IPurchaseItem {
  id: number;
  category: string;
  customer: string;
  expire_date: string;
  purchase: string;
  rating: number;
  revenue: string;
  service_image: string;
  service_name: string;
  status: "Redeemed" | "Unredeemed" | "Expired" | string;
  voucher_code: string;
}

interface IProps {
  purchases: {
    data: IPurchaseItem[];
    current_page: number;
    total: number;
  };
  t: Awaited<ReturnType<typeof getDictionary>>;
  lang: string;
}

export default function PurchasesTable({ purchases, t, lang }: IProps) {
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
          {purchases?.data?.map((row) => (
            <TableRow
              key={row.id}
              className="border-none hover:bg-gray-50/40 transition-colors"
            >
              {/* Service Details */}
              <TableCell className="py-3.5 px-4 flex items-center gap-3 max-w-xs">
                {row.service_image ? (
                  <Image
                    src={row.service_image}
                    alt={row.service_name}
                    width={72}
                    height={40}
                    className="object-cover rounded-md aspect-video"
                  />
                ) : (
                  <div className="w-[72px] h-[40px] bg-gray-100 rounded-md" />
                )}
                <span className="text-base font-semibold text-black truncate">
                  {row.service_name} {/* Mapped from service_name */}
                </span>
              </TableCell>

              {/* Category */}
              <TableCell className="text-base text-gray-600 font-normal">
                {row.category}
              </TableCell>

              {/* Customer */}
              <TableCell className="text-base text-gray-600 font-normal">
                {row.customer}
              </TableCell>

              {/* Voucher ID */}
              <TableCell className="text-base text-gray-600 font-normal">
                {row.voucher_code} {/* Mapped from voucher_code */}
              </TableCell>

              {/* Expire Date */}
              <TableCell className="text-base text-gray-600 font-normal">
                {row.expire_date} {/* Mapped from expire_date */}
              </TableCell>

              {/* Rating */}
              <TableCell className="text-gray-500">
                {row.rating > 0 ? (
                  <div className="flex items-center gap-1">
                    <Start />
                    <span className="text-gray-500 font-normal">
                      {row.rating}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 font-medium">—</span>
                )}
              </TableCell>

              {/* Purchase */}
              <TableCell className="py-3.5 px-4 font-bold text-gray-500 text-base">
                ${row.purchase}
              </TableCell>

              {/* Revenue */}
              <TableCell className="py-3.5 px-4 font-bold text-gray-500 text-base">
                ${row.revenue}
              </TableCell>

              {/* Dynamic Badging */}
              <TableCell className="py-3.5 px-4">
                <Status lang={lang} status={row.status} />
              </TableCell>

              {/* Action Chat Trigger */}
              <TableCell className="py-3.5 px-4 text-center">
                <Link href={"/chat"}>
                  <button className="p-1.5 border border-gray-100 text-teal-400 rounded-full bg-white hover:bg-teal-50/30 hover:border-teal-100 transition-all inline-flex items-center justify-center">
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
