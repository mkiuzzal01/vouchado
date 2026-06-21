"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalContainer({
  title,
  className,
  children,
  isOpen,
  onClose,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full",
          "sm:max-w-2xl",
          "bg-white",
          "rounded-t-3xl sm:rounded-2xl",
          "shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          "max-h-[95vh]",
          "flex flex-col",
          className,
        )}
      >
        {/* Mobile drag indicator */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between    bg-white px-5 py-4 rounded-t-3xl sm:rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">
            {title || "Modal"}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full hover:bg-red-50 hover:text-red-500"
          >
            ✕
          </Button>
        </div>

        {/* Body */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-5 py-4",
            "max-h-[calc(95vh-80px)]",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
