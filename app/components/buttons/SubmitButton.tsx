"use client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  loadingTitle?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
};

export default function SubmitButton({
  title,
  loadingTitle = "Processing...",
  isLoading = false,
  className,
  type = "submit",
  onClick,
  disabled,
}: Props) {
  return (
    <Button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={cn(className)}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}

      {isLoading ? loadingTitle : title}
    </Button>
  );
}
