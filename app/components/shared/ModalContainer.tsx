import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "8px",
          minWidth: "320px",
          maxWidth: "90%",
          padding: "16px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            paddingBottom: "8px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
            {title || "Modal"}
          </h3>

          <Button
            className="w-8 h-8 p-0"
            variant={"destructive"}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </Button>
        </div>

        {/* Body */}
        <div className={cn(className)}>{children}</div>
      </div>
    </div>
  );
}
