"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Location from "../../icons/Location";
import Search from "../../icons/Search";
import SearchIcon from "../../icons/SearchIcon";
import MapInput from "../inputs/MapInput";

export interface ModernSearchProps {
  onSearch?: (query: {
    service: string;
    lat?: number | null;
    lng?: number | null;
  }) => void;
  locationPlaceholder?: string;
  servicePlaceholder?: string;
  buttonText?: string;
  className?: string;
}

export default function HeroSearch({
  locationPlaceholder = "Search your location",
  servicePlaceholder = "Search category or service",
  buttonText = "Search",
  className = "",
  onSearch,
}: ModernSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state
  const [inputText, setInputText] = useState("");
  const [service, setService] = useState(
    () => searchParams.get("service") || "",
  );
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>(() => ({
    lat: searchParams.get("lat") ? Number(searchParams.get("lat")) : null,
    lng: searchParams.get("lng") ? Number(searchParams.get("lng")) : null,
  }));

  // Sync state with incoming URL changes
  useEffect(() => {
    setService(searchParams.get("service") || "");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    setCoordinates({
      lat: lat ? Number(lat) : null,
      lng: lng ? Number(lng) : null,
    });
  }, [searchParams]);

  // Handler for MapInput changes
  const handleLocationChange = useCallback(
    (val: string, coords?: { lat: number; lng: number }) => {
      setInputText(val);
      setCoordinates(
        coords
          ? { lat: coords.lat, lng: coords.lng }
          : { lat: null, lng: null },
      );
    },
    [],
  );

  // Submit and update search params
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    // Clean legacy address params
    params.delete("location");

    // Service param
    if (service.trim()) {
      params.set("service", service.trim());
    } else {
      params.delete("service");
    }

    // Coordinates params
    if (coordinates.lat !== null && coordinates.lng !== null) {
      params.set("lat", coordinates.lat.toString());
      params.set("lng", coordinates.lng.toString());
    } else {
      params.delete("lat");
      params.delete("lng");
    }

    router.push(`?${params.toString()}`);

    onSearch?.({
      service: service.trim(),
      lat: coordinates.lat,
      lng: coordinates.lng,
    });
  };

  return (
    <div className={`w-full mx-auto ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={
          "flex flex-col gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-sm " +
          "md:flex-row md:items-center md:gap-0 md:p-1.5 md:rounded-full md:bg-white md:border-gray-100/80"
        }
      >
        {/* Location Box */}
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-gray-400 focus-within:text-[#1ec6cc] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1ec6cc] transition-all md:border-none md:bg-transparent md:px-5 md:py-2 md:focus-within:ring-0">
          <Location />
          <MapInput
            value={inputText}
            onChange={handleLocationChange}
            placeholder={locationPlaceholder}
          />
        </div>

        {/* Vertical Divider (Desktop Only) */}
        <div className="hidden md:block w-px h-7 bg-gray-200 shrink-0 mx-1" />

        {/* Service Box */}
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-gray-400 focus-within:text-[#1ec6cc] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1ec6cc] transition-all md:border-none md:bg-transparent md:px-5 md:py-2 md:focus-within:ring-0">
          <span className="hidden md:block">
            <SearchIcon color="#637381" />
          </span>
          <span className="md:hidden">
            <Search />
          </span>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder={servicePlaceholder}
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-gray-400 outline-none h-10 md:h-11"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="h-11 md:h-13 w-full md:w-auto rounded-xl md:rounded-full bg-gradient-to-r from-[#1ec6cc] to-[#19a7ad] hover:opacity-95 text-white font-semibold text-sm px-8 mr-0 lg:mr-2 transition-all active:scale-[0.98] shrink-0 whitespace-nowrap"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
