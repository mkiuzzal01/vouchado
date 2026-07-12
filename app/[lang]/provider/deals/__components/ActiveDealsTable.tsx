"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
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

interface DealItem {
  id: number;
  name: string;
  category: string;
  discount: string;
  revenue: string;
  sold: string;
  redemption: string;
  remaining: string;
  image: string;
}

const INITIAL_DEAL_ITEMS: DealItem[] = [
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
    name: "Luxury Dining Experience",
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
    name: "Adventure Theme Park Pass",
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
    name: "Guided City Helicopter Tour",
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
    name: "Crossfit Yoga Monthly Core",
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
    name: "Gourmet Wine Tasting Menu",
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
    name: "Introductory Coding Bootcamp",
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
    name: "Aromatherapy Massage Session",
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
    name: "Weekend Getaway Resort Stay",
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
  // Stateful engines tracking table modifications
  const [deals, setDeals] = useState<DealItem[]>(INITIAL_DEAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dealToDelete, setDealToDelete] = useState<DealItem | null>(null);

  const ITEMS_PER_PAGE = 5;

  // 1. Live Filtering Compute Logic
  const filteredDeals = useMemo(() => {
    return deals.filter(
      (deal) =>
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [deals, searchQuery]);

  // 2. Pagination Math Limits
  const totalPages = Math.ceil(filteredDeals.length / ITEMS_PER_PAGE) || 1;

  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDeals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDeals, currentPage]);

  // Handle automatic rollback if a filtered query reduces the valid page lengths
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredDeals, totalPages, currentPage]);

  // 3. Confirm Delete Operational Logic
  const handleConfirmDelete = () => {
    if (!dealToDelete) return;
    setDeals((prev) => prev.filter((item) => item.id !== dealToDelete.id));
    setDealToDelete(null);
  };

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

        {/* Input field structured under shadcn guidelines */}
        <div className="relative w-full sm:w-80">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Drop index parameters cleanly back to root page 1 on active searching
            }}
            placeholder="Search here..."
            className="w-full pl-4 pr-10 h-10 rounded-full text-xs placeholder:text-slate-400 focus-visible:ring-1 text-slate-700"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Primary Container Table Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full text-xs">
            <TableHeader className="bg-slate-50/40">
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="h-12 px-6 font-semibold text-slate-700 text-left">
                  Deals Name
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  Category
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  Discount
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  Revenue
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  Sold
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  Redemption
                </TableHead>
                <TableHead className="h-12 px-4 font-semibold text-slate-700 text-left">
                  Remaining
                </TableHead>
                <TableHead className="h-12 px-6 font-semibold text-slate-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-slate-500 font-medium">
              {paginatedDeals.length > 0 ? (
                paginatedDeals.map((deal) => (
                  <TableRow
                    key={deal.id}
                    className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors duration-150"
                  >
                    <TableCell className="py-3 px-6 min-w-[240px]">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-[72px] h-[40px] rounded-lg overflow-hidden shrink-0 border border-slate-100">
                          <Image
                            src={deal.image}
                            alt={deal.name}
                            fill
                            sizes="72px"
                            className="object-cover object-center"
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-800 line-clamp-1">
                          {deal.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-400 font-normal">
                      {deal.category}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className="font-normal text-slate-700 bg-slate-100/80 hover:bg-slate-100 rounded-md px-2 py-0.5"
                      >
                        {deal.discount}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-500 font-normal">
                      {deal.revenue}
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
                        <Link href={`/en/provider/deals/${deal.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 rounded-full text-[#00C3DA] hover:text-[#00C3DA] hover:bg-[#00C3DA]/10 transition-colors"
                          >
                            <Edit />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDealToDelete(deal)}
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

        {/* Center Pagination Block natively handled with responsive actions */}
        {totalPages > 1 && (
          <div className="py-5 border-t border-slate-100 flex justify-center items-center gap-1 text-xs font-bold text-slate-400">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-slate-500 hover:bg-slate-50 disabled:opacity-30 p-0"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </Button>

            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNumber = idx + 1;
              const isActive = currentPage === pageNumber;
              return (
                <Button
                  key={pageNumber}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-7 h-7 rounded-full font-bold p-0 shadow-none ${
                    isActive
                      ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-slate-500 hover:bg-slate-50 disabled:opacity-30 p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </div>
        )}
      </div>

      {/* Structured Core Reusable Delete Alert */}
      <ReusableAlert
        open={dealToDelete !== null}
        onOpenChange={(open) => !open && setDealToDelete(null)}
        title="Delete Active Deal Package?"
        description={`Are you completely sure you want to drop "${dealToDelete?.name || ""}"? This step is completely irreversible and wipes active analytics and data statistics mappings immediately.`}
        confirmText="Confirm Deletion"
        onConfirm={handleConfirmDelete}
        variant="danger"
      />
    </div>
  );
}
