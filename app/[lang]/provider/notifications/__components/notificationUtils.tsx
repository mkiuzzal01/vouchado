import React from "react";
import {
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Bell,
  AlertCircle,
} from "lucide-react";

/**
 * Formats a date string into a clean, human-readable relative time string.
 * Supports both German ('de') and English ('en') locales.
 */
export function formatTimeAgo(
  dateString?: string | null,
  lang: string = "en",
): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) return "";

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const isDe = lang === "de";

  // If clock skew or future date under 30 seconds, treat as just now
  if (seconds < 30) return isDe ? "Gerade eben" : "Just now";
  if (seconds < 60) return isDe ? `vor ${seconds} Sek.` : `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return isDe ? `vor ${minutes} Min.` : `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return isDe ? `vor ${hours} Std.` : `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return isDe ? `vor ${days} T.` : `${days}d ago`;

  // Standard date format for older notifications
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return date.toLocaleDateString(isDe ? "de-DE" : "en-US", options);
}

/**
 * Returns dynamic badge styling and icon based on notification title/type.
 * Supports both English and German keywords.
 */
export function getNotificationBadge(title: string = "") {
  const lowerTitle = title.toLowerCase();

  // Orders / Purchases / Vouchers
  if (
    lowerTitle.includes("order") ||
    lowerTitle.includes("purchase") ||
    lowerTitle.includes("voucher") ||
    lowerTitle.includes("bestellung") ||
    lowerTitle.includes("kauf") ||
    lowerTitle.includes("gekauft") ||
    lowerTitle.includes("gutschein") ||
    lowerTitle.includes("einlösung") ||
    lowerTitle.includes("redeem") ||
    lowerTitle.includes("redemption")
  ) {
    return {
      icon: <ShoppingBag className="w-4 h-4 text-blue-600" />,
      bg: "bg-blue-50 border-blue-100",
      dotColor: "bg-blue-500",
    };
  }

  // Payments / Payouts
  if (
    lowerTitle.includes("paid") ||
    lowerTitle.includes("payment") ||
    lowerTitle.includes("payout") ||
    lowerTitle.includes("stripe") ||
    lowerTitle.includes("zahlung") ||
    lowerTitle.includes("bezahlt") ||
    lowerTitle.includes("überweisung") ||
    lowerTitle.includes("auszahlung")
  ) {
    return {
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
      dotColor: "bg-emerald-500",
    };
  }

  // Services / Deals / Promotions
  if (
    lowerTitle.includes("service") ||
    lowerTitle.includes("deal") ||
    lowerTitle.includes("dienst") ||
    lowerTitle.includes("dienstleistung") ||
    lowerTitle.includes("angebot") ||
    lowerTitle.includes("rabatt") ||
    lowerTitle.includes("discount")
  ) {
    return {
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      bg: "bg-purple-50 border-purple-100",
      dotColor: "bg-purple-500",
    };
  }

  // Alerts / Warnings / Stocks
  if (
    lowerTitle.includes("alert") ||
    lowerTitle.includes("warning") ||
    lowerTitle.includes("warnung") ||
    lowerTitle.includes("alarm") ||
    lowerTitle.includes("achtung") ||
    lowerTitle.includes("stock") ||
    lowerTitle.includes("bestand") ||
    lowerTitle.includes("wichtig") ||
    lowerTitle.includes("important")
  ) {
    return {
      icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
      bg: "bg-amber-50 border-amber-100",
      dotColor: "bg-amber-500",
    };
  }

  return {
    icon: <Bell className="w-4 h-4 text-teal-600" />,
    bg: "bg-teal-50 border-teal-100",
    dotColor: "bg-teal-500",
  };
}
