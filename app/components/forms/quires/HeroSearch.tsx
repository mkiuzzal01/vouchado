"use client";
import React, { useState } from "react";
import Location from "../../icons/Location";

export interface ModernSearchProps {
  buttonClass?: string;
  onSearch?: (query: { location: string; service: string }) => void;
  locationPlaceholder?: string;
  servicePlaceholder?: string;
  buttonText?: string;
  className?: string;
}

export default function HeroSearch({
  buttonClass,
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
          <svg
            className="w-[28px] h-[28px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
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
          <svg
            className="w-4 h-4 shrink-0 mx-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
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
        className="hidden md:flex w-full items-center overflow-hidden rounded-3xl bg-white  border border-gray-100/80 p-1"
      >
        {/* Location Box */}
        <div className="flex items-center gap-2 px-5 py-2 w-full text-gray-400 focus-within:text-[#1ec6cc] transition-colors group">
          <Location />
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
          <svg
            className="w-[28px] h-[28px] shrink-0 mx-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder={servicePlaceholder}
            className="w-full h-12 bg-transparent text-sm  text-slate-800 placeholder-gray-400 outline-none py-1"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className={`h-15 rounded-3xl text-white font-semibold bg-[linear-gradient(to_right,#1ec6cc,#19a7ad)] hover:bg-[#1ec6cc]/80 px-9 tracking-wide text-sm  transition-all active:scale-98 whitespace-nowrap`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
