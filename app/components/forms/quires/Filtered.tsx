"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";

const MAX_RANGE = 250;
const DEFAULT_MIN = 50;
const DEFAULT_MAX = 200;
const DEBOUNCE_DELAY = 400;

export default function Filtered() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const lockRef = useRef(false);

  // --- Accordion Open/Close States ---
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);

  // --- Filter Core States ---
  const [minPrice, setMinPrice] = useState<number>(() => {
    const param = searchParams.get("min_price");
    return param ? Number(param) : DEFAULT_MIN;
  });

  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const param = searchParams.get("max_price");
    return param ? Number(param) : DEFAULT_MAX;
  });

  const [location, setLocation] = useState<string>(
    () => searchParams.get("location") || "",
  );

  const [selectedRating, setSelectedRating] = useState<string | null>(
    () => searchParams.get("rating") || null,
  );

  // CHANGED: Shifted from string[] to string | null
  const [availability, setAvailability] = useState<string | null>(
    () => searchParams.get("availability") || null,
  );

  // --- Synchronize parameters to URL ---
  const buildParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    let min = minPrice;
    let max = maxPrice;
    if (min > max) [min, max] = [max, min];

    // Strip parameters only if they match initial layout states to keep URL clean
    if (min !== DEFAULT_MIN) params.set("min_price", String(min));
    else params.delete("min_price");

    if (max !== DEFAULT_MAX) params.set("max_price", String(max));
    else params.delete("max_price");

    if (location.trim()) params.set("location", location.trim());
    else params.delete("location");

    if (selectedRating) params.set("rating", selectedRating);
    else params.delete("rating");

    // CHANGED: Updated URL parsing logic for single availability selection
    if (availability) params.set("availability", availability);
    else params.delete("availability");

    return params;
  };

  // --- Debounced URL Update Effect ---
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
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, location, selectedRating, availability]);

  // --- Handlers ---
  const handleSliderChange = (values: number[]) => {
    if (values.length === 2) {
      setMinPrice(values[0]);
      setMaxPrice(values[1]);
    }
  };

  const handleRatingToggle = (val: string) => {
    setSelectedRating((prev) => (prev === val ? null : val));
  };

  // CHANGED: Reconfigured toggle handler to enforce single selection
  const handleAvailabilityToggle = (val: string) => {
    setAvailability((prev) => (prev === val ? null : val));
  };

  const handleClearAll = () => {
    setMinPrice(DEFAULT_MIN);
    setMaxPrice(DEFAULT_MAX);
    setLocation("");
    setSelectedRating(null);
    setAvailability(null); // CHANGED: Resets to null
  };

  const hasActiveFilters =
    minPrice !== DEFAULT_MIN ||
    maxPrice !== DEFAULT_MAX ||
    location !== "" ||
    selectedRating !== null ||
    availability !== null; // CHANGED: Validates against null

  return (
    <div className="sticky top-12 z-10 w-full bg-white lg:max-w-[340px] rounded-2xl border border-slate-100 p-6">
      {/* Title Header */}
      <div className="text-[17px] font-semibold text-[#1F2E3D] pb-4 border-b border-slate-100 flex items-center justify-between">
        <span>Filters</span>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs text-[#1ec6cc] font-semibold hover:underline bg-transparent border-none cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* ================= PRICE FILTER SECTION ================= */}
      <div className="mt-5 flex flex-col gap-4">
        <span className="text-[15px] font-semibold text-[#1F2E3D]">Price</span>

        {/* Slider track with moving indicators */}
        <div className="relative pt-2 pb-6 px-2">
          <Slider
            value={[minPrice, maxPrice]}
            onValueChange={handleSliderChange}
            max={MAX_RANGE}
            min={0}
            step={1}
            className="w-full"
          />

          {/* Dynamic Label Indicators placed exactly beneath the thumbs */}
          <div className="absolute left-0 right-0 top-6 text-[13px] font-bold text-[#1F2E3D] pointer-events-none select-none">
            <span
              className="absolute -translate-x-1/2 transition-all duration-75"
              style={{ left: `${(minPrice / MAX_RANGE) * 100}%` }}
            >
              ${minPrice}
            </span>
            <span
              className="absolute -translate-x-1/2 transition-all duration-75"
              style={{ left: `${(maxPrice / MAX_RANGE) * 100}%` }}
            >
              ${maxPrice}
            </span>
          </div>
        </div>

        {/* Input Fields Container */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="relative">
            <input
              type="number"
              value={minPrice || ""}
              min={0}
              max={MAX_RANGE}
              onChange={(e) =>
                setMinPrice(Math.min(MAX_RANGE, Number(e.target.value)))
              }
              placeholder="Min. price"
              className="w-full bg-[#F4F6F8] text-sm font-medium text-[#1F2E3D] placeholder-[#919EAB] rounded-xl px-4 py-3 outline-none border border-transparent focus:bg-white focus:border-[#1ec6cc]/40 transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="number"
              value={maxPrice || ""}
              min={0}
              max={MAX_RANGE}
              onChange={(e) =>
                setMaxPrice(Math.min(MAX_RANGE, Number(e.target.value)))
              }
              placeholder="Max. price"
              className="w-full bg-[#F4F6F8] text-sm font-medium text-[#1F2E3D] placeholder-[#919EAB] rounded-xl px-4 py-3 outline-none border border-transparent focus:bg-white focus:border-[#1ec6cc]/40 transition-all"
            />
          </div>
        </div>
      </div>

      <hr className="my-5 border-slate-100" />

      {/* ================= RATINGS ACCORDION ================= */}
      <div>
        <button
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#1F2E3D] focus:outline-none group"
        >
          <span>Rating</span>
          <svg
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isRatingOpen ? "rotate-180" : ""}`}
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

        <div
          className={`grid transition-all duration-200 ease-in-out ${isRatingOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden space-y-3.5 pt-0.5">
            {["5.0", "4.0+", "3.0+", "2.0+", "1.0+"].map((ratingOption) => (
              <label
                key={ratingOption}
                className="flex items-center gap-3 group cursor-pointer text-[14px] font-medium text-[#1F2E3D] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedRating === ratingOption}
                  onChange={() => handleRatingToggle(ratingOption)}
                  className="w-[18px] h-[18px] rounded-md border-[#919EAB] text-[#1ec6cc] focus:ring-[#1ec6cc]/30 accent-[#1ec6cc] cursor-pointer transition-all"
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
        </div>
      </div>

      <hr className="my-5 border-slate-100" />

      {/* ================= AVAILABILITY ACCORDION ================= */}
      <div>
        <button
          onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#1F2E3D] focus:outline-none group"
        >
          <span>Availability</span>
          <svg
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isAvailabilityOpen ? "rotate-180" : ""}`}
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

        <div
          className={`grid transition-all duration-200 ease-in-out ${isAvailabilityOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden space-y-3.5 pt-0.5">
            {[
              { id: "last_day", label: "Last Day Offers" },
              { id: "in_stock", label: "In Stock" },
              { id: "out_stock", label: "Out of Stock" },
            ].map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 group cursor-pointer text-[14px] font-medium text-[#1F2E3D] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={availability === option.id}
                  onChange={() => handleAvailabilityToggle(option.id)}
                  className="w-[18px] h-[18px] rounded-md border-[#919EAB] text-[#1ec6cc] focus:ring-[#1ec6cc]/30 accent-[#1ec6cc] cursor-pointer transition-all"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
