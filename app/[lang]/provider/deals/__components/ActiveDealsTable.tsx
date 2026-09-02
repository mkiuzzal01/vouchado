"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Deals from "@/app/components/icons/Deals";
import Edit from "@/app/components/icons/Edit";
import Delete from "@/app/components/icons/Delete";
import ReusableAlert from "@/app/components/shared/ReusableAlart";
import { useDeleteDealMutation } from "@/redux/features/deal/deal.api";
import { toast } from "react-toastify";
import ModalContainer from "@/app/components/shared/ModalContainer";
import ChangeStatusForm from "@/app/components/forms/ChangeStatusForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDictionary } from "@/app/[lang]/dictionaries";

export interface IDeal {
  id: number;
  deal_name: string;
  image: string;
  category: string;
  discount: string;
  revenue: number;
  sold: string;
  redemption: string;
  sold_count: number;
  redeemed_count: number;
  total_limit: number;
  remaining: string;
  status: string;
}

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  title?: string;
  description?: string;
  payload?: {
    status?: number;
    message?: string;
    data?: {
      current_page: number;
      data: IDeal[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  };
}

export default function ActiveDealsTable({
  title = "Active Deals",
  description = "Currently running",
  payload,
  t,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [deleteDeal] = useDeleteDealMutation();
  // Stores the target deal ID when user clicks delete action button
  const [activeDeleteId, setActiveDeleteId] = useState<number | null>(null);
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false);
  const [targetDealID, setTargetDealID] = useState<number | null>(null);
  const [targetDealStatus, setTargetDealStatus] = useState<string | null>(null);

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "all";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [statusQuery, setStatusQuery] = useState(currentStatus);

  // Sync internal states if URL parameters change externally
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setStatusQuery(searchParams.get("status") || "all");
  }, [searchParams]);

  // Handle search updates to URL with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }
      params.delete("page");

      // Avoid redundant navigations if search state matches URL parameter
      if ((searchParams.get("search") || "") !== searchTerm.trim()) {
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, pathname, router, searchParams]);

  // Handle status select change
  const handleStatusQuery = (value: any) => {
    setStatusQuery(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    // Reset page on filter change
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleChangeStatus = (dealID: number, currentStatus: string) => {
    setTargetDealID(dealID);
    setTargetDealStatus(currentStatus);
    setIsOpenStatusModal(true);
  };

  // Central Router Page Trigger
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleDelete = async () => {
    if (!activeDeleteId) return;

    try {
      const res = await deleteDeal(activeDeleteId).unwrap();
      if (res.message) {
        toast.success(res.message);
        setActiveDeleteId(null);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong during deletion",
      );
    }
  };

  const dealsList = payload?.data?.data || [];
  const currentPage = payload?.data?.current_page || 1;
  const lastPage = payload?.data?.last_page || 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 space-y-6">
      {/* Outer Layout Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
            <Deals />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight truncate">
              {title}
            </h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5 truncate">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Select value={statusQuery} onValueChange={handleStatusQuery}>
              <SelectTrigger className="w-[120px] h-10 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">
                  {t?.provider_profile?.dashboard?.active_deals?.filter_by?.all}
                </SelectItem>
                <SelectItem value="active">
                  {
                    t?.provider_profile?.dashboard?.active_deals?.filter_by
                      ?.active
                  }
                </SelectItem>
                <SelectItem value="inactive">
                  {
                    t?.provider_profile?.dashboard?.active_deals?.filter_by
                      ?.inactive
                  }
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full sm:w-80">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                t?.provider_profile?.dashboard?.active_deals?.search
                  ?.placeholder || "Search here..."
              }
              className={`w-full pl-4 pr-10 h-10 rounded-full text-xs placeholder:text-slate-400 focus-visible:ring-1 text-slate-700 transition-opacity ${
                isPending ? "opacity-70" : "opacity-100"
              }`}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Primary Container Table Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full text-xs">
            <TableHeader className="bg-slate-50/40">
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="h-12 px-6 font-semibold text-slate-700 text-left">
                  {t?.provider_profile?.dashboard?.active_deals?.table?.deals}
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  {
                    t?.provider_profile?.dashboard?.active_deals?.table
                      ?.category
                  }
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  {
                    t?.provider_profile?.dashboard?.active_deals?.table
                      ?.discount
                  }
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  {t?.provider_profile?.dashboard?.active_deals?.table?.revenue}
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  {t?.provider_profile?.dashboard?.active_deals?.table?.sold}
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  {
                    t?.provider_profile?.dashboard?.active_deals?.table
                      ?.redemption
                  }
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  {
                    t?.provider_profile?.dashboard?.active_deals?.table
                      ?.remaining
                  }
                </TableHead>
                <TableHead className="h-12 px-6 font-semibold text-slate-700 text-center">
                  {t?.provider_profile?.dashboard?.active_deals?.table?.action}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-slate-500 font-medium">
              {dealsList.length > 0 ? (
                dealsList.map((deal) => (
                  <TableRow
                    key={deal.id}
                    className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors duration-150"
                  >
                    <TableCell className="py-3 px-6 min-w-[240px]">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-[72px] h-[40px] rounded-lg overflow-hidden shrink-0 border border-slate-100">
                          <Image
                            src={deal.image}
                            alt={deal.deal_name}
                            fill
                            sizes="72px"
                            className="object-cover object-center"
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-800 line-clamp-1">
                          {deal.deal_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-400 font-normal">
                      {deal.category}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className="font-normal text-slate-700 bg-slate-200 hover:bg-slate-200 rounded-md px-2 py-0.5"
                      >
                        {deal.discount}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-500 font-normal">
                      ${deal.revenue}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-400 font-normal">
                      {deal.sold}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-400 font-normal">
                      {deal.redemption}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-400 font-normal">
                      {deal.remaining}
                    </TableCell>
                    <TableCell className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleChangeStatus(deal?.id, deal?.status)
                          }
                          className="w-8 h-8 rounded-full text-[#00C3DA] hover:text-[#00C3DA] hover:bg-[#00C3DA]/10 transition-colors"
                        >
                          <Edit />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setActiveDeleteId(deal.id)}
                          className="w-8 h-8 rounded-full text-[#FF5B5C] hover:text-[#FF5B5C] hover:bg-[#FF5B5C]/10 transition-colors"
                        >
                          <Delete />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No active packages or matching deals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {lastPage > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">
              Page {currentPage} of {lastPage}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isPending}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage || isPending}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Component */}
      <ReusableAlert
        open={activeDeleteId !== null}
        onOpenChange={(open) => !open && setActiveDeleteId(null)}
        title="Delete Deal Package?"
        description="This action is completely irreversible. Your active package configuration, statistical profile history, and transaction record listings will be permanently erased instantly."
        confirmText="Confirm Deletion"
        onConfirm={handleDelete}
        variant="danger"
      />

      <ModalContainer
        width="sm"
        isOpen={isOpenStatusModal}
        onClose={() => setIsOpenStatusModal(false)}
        title={t?.provider_profile?.dashboard?.active_deals?.status?.title}
      >
        <ChangeStatusForm
          t={t}
          targetId={targetDealID}
          targetDealStatus={targetDealStatus}
          onClose={() => setIsOpenStatusModal(false)}
        />
      </ModalContainer>
    </div>
  );
}
