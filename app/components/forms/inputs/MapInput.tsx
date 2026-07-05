import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import standard Leaflet markers
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Helper function to extract asset URLs across different bundlers (Vite/NextJS/Webpack)
const getIconUrl = (img: unknown): string => {
  if (typeof img === "string") return img;
  if (img && typeof img === "object" && "src" in img)
    return (img as { src: string }).src;
  return "";
};

const DefaultIcon = L.icon({
  iconUrl: getIconUrl(icon),
  shadowUrl: getIconUrl(iconShadow),
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// 1. Define specific interfaces for your sub-component props
interface LocationMarkerProps {
  position: L.LatLng | null;
  setPosition: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Location Selected</Popup>
    </Marker>
  );
}

export default function MapInput() {
  // 2. Strongly type the state hook to accept either a LatLng instance or null
  const [position, setPosition] = useState<L.LatLng | null>(null);

  // 3. Cast the center array to LatLngExpression so React-Leaflet accepts it seamlessly
  const defaultCenter: L.LatLngExpression = [51.505, -0.09];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Select Your Location</h2>

      {/* The Input Field */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Selected Coordinates:
        </label>
        <input
          type="text"
          readOnly
          value={
            position
              ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
              : "Click on the map..."
          }
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>

      {/* The Map */}
      <div style={{ height: "400px", width: "100%", border: "2px solid #ccc" }}>
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
    </div>
  );
}
