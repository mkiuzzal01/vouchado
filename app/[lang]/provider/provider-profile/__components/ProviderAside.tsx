import Image from "next/image";
import providerImage from "@/public/hero/Ellipse 3334.png";
import withdrawalImage from "@/public/hero/Hero Section (2).png";
import OpeaningTime from "@/app/components/icons/OpeaningTime";

export interface BusinessHour {
  id: number;
  business_profile_id: number;
  day: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Props {
  openingHours?: BusinessHour[];
  business_logo?: string;
  withdrawn_amount: number;
}

export default function ProviderAside({
  openingHours,
  business_logo,
  withdrawn_amount,
}: Props) {
  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* Profile Avatar Block overlapping the banner */}
      <div className="relative flex justify-center items-center -mt-16 md:-mt-28 z-20">
        <div className="relative h-40 w-40 rounded-full border-4 border-white bg-black overflow-hidden shadow-md">
          <Image
            src={business_logo || providerImage}
            alt="Cannabis Shop"
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Available for Withdrawal Card & Button Stack */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="relative rounded-4xl p-6 text-center text-white overflow-hidden h-36 flex flex-col justify-center items-center">
          <Image
            src={withdrawalImage}
            alt="Withdrawal Background"
            fill
            priority
            className="object-cover z-0"
          />
          <div className="relative z-10 flex flex-col gap-1.5">
            <p className="text-sm md:text-xl text-white/90 font-medium whitespace-nowrap">
              Available for Withdrawal
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {withdrawn_amount}
            </h2>
          </div>
        </div>

        <button className="w-full border border-[#31BFC8] bg-white text-[#31BFC8] font-bold py-2.5 rounded-full text-md transition hover:bg-[#31BFC8] hover:text-white active:scale-[0.99]">
          Withdraw
        </button>
      </div>

      {/* Minimalist Opening Hours (No BG/Border matching image_ccb5ce.png) */}
      <div className="w-full mt-2">
        <div className="flex items-center gap-2 font-semibold text-gray-800 pb-3 mb-2">
          <OpeaningTime size={16} />
          <p className="text-sm font-bold text-gray-900">Opening Hours</p>
        </div>
        <ul className="space-y-3.5 text-xs text-gray-600">
          {openingHours?.map((item, idx) => (
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
