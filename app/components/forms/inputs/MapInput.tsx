"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import { LocateFixed } from "lucide-react";
import ModalContainer from "../../shared/ModalContainer";

if (typeof window !== "undefined") {
  import("leaflet/dist/leaflet.css");
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconAnchor: [12, 41],
    iconSize: [25, 41],
  });
}

interface MapContentProps {
  position: L.LatLng | null;
  setPosition: (position: L.LatLng | null) => void;
  defaultCenter: L.LatLngExpression;
}

function MapContent({ position, setPosition, defaultCenter }: MapContentProps) {
  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
  } = require("react-leaflet");

  const MapEvents = () => {
    const map = useMapEvents({
      click(e: L.LeafletMouseEvent) {
        setPosition(e.latlng);
      },
    });

    useEffect(() => {
      if (!map) return;
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 150);

      return () => clearTimeout(timer);
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={position || defaultCenter}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      {position && (
        <Marker position={position}>
          <Popup>Location Selected</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

const LazyMapContent = dynamic(() => Promise.resolve(MapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-sm text-slate-400 font-medium">
      Loading Map Window...
    </div>
  ),
});

interface MapInputProps {
  value: L.LatLng | null;
  onChange: (position: L.LatLng | null) => void;
}

export default function MapInput({ value, onChange }: MapInputProps) {
  const [isOpen, setOpen] = useState(false);
  const defaultCenter: L.LatLngExpression = [51.505, -0.09];

  return (
    <div className="w-full space-y-1.5">
      <label className="block text-sm font-medium text-slate-600 tracking-tight">
        Location
      </label>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full h-12 px-4 bg-[#f8fafc] hover:bg-slate-100/70 border border-slate-200/60 rounded-xl cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        <span
          className={`text-sm select-none ${
            value ? "text-slate-700 font-medium" : "text-slate-400"
          }`}
        >
          {value
            ? `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`
            : "Select your location from map"}
        </span>
        <div className="text-slate-400">
          <LocateFixed size={18} />
        </div>
      </button>

      <ModalContainer isOpen={isOpen} onClose={() => setOpen(false)}>
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 z-10">
          {isOpen && (
            <LazyMapContent
              position={value}
              setPosition={onChange}
              defaultCenter={defaultCenter}
            />
          )}
        </div>
      </ModalContainer>
    </div>
  );
}
