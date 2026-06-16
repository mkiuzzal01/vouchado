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

    // If total pages are small, output entire linear sequence without truncation marks
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

    // Case 1: Show right ellipsis only (Close to the beginning)
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      for (let i = 1; i <= leftItemCount; i++) {
        pages.push(i);
      }
      pages.push("ellipsis-right");
      pages.push(totalPages);
      return pages;
    }

    // Case 2: Show left ellipsis only (Close to the end sequence)
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      pages.push(1);
      pages.push("ellipsis-left");
      for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Case 3: Show both left and right ellipses (Dead center float track range)
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
    <Pagination className={`select-none my-6 ${className}`}>
      <PaginationContent className="gap-1.5">
        {/* --- PREVIOUS TRIGGER BUTTON --- */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handlePageClick(e, currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={`rounded-xl border border-gray-100 transition-colors ${
              currentPage === 1
                ? "pointer-events-none opacity-40 cursor-not-allowed"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          />
        </PaginationItem>

        {/* --- DYNAMIC NUMBER CHIPS AND ELLIPSES --- */}
        {pages.map((page, index) => {
          if (typeof page === "string") {
            return (
              <PaginationItem key={`${page}-${index}`}>
                <PaginationEllipsis className="text-slate-400" />
              </PaginationItem>
            );
          }

          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={isActive}
                onClick={(e) => handlePageClick(e, page)}
                className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                  isActive
                    ? "bg-[#1ec6cc] border-[#1ec6cc] text-white hover:bg-[#19a7ad] hover:text-white shadow-sm shadow-[#1ec6cc]/20"
                    : "bg-white border-slate-200/60 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* --- NEXT TRIGGER BUTTON --- */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handlePageClick(e, currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={`rounded-xl border border-gray-100 transition-colors ${
              currentPage === totalPages
                ? "pointer-events-none opacity-40 cursor-not-allowed"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
