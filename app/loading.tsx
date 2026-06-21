import { Loader2 } from "lucide-react";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Loader({
  className = "",
  size = "md",
  text = "Loading...",
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center gap-3 p-4 animate-in fade-in duration-300 ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && (
        <p className="text-sm font-medium text-muted-foreground tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}
