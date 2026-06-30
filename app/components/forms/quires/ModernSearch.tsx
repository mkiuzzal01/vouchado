"use client";
import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import LocationIcon from "../../icons/LocationIcon";

export interface ModernSearchProps {
  onSearch?: (query: { location: string; service: string }) => void;
  locationPlaceholder?: string;
  servicePlaceholder?: string;
  buttonText?: string;
  className?: string;
}

export default function ModernSearch({
  onSearch,
  locationPlaceholder = "Search your location",
  servicePlaceholder = "Search category or service",
  buttonText = "Search",
  className = "",
}: ModernSearchProps) {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.({ location, service });
  };

  return (
    <div
      className={`mt-6 sm:mt-8 w-full max-w-4xl mx-auto font-sans ${className}`}
    >
      {/* ================= MOBILE VIEW (Card style) ================= */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 rounded-2xl bg-white/95 p-3  backdrop-blur-md md:hidden border border-gray-100"
      >
        {/* Location Input */}
        <div className="flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 text-gray-400 focus-within:text-[#1ec6cc] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1ec6cc] transition-all">
          <LocationIcon size={28} color="#637381" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={locationPlaceholder}
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Service Input */}
        <div className="flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 text-gray-400 focus-within:text-[#1ec6cc] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1ec6cc] transition-all">
          <SearchIcon size={28} />
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder={servicePlaceholder}
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="h-11 w-full rounded-xl bg-[#1ec6cc] hover:bg-[#19a7ad] text-white font-bold text-sm active:scale-[0.99] transition-all"
        >
          {buttonText}
        </button>
      </form>

      {/* ================= DESKTOP VIEW (Pill style) ================= */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex w-full items-center overflow-hidden rounded-full bg-white  border border-gray-100/80 p-1"
      >
        {/* Location Box */}
        <div className="flex items-center gap-2 px-5 py-2 w-full text-gray-400 focus-within:text-[#1ec6cc] transition-colors group">
          <LocationIcon size={28} color="#637381" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={locationPlaceholder}
            className="w-full bg-transparent text-sm  text-slate-800 placeholder-gray-400 outline-none py-1"
          />
        </div>

        {/* Subtle Middle Vertical Divider Line */}
        <div className="w-px h-7 bg-gray-200 shrink-0 mx-2" />

        {/* Service Box */}
        <div className="flex items-center gap-2 px-5 py-2 w-full text-gray-400 focus-within:text-[#1ec6cc] transition-colors">
          <SearchIcon size={28} />
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder={servicePlaceholder}
            className="w-full bg-transparent text-sm  text-slate-800 placeholder-gray-400 outline-none py-1"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className={`h-12 rounded-full text-[#1ec6cc] font-semibold bg-[#1ec6cc]/10 hover:bg-[#1ec6cc]/30 px-9 tracking-wide text-sm  transition-all active:scale-98 whitespace-nowrap`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
