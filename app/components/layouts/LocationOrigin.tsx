"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Location from "../icons/Location";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { setSystem } from "@/redux/features/system/system.slice";

const setLocationCookie = (name: string, value: string | number | null) => {
  if (value === null || value === undefined) {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; Secure`;
  } else {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=604800; SameSite=Lax; Secure`;
  }
};

async function fetchAreaFromCoords(lat: number, lng: number): Promise<string> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  );
  if (!response.ok) throw new Error("Google Geocoding request failed");

  const data = await response.json();
  if (data.status !== "OK" || !data.results?.length) {
    throw new Error(data.error_message || `Google API Status: ${data.status}`);
  }

  const firstResult = data.results[0];
  const addressComponents = firstResult.address_components || [];

  let city = "";
  let country = "";

  for (const component of addressComponents) {
    if (
      component.types.includes("locality") ||
      component.types.includes("administrative_area_level_1")
    ) {
      city = component.long_name;
      if (component.types.includes("locality")) break;
    }
  }
  for (const component of addressComponents) {
    if (component.types.includes("country")) {
      country = component.long_name;
    }
  }

  return city && country ? `${city}` : firstResult.formatted_address;
}

export default function LocationOrigin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { area } = useAppSelector((state) => state.system);
  const [isLoading, setIsLoading] = useState(!area);

  useEffect(() => {
    if (area) {
      setIsLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const areaName = await fetchAreaFromCoords(latitude, longitude);

          if (isMounted) {
            // 1. Sync Redux state
            dispatch(setSystem({ latitude, longitude, area: areaName }));

            // 2. Write to Cookies for SSR accessibility
            setLocationCookie("latitude", latitude);
            setLocationCookie("longitude", longitude);
            setLocationCookie("area", areaName);

            // 3. Inform Next.js to update Server Component trees
            router.refresh();
          }
        } catch (error) {
          console.error("Error matching location coordinates:", error);
          if (isMounted) {
            dispatch(setSystem({ latitude, longitude, area: "" }));
            setLocationCookie("latitude", latitude);
            setLocationCookie("longitude", longitude);
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      },
      (error) => {
        console.warn("Geolocation rejected:", error.message);
        if (isMounted) {
          dispatch(setSystem({ latitude: null, longitude: null, area: "" }));
          setLocationCookie("latitude", null);
          setLocationCookie("longitude", null);
          setIsLoading(false);
        }
      },
      { enableHighAccuracy: false, timeout: 8000 },
    );

    return () => {
      isMounted = false;
    };
  }, [dispatch, area, router]);

  const handleResetLocation = () => {
    dispatch(setSystem({ latitude: null, longitude: null, area: null }));
    setLocationCookie("latitude", null);
    setLocationCookie("longitude", null);
    setLocationCookie("area", null);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={handleResetLocation}
        disabled={isLoading}
        className={`flex items-center gap-2 xl:gap-1 2xl:gap-2 rounded-full bg-gray-50 border px-4 py-2 text-xs lg:text-sm xl:text-xs 2xl:text-base font-medium hover:bg-gray-200 transition-all duration-200 ${
          isLoading ? "opacity-70 animate-pulse pointer-events-none" : ""
        }`}
        aria-label="Location status"
      >
        <Location size={15} />
        {isLoading ? "Detecting..." : area || "Select Location"}
      </button>
    </div>
  );
}
