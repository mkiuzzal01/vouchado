import React from "react";
import { AlertCircle } from "lucide-react";

interface NotFoundDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;

  actionLabel?: string;
  onAction?: () => void;

  className?: string;
}

export default function NotFoundData({
  title = "No data found",
  description = "We couldn't find anything matching your request.",
  icon = <AlertCircle className="w-10 h-10 text-gray-400" />,

  actionLabel,
  onAction,

  className = "",
}: NotFoundDataProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}
    >
      {/* Icon */}
      <div className="mb-3">{icon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1 max-w-sm">{description}</p>

      {/* Optional Action */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 rounded-lg bg-[#2BC4CA] text-white text-sm font-medium hover:bg-[#23AAB0] transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
