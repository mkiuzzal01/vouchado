"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ReusablePaginationProps {
  current_page?: number; // Optional fallback, URL parameter takes priority
  per_page?: number;
  total?: number;
  className?: string;
}

export default function ReusablePagination({
  current_page = 1,
  per_page = 10,
  total = 0,
  className = "",
}: ReusablePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Get current page from URL params; fall back to the prop if absent
  const urlPage = searchParams.get("page");
  const currentPage = urlPage ? parseInt(urlPage, 10) : current_page;

  const totalPages = Math.ceil(total / per_page);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      for (let i = 1; i <= leftItemCount; i++) {
        pages.push(i);
      }
      pages.push("ellipsis-right");
      pages.push(totalPages);
      return pages;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      pages.push(1);
      pages.push("ellipsis-left");
      for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      pages.push(1);
      pages.push("ellipsis-left");
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }
      pages.push("ellipsis-right");
      pages.push(totalPages);
      return pages;
    }

    return pages;
  };

  const pages = getPageNumbers();

  // 2. Build updated search parameters string without dropping other filters
  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Pagination className={`select-none my-4 ${className}`}>
      <PaginationContent className="gap-1 text-slate-500">
        {/* Previous Button Arrow */}
        <PaginationItem>
          <button
            onClick={(e) => handlePageClick(e, currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
              currentPage === 1
                ? "text-slate-300 cursor-not-allowed opacity-50"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
        </PaginationItem>

        {/* Dynamic Page Items */}
        {pages.map((page, index) => {
          if (typeof page === "string") {
            return (
              <PaginationItem key={`${page}-${index}`}>
                <PaginationEllipsis className="text-slate-400 px-2" />
              </PaginationItem>
            );
          }

          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={(e) => handlePageClick(e, page)}
                className={`w-10 h-10 text-sm font-medium border-0 transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#edf9fa] text-[#1ec6cc] font-semibold rounded-lg"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button Arrow */}
        <PaginationItem>
          <button
            onClick={(e) => handlePageClick(e, currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
              currentPage === totalPages
                ? "text-slate-300 cursor-not-allowed opacity-50"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
