"use client";

import React, { useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
export type ModalWidth =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onModalClose?: () => void;
  children: React.ReactNode;
  title?: string;

  width?: ModalWidth;

  className?: string;
}

const maxWidthClasses: Record<ModalWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  "8xl": "max-w-[88rem]",
  "9xl": "max-w-[96rem]",
};

export default function ModalContainer({
  isOpen,
  onClose,
  children,
  title,
  width = "4xl",
  className,
  onModalClose,
}: ModalContainerProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative flex w-full flex-col bg-white shadow-2xl",
          "max-h-[95vh] rounded-t-3xl sm:rounded-2xl",
          "animate-in fade-in zoom-in-95 duration-200 ease-out",
          maxWidthClasses[width],
          className,
        )}
      >
        <div className="flex justify-center pt-3 sm:hidden" aria-hidden="true">
          <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>

        <header className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl bg-white px-5 py-4 sm:rounded-t-2xl">
          <h2
            id={titleId}
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            {title || "Modal"}
          </h2>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onModalClose ? onModalClose : onClose}
            aria-label="Close modal"
            className="rounded-full text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <X className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 max-h-[calc(95vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
