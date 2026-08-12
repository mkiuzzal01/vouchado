import { getDictionary } from "@/app/[lang]/dictionaries";

interface ProfileMapProps {
  latitude?: number | string;
  longitude?: number | string;
  t?: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ProfileMap({
  latitude,
  longitude,
  t,
}: ProfileMapProps) {
  if (latitude == null || longitude == null) {
    return (
      <div className="flex items-center justify-center w-full h-32 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
        {t?.provider_profile?.provider?.address?.title ||
          "Location not available"}
      </div>
    );
  }

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-xl border border-gray-100">
      <iframe
        title={
          t?.provider_profile?.provider?.address?.map_title ||
          "Business Location"
        }
        src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
