"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Accessibility,
  CheckCircle2,
  Sparkles,
  Star,
  Layers,
  Flame,
  Smartphone,
  Zap,
  Heart,
  MessageSquare,
  Lock,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import { setStep } from "@/redux/features/provider/deal.slice";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type TabType = "overview" | "included" | "visitor" | "reviews";

export default function Preview() {
  const dispatch = useDispatch();
  const dealState = useAppSelector((state) => state.deal);
  const { media, dealInfo, dealDetails, overview } = dealState;

  // Track the active UI tab matching the design navigation
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [ticketCount, setTicketCount] = useState(1);

  // Helper safely handling both arrays and comma-separated strings
  const parsePoints = (input: unknown): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map((p) => String(p).trim()).filter(Boolean);
    }

    if (typeof input === "string") {
      return input
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    return [];
  };

  const submitCompletedPayload = () => {
    console.log("Final State Submitted:", dealState);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* 2-COLUMN GRID SYSTEM (Left: 8 Cols | Right: 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Title & Hero Description */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              {dealDetails.deal_name || "US Olympic & Paralympic Museum Ticket"}
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-medium">
              {dealDetails.shortDescription ||
                "Experience America's Olympic history through interactive exhibits."}
            </p>
          </div>

          {/* Quick Info Feature Badges Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-600">
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 py-1 px-2.5 flex items-center gap-1 rounded-md"
            >
              <Zap size={13} className="fill-emerald-600 text-emerald-600" />{" "}
              Instant Confirmation
            </Badge>
            <Badge
              variant="secondary"
              className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50 border-cyan-100 py-1 px-2.5 flex items-center gap-1 rounded-md"
            >
              <Smartphone size={13} /> Mobile Ticket
            </Badge>
            <Badge
              variant="secondary"
              className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100 py-1 px-2.5 flex items-center gap-1 rounded-md"
            >
              <Flame size={13} className="fill-amber-600" /> Likely to sell out
            </Badge>
          </div>

          {/* Reviews Star Score Metric line */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center text-amber-400 font-bold gap-1">
              <Star size={16} className="fill-amber-400" />
              <span className="text-slate-900 font-extrabold">4.8</span>
            </div>
            <span className="text-slate-400">(12,500+ reviews)</span>
          </div>

          {/* Main Showcase Hero Banner Image & Thumbnails */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden aspect-square w-full max-h-[420px] relative border bg-slate-100 shadow-sm">
              <Image
                src={
                  media.coverImage ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
                }
                alt="Main Showcase Screen Display"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Micro Thumbnail Row Layout */}
            {media.galleryImages && media.galleryImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {media.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-14 rounded-lg overflow-hidden border bg-muted shrink-0"
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail preview ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TABBED INTERFACE SYSTEM NAVIGATION */}
          <div className="border-b flex gap-6 text-sm font-bold text-slate-400">
            {(["overview", "included", "visitor", "reviews"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition-all border-b-2 font-bold ${
                    activeTab === tab
                      ? "text-[#29b6be] border-[#29b6be]"
                      : "border-transparent hover:text-slate-600"
                  }`}
                >
                  {tab === "visitor"
                    ? "Visitor Info"
                    : tab === "included"
                      ? "What's Included"
                      : tab}
                </button>
              ),
            )}
          </div>

          {/* DYNAMIC TAB BODY VIEWS */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Overview Long Text Segment */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {overview.description ||
                  "Experience American athletic excellence, where 12 galleries bring the triumphs & stories of Team USA to life. From viewing artifacts like the Olympic torch to collecting personalized memories in your digital locker, it is an inspiring journey through sports history."}
              </p>

              {/* Highlights 2x2 Grid Component Box */}
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parsePoints(overview.highlightedPoints).length > 0
                    ? parsePoints(overview.highlightedPoints).map(
                        (highlight, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl flex gap-3 items-start"
                          >
                            <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                              <Sparkles size={14} className="text-[#29b6be]" />
                            </div>
                            <span className="text-xs font-semibold text-slate-700 mt-1.5">
                              {highlight}
                            </span>
                          </div>
                        ),
                      )
                    : // Default fallbacks matching picture
                      [
                        "Explore the inspiring history of Team USA",
                        "Interactive exhibits & hands-on activities",
                        "Iconic memorabilia & athlete stories",
                        "Fun for all ages & fully accessible",
                      ].map((text, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl flex gap-3 items-start"
                        >
                          <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                            <Sparkles size={14} className="text-[#29b6be]" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 mt-1.5">
                            {text}
                          </span>
                        </div>
                      ))}
                </div>
              </div>

              {/* What You'll Experience */}
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  What You'll Experience
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Discover the legacy of the Olympic & Paralympic Games at the
                  world's first Olympic & Paralympic museum. With immersive
                  exhibits, interactive challenges, and incredible athlete
                  stories, it's an unforgettable experience for the whole
                  family.
                </p>
              </div>

              {/* Inclusions Card Block Side-by-Side Containers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50/50 border rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-[#29b6be]">Included</h4>
                  <ul className="space-y-2.5">
                    {(parsePoints(overview.includedPoints).length > 0
                      ? parsePoints(overview.includedPoints)
                      : [
                          "Museum admission",
                          "All permanent exhibits",
                          "Interactive experiences",
                          "Digital guide",
                        ]
                    ).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-xs font-medium text-slate-600 items-center"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-[#29b6be] shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50/50 border rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-800">
                    Not Included
                  </h4>
                  <ul className="space-y-2.5">
                    {(parsePoints(overview.notIncludedPoints).length > 0
                      ? parsePoints(overview.notIncludedPoints)
                      : [
                          "Parking",
                          "Food & beverages",
                          "Special exhibitions (if any)",
                          "Transportation",
                        ]
                    ).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-xs font-medium text-slate-600 items-center"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-slate-400 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "included" && (
            <div className="p-4 border rounded-xl bg-slate-50/50 text-sm text-slate-600 space-y-2 animate-in fade-in duration-200">
              <h4 className="font-bold text-slate-900">
                Detailed Structural Inclusions Checklist
              </h4>
              <p>
                {overview.whatsIncludedDescription ||
                  "Review your full inclusions manifest under the main summary panel grids."}
              </p>
            </div>
          )}

          {activeTab === "visitor" && (
            <div className="p-4 border rounded-xl bg-slate-50/50 text-sm text-slate-600 animate-in fade-in duration-200">
              Operational Window Scope: {dealDetails.availableTime} -{" "}
              {dealDetails.serviceEndTime}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="p-8 text-center text-muted-foreground border border-dashed rounded-xl animate-in fade-in duration-200">
              No community reviews indexed at this stage. Live testing preview
              module active.
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN (SIDEBAR MODULES) ================= */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          {/* TICKET / VOUCHER BOOKING CARD BOX */}
          <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {dealInfo.voucher_name || "Single Day Ticket"}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-700 ml-1">4.8</span>
                <span>(12,500+ reviews)</span>
              </div>
            </div>

            {/* Price Line Items Layout Block */}
            <div className="space-y-0.5">
              {dealInfo.regularPrice && (
                <span className="text-xs line-through text-slate-400 font-medium block">
                  € {dealInfo.regularPrice}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-slate-950">
                  € {dealInfo.discountedPrice || "124.50"}
                </span>
                <Badge className="bg-cyan-50 text-[#29b6be] hover:bg-cyan-50 font-bold border border-cyan-100 rounded-md py-0.5 px-1.5 text-xs">
                  Save 17%
                </Badge>
              </div>
            </div>

            {/* Embedded Mini Badges inside card */}
            <div className="space-y-3 pt-2 border-t text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2.5">
                <Zap size={15} className="text-[#29b6be] fill-cyan-50" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Smartphone size={15} className="text-[#29b6be]" />
                <span>Mobile Ticket</span>
              </div>
            </div>

            {/* Counter Numeric Row Input Dummy widget */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-slate-500 hover:bg-slate-50"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-bold text-sm text-slate-900">
                {ticketCount}
              </span>
              <button
                type="button"
                onClick={() => setTicketCount(ticketCount + 1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-slate-500 hover:bg-slate-50"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Buttons Row Array stacked */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={submitCompletedPayload}
                className="w-full h-11 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-full text-sm transition-colors"
              >
                Book now
              </button>
              <button
                type="button"
                className="w-full h-11 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Heart size={15} className="text-slate-400" /> Add to wishlist
              </button>
              <button
                type="button"
                className="w-full h-11 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={15} className="text-slate-400" /> Chat with
                seller
              </button>
            </div>

            {/* Checkout footer caption */}
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <Lock size={12} /> Secure checkout
            </div>
          </div>

          {/* VISITOR INFORMATION MODULE CARD PANEL */}
          <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Visitor Information
            </h3>

            <div className="space-y-4 text-xs">
              {/* Location Box Block info */}
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-[#29b6be] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-900">Location</h4>
                  <p className="text-slate-500 leading-normal font-medium">
                    {overview.location ||
                      "200 S Sierra Madre St, Colorado Springs, CO 80903, United States"}
                  </p>
                </div>
              </div>

              {/* Operational Hours segment */}
              <div className="flex gap-3 items-start">
                <Clock size={16} className="text-[#29b6be] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-900">
                    Opening Hours
                  </h4>
                  <p className="text-slate-500 leading-normal font-medium">
                    {overview.openingHours ||
                      "Mon - Sun: 8:00 AM - 5:00 PM, Last entry: 4:00 PM"}
                  </p>
                </div>
              </div>

              {/* Accessibility options info text */}
              <div className="flex gap-3 items-start">
                <Accessibility
                  size={16}
                  className="text-[#29b6be] shrink-0 mt-0.5"
                />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-900">
                    Accessibility
                  </h4>
                  <p className="text-slate-500 leading-normal font-medium">
                    {overview.accessibility ||
                      "Fully accessible for wheelchairs and strollers."}
                  </p>
                </div>
              </div>
            </div>

            {/* Miniature Map Visual Embed Wrapper Layout */}
            <div className="border rounded-xl overflow-hidden mt-2 bg-slate-50">
              <div className="h-28 w-full bg-slate-200 relative">
                {/* Visual placeholder for map imagery look */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[16px_16px] bg-slate-100 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#29b6be] border-2 border-white shadow-md flex items-center justify-center animate-pulse">
                    <MapPin size={10} className="text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3 space-y-1.5 bg-white border-t">
                <h4 className="text-xs font-extrabold text-slate-950">
                  US Olympic & Paralympic Museum
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 font-medium">
                  {overview.location ||
                    "200 S Sierra Madre St, Colorado Springs, CO 80903, United States"}
                </p>
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 hover:text-slate-600 pt-1 border-t transition-colors"
                >
                  <span>Get Directions</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED STEP SUBMISSION ACTIONS FOOTER FOOTPRINT BAR */}
      <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
        <button
          type="button"
          onClick={() => dispatch(setStep(4))}
          className="px-5 h-11 border border-gray-200 rounded-full font-semibold text-gray-500 hover:bg-gray-50 text-sm flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={submitCompletedPayload}
          className="px-8 h-11 bg-[#29b6be] hover:bg-[#1fa0a7] text-white font-bold rounded-full text-sm shadow-md transition-colors"
        >
          Publish Deal
        </button>
      </div>
    </div>
  );
}
