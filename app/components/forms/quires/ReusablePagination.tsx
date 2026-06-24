"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ArrowRight,
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: ReusablePaginationProps) {
  // Safe validation fallback guard rails
  if (totalPages <= 1) return null;

  // Helper routine to generate pagination arrays with ellipsis markers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1; // Number of page buttons to show on either side of active index

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

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  return (
    <Pagination className={`select-none my-4 ${className}`}>
      <PaginationContent className="gap-1 text-slate-500">
        {/* --- PREVIOUS TRIGGER BUTTON --- */}
        <PaginationItem>
          <ChevronLeft />
        </PaginationItem>

        {/* --- DYNAMIC NUMBER CHIPS AND ELLIPSES --- */}
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
                className={`w-10 h-10 text-sm font-medium border-0 transition-all ${
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

        {/* --- NEXT TRIGGER BUTTON --- */}
        <PaginationItem>
          <ChevronRight />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
