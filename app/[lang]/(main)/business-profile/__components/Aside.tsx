import OpeaningTime from "@/app/components/icons/OpeaningTime";
import Image from "next/image";

interface Props {
  business_profile: any;
}

export default function Aside({ business_profile }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* Profile Avatar Block overlapping the banner */}
      <div className="relative flex justify-center items-center -mt-16 md:-mt-28 z-20">
        <div className="relative h-40 w-40 rounded-full border-4 border-white bg-black overflow-hidden shadow-md">
          <Image
            src={business_profile?.business_logo_full_url}
            alt={business_profile?.business_name}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Available for Withdrawal Card & Button Stack */}
      <div className="flex flex-col gap-3 mt-4">
        {business_profile?.business_description}
      </div>

      {/* Minimalist Opening Hours (No BG/Border matching image_ccb5ce.png) */}
      <div className="w-full mt-2">
        <div className="flex items-center gap-2 font-semibold text-gray-800 pb-3 mb-2">
          <OpeaningTime size={16} />
          <p className="text-sm font-bold text-gray-900">Opening Hours</p>
        </div>
        <ul className="space-y-3.5 text-xs text-gray-600">
          {business_profile?.business_hours?.map((item: any, idx: number) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="font-medium text-gray-800">
                {item.day.toLocaleUpperCase()}
              </span>
              <span
                className={
                  item.is_closed
                    ? "text-red-500 font-medium"
                    : "text-gray-400 font-normal"
                }
              >
                {item.is_closed
                  ? "Closed"
                  : `${item.open_time} - ${item.close_time}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
