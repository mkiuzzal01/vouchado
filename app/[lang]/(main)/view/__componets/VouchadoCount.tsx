import React from "react";
import Image from "next/image";
import left_side_image from "@/public/cart/Frame 2147240700.png";
import Calendar from "@/app/components/icons/Calendar";
import { AlertCircle } from "lucide-react";

interface CountdownItemProps {
  value: string;
  label: string;
}

function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#013445A3] rounded-xl w-14 h-14 border border-white/10 backdrop-blur-[2px]">
      <span className="text-xl font-bold leading-none">{value}</span>
      <span className="text-[10px] uppercase font-bold opacity-70 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function VouchadoCount() {
  const countdownMetrics = [
    { value: "05", label: "Hrs" },
    { value: "12", label: "Mins" },
    { value: "34", label: "Secs" },
  ];

  const dealDetails = {
    date: "08 Jun, 2026",
    time: "03:30pm",
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[850px] min-h-[180px] rounded-3xl border border-slate-100  overflow-hidden shadow-sm">
      {/* Left side: Background Image Banner with Data Overlays */}
      <div className="relative flex flex-1 flex-col sm:flex-row items-center gap-6 p-6 text-white min-h-[180px]">
        <Image
          src={left_side_image}
          alt="Vouchado banner countdown background"
          fill
          priority
          className="object-cover -z-10"
          sizes="(max-width: 768px) 100vw, 550px"
        />

        <div className="flex ml-25 flex-col gap-3 w-full z-10">
          <div>
            <p className="text-sm font-medium">Vouchado Countdown</p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              5hrs left
            </h2>
            <p className="text-xs  mt-0.5">
              Don't miss out! This deal expires soon.
            </p>
          </div>

          {/* Dynamic Map Loop for Timer Boxes */}
          <div className="flex items-center gap-2 mt-1">
            {countdownMetrics.map((metric, idx) => (
              <React.Fragment key={metric.label}>
                <CountdownItem value={metric.value} label={metric.label} />
                {idx < countdownMetrics.length - 1 && (
                  <span className="text-xl font-bold opacity-60 animate-pulse">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Information panel & Warning Actions */}
      <div className="flex flex-col justify-between p-6 bg-white min-w-[280px]">
        {/* Deal Target Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
            <Calendar size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#637381]">Deal ends</p>
            <h3 className="font-bold text-[#212B36]">{dealDetails.date}</h3>
            <p className="text-sm text-[#637381] mt-0.5">{dealDetails.time}</p>
          </div>
        </div>

        {/* Urgent Action Link Tag/Pill */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#EAF9FA]  px-4 py-2.5 text-sm  text-[#1B696E]">
          <AlertCircle size={18} className="shrink-0" />
          <span>Act now, before it's gone!</span>
        </div>
      </div>
    </div>
  );
}
