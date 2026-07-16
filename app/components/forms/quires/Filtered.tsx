"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";

const MAX_RANGE = 250;
const DEFAULT_MIN = 50;
const DEFAULT_MAX = 200;
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
  const lockRef = useRef(false);

  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);

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

  const [availability, setAvailability] = useState<string | null>(
    () => searchParams.get("availability") || null,
  );

  useEffect(() => {
    setMinPrice(Number(searchParams.get("min_price")) || DEFAULT_MIN);
    setMaxPrice(Number(searchParams.get("max_price")) || DEFAULT_MAX);
    setLocation(searchParams.get("location") || "");
    setSelectedRating(searchParams.get("rating") || null);
    setAvailability(searchParams.get("availability") || null);
  }, [searchParams]);

  const buildParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    let min = minPrice;
    let max = maxPrice;
    if (min > max) [min, max] = [max, min];

    if (min !== DEFAULT_MIN) params.set("min_price", String(min));
    else params.delete("min_price");

    if (max !== DEFAULT_MAX) params.set("max_price", String(max));
    else params.delete("max_price");

    if (location.trim()) params.set("location", location.trim());
    else params.delete("location");

    if (selectedRating) params.set("rating", selectedRating);
    else params.delete("rating");

    if (availability) params.set("availability", availability);
    else params.delete("availability");

    // Reset page back to index 1 when parameters change
    params.delete("page");

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

  const handleAvailabilityToggle = (val: string) => {
    setAvailability((prev) => (prev === val ? null : val));
  };

  const handleClearAll = () => {
    setMinPrice(DEFAULT_MIN);
    setMaxPrice(DEFAULT_MAX);
    setLocation("");
    setSelectedRating(null);
    setAvailability(null);
  };

  const hasActiveFilters =
    minPrice !== DEFAULT_MIN ||
    maxPrice !== DEFAULT_MAX ||
    location !== "" ||
    selectedRating !== null ||
    availability !== null;

  return (
    <div className="sticky top-12 z-10 w-full bg-white rounded-2xl border border-slate-100 p-6">
      {/* Header */}
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

      {/* Price Filter Section */}
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        onSliderChange={handleSliderChange}
      />

      <hr className="my-5 border-slate-100" />

      {/* Ratings Accordion Section */}
      <AccordionSection
        title="Rating"
        isOpen={isRatingOpen}
        onToggle={() => setIsRatingOpen(!isRatingOpen)}
      >
        {RATING_OPTIONS.map((ratingOption) => (
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
      </AccordionSection>

      <hr className="my-5 border-slate-100" />

      {/* Availability Accordion Section */}
      <AccordionSection
        title="Availability"
        isOpen={isAvailabilityOpen}
        onToggle={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
      >
        {AVAILABILITY_OPTIONS.map((option) => (
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
      </AccordionSection>
    </div>
  );
}

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
  onSliderChange: (values: number[]) => void;
}

function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  onSliderChange,
}: PriceFilterProps) {
  return (
    <div className="mt-5 flex flex-col gap-4">
      <span className="text-[15px] font-semibold text-[#1F2E3D]">Price</span>

      {/* Slider */}
      <div className="relative pt-2 pb-6 px-2">
        <Slider
          value={[minPrice, maxPrice]}
          onValueChange={onSliderChange}
          max={MAX_RANGE}
          min={0}
          step={1}
          className="w-full"
        />

        <div className="absolute left-0 right-0 top-6 text-[13px] font-bold text-[#1F2E3D] pointer-events-none select-none">
          <span
            className="absolute -translate-x-1/2 transition-all duration-75 whitespace-nowrap"
            style={{
              left: `${Math.max(4, Math.min(96, (minPrice / MAX_RANGE) * 100))}%`,
            }}
          >
            € {minPrice}
          </span>
          <span
            className="absolute -translate-x-1/2 transition-all duration-75 whitespace-nowrap"
            style={{
              left: `${Math.max(4, Math.min(96, (maxPrice / MAX_RANGE) * 100))}%`,
            }}
          >
            € {maxPrice}
          </span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 pt-1">
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
  );
}

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
        onClick={onToggle}
        className="w-full flex items-center justify-between text-[15px] font-semibold text-[#1F2E3D] focus:outline-none group"
      >
        <span>{title}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
