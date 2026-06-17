"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filtered() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const lockRef = useRef(false);

  // --- Accordion Section Open/Close States ---
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);

  // --- Active Filter States (Initialized from URL query strings) ---
  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min_price")) || 50,
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max_price")) || 200,
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [selectedRating, setSelectedRating] = useState<string | null>(
    searchParams.get("rating") || null,
  );
  const [availability, setAvailability] = useState<string[]>(
    searchParams.get("availability")?.split(",") || [],
  );

  // --- Build Param URL Mapping ---
  const buildParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Price Bounds Check & Set
    let min = minPrice;
    let max = maxPrice;
    if (min > max) [min, max] = [max, min];
    params.set("min_price", String(min));
    params.set("max_price", String(max));

    // Location
    if (location) params.set("location", location);
    else params.delete("location");

    // Rating
    if (selectedRating) params.set("rating", selectedRating);
    else params.delete("rating");

    // Availability Array
    if (availability.length > 0)
      params.set("availability", availability.join(","));
    else params.delete("availability");

    return params;
  };

  // --- Controlled Debounce Effect Layer ---
  useEffect(() => {
    if (lockRef.current) return;

    const timer = setTimeout(() => {
      lockRef.current = true;
      const params = buildParams();

      startTransition(() => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });

      setTimeout(() => {
        lockRef.current = false;
      }, 300);
    }, 450); // Balanced UX debounce latency delay

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, location, selectedRating, availability]);

  // --- State Handler Adjusters ---
  const handleRatingToggle = (val: string) => {
    setSelectedRating((prev) => (prev === val ? null : val));
  };

  const handleAvailabilityToggle = (val: string) => {
    setAvailability((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val],
    );
  };

  return (
    <div className="w-full bg-white  lg:max-w-[340px] rounded-3xl border border-gray-100 p-6 shadow-sm font-sans select-none text-slate-800">
      {/* Title Header */}
      <div className="text-lg font-bold text-slate-900 pb-4 border-b border-gray-100">
        Filters
      </div>

      {/* ================= PRICE FILTER SECTION ================= */}
      <div className="mt-5 space-y-4">
        <label className="text-[15px] font-bold text-slate-900 block">
          Price
        </label>

        {/* Track Slider Bar Representation */}
        <div className="relative pt-2 px-1">
          <input
            type="range"
            value={maxPrice}
            min={50}
            max={200}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#1ec6cc]"
          />

          {/* Label Indicators */}
          <div className="flex justify-between items-center mt-2 text-xs font-bold text-slate-600">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        {/* Min/Max Raw Value Numerical Inputs */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="relative">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min. price"
              className="w-full bg-[#f4f6f8] text-sm font-medium text-slate-700 placeholder-gray-400 rounded-xl px-3 py-2.5 outline-none border border-transparent focus:bg-white focus:border-gray-200 transition-all"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max. price"
              className="w-full bg-[#f4f6f8] text-sm font-medium text-slate-700 placeholder-gray-400 rounded-xl px-3 py-2.5 outline-none border border-transparent focus:bg-white focus:border-gray-200 transition-all"
            />
          </div>
        </div>
      </div>

      <hr className="my-5 border-gray-100" />

      {/* ================= LOCATION ACCORDION ================= */}
      <div>
        <button
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="w-full flex items-center justify-between text-[15px] font-bold text-slate-900 focus:outline-none"
        >
          <span>Location</span>
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isLocationOpen && (
          <div className="mt-3 pt-0.5">
            <div className="flex items-center gap-2 rounded-xl bg-[#f4f6f8] px-3 py-2.5 text-gray-400 focus-within:text-[#1ec6cc] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1ec6cc]/30 border border-transparent focus-within:border-[#1ec6cc] transition-all">
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <hr className="my-5 border-gray-100" />

      {/* ================= RATINGS ACCORDION ================= */}
      <div>
        <button
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="w-full flex items-center justify-between text-[15px] font-bold text-slate-900 focus:outline-none"
        >
          <span>Rating</span>
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isRatingOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isRatingOpen && (
          <div className="mt-3.5 space-y-3">
            {["5.0", "4.0+", "3.0+", "2.0+", "1.0+"].map((ratingOption) => (
              <label
                key={ratingOption}
                className="flex items-center gap-3 group cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={selectedRating === ratingOption}
                  onChange={() => handleRatingToggle(ratingOption)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1ec6cc] focus:ring-[#1ec6cc] accent-[#1ec6cc] cursor-pointer"
                />
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-[#ffb800]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{ratingOption}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="my-5 border-gray-100" />

      {/* ================= AVAILABILITY ACCORDION ================= */}
      <div>
        <button
          onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
          className="w-full flex items-center justify-between text-[15px] font-bold text-slate-900 focus:outline-none"
        >
          <span>Availability</span>
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isAvailabilityOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isAvailabilityOpen && (
          <div className="mt-3.5 space-y-3">
            {[
              { id: "last_day", label: "Last Day Offers" },
              { id: "in_stock", label: "In Stock" },
              { id: "out_stock", label: "Out of Stock" },
            ].map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 group cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={availability.includes(option.id)}
                  onChange={() => handleAvailabilityToggle(option.id)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1ec6cc] focus:ring-[#1ec6cc] accent-[#1ec6cc] cursor-pointer"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
