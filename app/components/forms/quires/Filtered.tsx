"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";

const MAX_RANGE = 1000;
const DEFAULT_MIN = 10;
const DEFAULT_MAX = 1000;
const DEBOUNCE_DELAY = 400;

const RATING_OPTIONS = ["5.0", "4.0+", "3.0+", "2.0+", "1.0+"];
const AVAILABILITY_OPTIONS = [
  { id: "last_day", label: "Last Day Offers" },
  { id: "in_stock", label: "Only one week to go" },
  { id: "out_stock", label: "50% Discounted and More" },
];

export default function Filtered() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);

  // --- Filter States ---
  const [range, setRange] = useState<[number, number]>(() => {
    const minParam = searchParams.get("min_price");
    const maxParam = searchParams.get("max_price");
    return [
      minParam ? Number(minParam) : DEFAULT_MIN,
      maxParam ? Number(maxParam) : DEFAULT_MAX,
    ];
  });

  const [location, setLocation] = useState<string>(
    () => searchParams.get("location") || "",
  );
  const [selectedRating, setSelectedRating] = useState<string | null>(
    () => searchParams.get("rating") || null,
  );
  const [availability, setAvailability] = useState<string | null>(
    () => searchParams.get("availability") || null,
  );

  // Sync state when URL params change externally
  useEffect(() => {
    const minParam = searchParams.get("min_price");
    const maxParam = searchParams.get("max_price");
    setRange([
      minParam ? Number(minParam) : DEFAULT_MIN,
      maxParam ? Number(maxParam) : DEFAULT_MAX,
    ]);
    setLocation(searchParams.get("location") || "");
    setSelectedRating(searchParams.get("rating") || null);
    setAvailability(searchParams.get("availability") || null);
  }, [searchParams]);

  // --- URL Param Builder ---
  const applyFilters = useCallback(
    (
      currentRange: [number, number],
      loc: string,
      rating: string | null,
      avail: string | null,
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      const [min, max] = currentRange;

      if (min !== DEFAULT_MIN) params.set("min_price", String(min));
      else params.delete("min_price");

      if (max !== DEFAULT_MAX) params.set("max_price", String(max));
      else params.delete("max_price");

      if (loc.trim()) params.set("location", loc.trim());
      else params.delete("location");

      if (rating) params.set("rating", rating);
      else params.delete("rating");

      if (avail) params.set("availability", avail);
      else params.delete("availability");

      params.delete("page");

      startTransition(() => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  // --- Debounced URL updates ---
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(range, location, selectedRating, availability);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [range, location, selectedRating, availability, applyFilters]);

  // --- Handlers ---
  const handleClearAll = () => {
    setRange([DEFAULT_MIN, DEFAULT_MAX]);
    setLocation("");
    setSelectedRating(null);
    setAvailability(null);
  };

  const hasActiveFilters =
    range[0] !== DEFAULT_MIN ||
    range[1] !== DEFAULT_MAX ||
    location !== "" ||
    selectedRating !== null ||
    availability !== null;

  return (
    <div className="sticky top-12 z-10 w-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      {/* Header */}
      <div className="text-[17px] font-semibold text-[#1F2E3D] pb-4 border-b border-slate-100 flex items-center justify-between">
        <span>Filters</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-[#1ec6cc] font-semibold hover:underline bg-transparent border-none cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Dynamic Price Filter Section */}
      <PriceFilter
        range={range}
        onChange={setRange}
        defaultMaxRange={MAX_RANGE}
      />

      <hr className="my-5 border-slate-100" />

      {/* Ratings Section */}
      <AccordionSection
        title="Rating"
        isOpen={isRatingOpen}
        onToggle={() => setIsRatingOpen((prev) => !prev)}
      >
        {RATING_OPTIONS.map((ratingOption) => (
          <label
            key={ratingOption}
            className="flex items-center gap-3 group cursor-pointer text-[14px] font-medium text-[#1F2E3D] transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedRating === ratingOption}
              onChange={() =>
                setSelectedRating((prev) =>
                  prev === ratingOption ? null : ratingOption,
                )
              }
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
      </AccordionSection>

      <hr className="my-5 border-slate-100" />

      {/* Availability Section */}
      <AccordionSection
        title="Availability"
        isOpen={isAvailabilityOpen}
        onToggle={() => setIsAvailabilityOpen((prev) => !prev)}
      >
        {AVAILABILITY_OPTIONS.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-3 group cursor-pointer text-[14px] font-medium text-[#1F2E3D] transition-colors"
          >
            <input
              type="checkbox"
              checked={availability === option.id}
              onChange={() =>
                setAvailability((prev) =>
                  prev === option.id ? null : option.id,
                )
              }
              className="w-[18px] h-[18px] rounded-md border-[#919EAB] text-[#1ec6cc] focus:ring-[#1ec6cc]/30 accent-[#1ec6cc] cursor-pointer transition-all"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </AccordionSection>
    </div>
  );
}

/* ========================================================================
   Dynamic Price Filter Component
======================================================================== */
interface PriceFilterProps {
  range: [number, number];
  onChange: (val: [number, number]) => void;
  defaultMaxRange: number;
}

function PriceFilter({ range, onChange, defaultMaxRange }: PriceFilterProps) {
  const [minPrice, maxPrice] = range;

  // Local state buffers for typing
  const [minInput, setMinInput] = useState<string>(String(minPrice));
  const [maxInput, setMaxInput] = useState<string>(String(maxPrice));

  // Dynamically calculate slider max bound based on user entry
  const dynamicSliderMax = Math.max(defaultMaxRange, maxPrice);

  useEffect(() => {
    setMinInput(String(minPrice));
    setMaxInput(String(maxPrice));
  }, [minPrice, maxPrice]);

  // Validate and commit Min Price
  const commitMinPrice = () => {
    let parsed = Number(minInput);
    if (minInput === "" || isNaN(parsed)) {
      parsed = 0;
    }
    const validatedMin = Math.max(0, Math.min(parsed, maxPrice));
    setMinInput(String(validatedMin));
    onChange([validatedMin, maxPrice]);
  };

  // Validate and commit Max Price (Accepts any value typed by user)
  const commitMaxPrice = () => {
    let parsed = Number(maxInput);
    if (maxInput === "" || isNaN(parsed)) {
      parsed = defaultMaxRange; // Fall back to default if cleared/empty
    } else {
      parsed = Math.max(parsed, minPrice); // Ensure max is not below min
    }

    setMaxInput(String(parsed));
    onChange([minPrice, parsed]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "min" | "max",
  ) => {
    if (e.key === "Enter") {
      if (type === "min") commitMinPrice();
      if (type === "max") commitMaxPrice();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-[#1F2E3D]">
          Price Range
        </span>
        <span className="text-xs font-semibold text-slate-500">
          €{minPrice} – €{maxPrice}
        </span>
      </div>

      {/* Slider dynamically scales to accommodate user-written max value */}
      <div className="py-2 px-1">
        <Slider
          value={[minPrice, maxPrice]}
          onValueChange={(val) => onChange([val[0], val[1]])}
          max={dynamicSliderMax}
          min={0}
          step={1}
          className="w-full cursor-pointer"
        />
      </div>

      {/* Editable Inputs */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Min Price
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-medium text-slate-400">
              €
            </span>
            <input
              type="number"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              onBlur={commitMinPrice}
              onKeyDown={(e) => handleKeyDown(e, "min")}
              placeholder="0"
              className="w-full bg-[#F4F6F8] pl-7 pr-3 py-2.5 text-sm font-medium text-[#1F2E3D] rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#1ec6cc]/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Max Price
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-medium text-slate-400">
              €
            </span>
            <input
              type="number"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              onBlur={commitMaxPrice}
              onKeyDown={(e) => handleKeyDown(e, "max")}
              placeholder={String(defaultMaxRange)}
              className="w-full bg-[#F4F6F8] pl-7 pr-3 py-2.5 text-sm font-medium text-[#1F2E3D] rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#1ec6cc]/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   Accordion Section Component
======================================================================== */
interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-[15px] font-semibold text-[#1F2E3D] focus:outline-none group cursor-pointer"
      >
        <span>{title}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
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
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden space-y-3.5 pt-0.5">{children}</div>
      </div>
    </div>
  );
}
