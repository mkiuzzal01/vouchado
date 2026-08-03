import { useState, useEffect, useRef, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LIBRARIES: ["places"] = ["places"];

interface MapInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (
    value: string,
    coordinates?: { lat: number; lng: number },
  ) => void;
}

export default function MapInput({
  placeholder,
  value = "",
  onChange,
}: MapInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: LIBRARIES,
  });

  // Sync state when parent value prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Initialize Google Maps services
  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      placesService.current = new window.google.maps.places.PlacesService(
        document.createElement("div"),
      );
    }
  }, [isLoaded]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch place predictions with a simple debounce
  useEffect(() => {
    if (!inputValue.trim() || !autocompleteService.current) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      autocompleteService.current?.getPlacePredictions(
        { input: inputValue },
        (results, status) => {
          setIsSearching(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPredictions(results);
            setIsOpen(true);
          } else {
            setPredictions([]);
            setIsOpen(false);
          }
        },
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleSelectPrediction = useCallback(
    (prediction: google.maps.places.AutocompletePrediction) => {
      const selectedAddress = prediction.description;
      setInputValue(selectedAddress);
      onChange?.(selectedAddress);
      setIsOpen(false);

      if (placesService.current) {
        placesService.current.getDetails(
          {
            placeId: prediction.place_id,
            fields: ["geometry", "formatted_address"],
          },
          (place, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              place?.geometry?.location
            ) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              const coordinates = { lat, lng };

              onChange?.(selectedAddress, coordinates);
            }
          },
        );
      }
    },
    [onChange],
  );

  const handleGeoLocationClick = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (window.google) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              setIsSearching(false);
              if (status === "OK" && results?.[0]) {
                const address = results[0].formatted_address;
                setInputValue(address);
                onChange?.(address, { lat: latitude, lng: longitude });
              }
            },
          );
        }
      },
      (error) => {
        setIsSearching(false);
        console.error("Error fetching location", error);
        alert("Unable to fetch your location. Please check your permissions.");
      },
    );
  }, [onChange]);

  if (loadError) {
    return (
      <div className="text-red-500 text-sm p-2">
        Error loading maps script. Check your API key.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full font-sans text-left relative">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={inputValue}
          disabled={!isLoaded}
          onChange={handleInputChange}
          onFocus={() => predictions.length > 0 && setIsOpen(true)}
          className={cn(
            "text-black h-11 w-full transition pr-10 border-none",
            "focus-visible:ring-0",
            "focus-visible:border-primary outline-none",
          )}
          placeholder={
            placeholder ||
            (isLoaded ? "Search for an address..." : "Loading maps setup...")
          }
          autoComplete="off"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={!isLoaded}
          onClick={handleGeoLocationClick}
          className="absolute right-2 text-slate-400 hover:text-slate-600 hover:bg-transparent h-9 w-9 p-0"
          aria-label="Use current location"
        >
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="7" />
              <line x1="12" y1="1" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="1" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="23" y2="12" />
            </svg>
          )}
        </Button>
      </div>

      {isOpen && predictions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1">
          {predictions.map((prediction) => (
            <li key={prediction.place_id}>
              <button
                type="button"
                onClick={() => handleSelectPrediction(prediction)}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors border-b border-slate-50 last:border-b-0"
              >
                <span className="font-semibold text-slate-900 block">
                  {prediction.structured_formatting.main_text}
                </span>
                <span className="text-xs text-slate-500 block truncate">
                  {prediction.structured_formatting.secondary_text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
