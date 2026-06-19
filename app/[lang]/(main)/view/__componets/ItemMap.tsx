interface LatLng {
  lat: number;
  lng: number;
}

interface Props {
  location?: string;
  center: LatLng;
  zoom?: number;
  height?: string;
  className?: string;
}

export default function ItemMap({
  center,
  location,
  zoom = 14,
  height = "450px",
  className = "",
}: Props) {
  const { lat, lng } = center;

  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <iframe
      title={location || "map"}
      src={src}
      width="100%"
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className={`rounded-2xl w-full ${className}`}
    />
  );
}
