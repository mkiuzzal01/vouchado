interface ProfileMapProps {
  latitude?: number | string;
  longitude?: number | string;
}

export default function ProfileMap({ latitude, longitude }: ProfileMapProps) {
  if (latitude == null || longitude == null) {
    return (
      <div className="flex items-center justify-center w-full h-32 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
        Location not available
      </div>
    );
  }

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-xl border border-gray-100">
      <iframe
        title="Business Location"
        src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
