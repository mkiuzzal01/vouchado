"use client";

import React, { useState, useEffect, useMemo } from "react";
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

interface VouchadoCountProps {
  service_end_at: string;
}

export default function VouchadoCount({ service_end_at }: VouchadoCountProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hrs: "00",
    mins: "00",
    secs: "00",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!service_end_at) return;

    const targetDate = new Date(service_end_at).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hrs: "00", mins: "00", secs: "00" });
        return;
      }

      // 24-Hour Cycle Base Multi-unit breakdown
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hrs = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hrs: hrs.toString().padStart(2, "0"),
        mins: mins.toString().padStart(2, "0"),
        secs: secs.toString().padStart(2, "0"),
      });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [service_end_at]);

  // Derived display details avoiding hydration mismatch
  const dealDetails = useMemo(() => {
    if (!mounted || !service_end_at) {
      return { date: "Loading...", time: "" };
    }
    const dateObj = new Date(service_end_at);

    return {
      date: dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: dateObj
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase(),
    };
  }, [mounted, service_end_at]);

  // Conditional rendering based on remaining days
  const displayHeading = useMemo(() => {
    const daysNum = parseInt(timeLeft.days, 10);
    if (daysNum > 0) {
      return `${daysNum}d ${timeLeft.hrs}h left`;
    }
    return `${timeLeft.hrs}hrs left`;
  }, [timeLeft.days, timeLeft.hrs]);

  const countdownMetrics = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hrs, label: "Hrs" },
    { value: timeLeft.mins, label: "Mins" },
    { value: timeLeft.secs, label: "Secs" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[144px] rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      {/* Left side: Background Image Banner with Data Overlays */}
      <div className="relative flex flex-1 flex-col sm:flex-row items-center gap-6 p-4 text-white min-h-[144px]">
        <Image
          src={left_side_image}
          alt="Vouchado banner countdown background"
          fill
          priority
          className="object-cover -z-10"
          sizes="(max-width: 768px) 100vw, 550px"
        />

        <div className="flex ml-auto flex-col gap-3 z-10">
          <div>
            <p className="text-sm font-medium">Vouchado Countdown</p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {displayHeading}
            </h2>
            <p className="text-xs mt-0.5">
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
      <div className="flex flex-col justify-between py-5.5 px-5 bg-white min-w-[190px]">
        {/* Deal Target Info */}
        <div className="flex items-start gap-3">
          <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#637381]">Deal ends</p>
            <h3 className="font-bold text-[#212B36] text-[15px] whitespace-nowrap">
              {dealDetails.date}
            </h3>
            <p className="text-[11px] text-[#637381] mt-0.5">
              {dealDetails.time}
            </p>
          </div>
        </div>

        {/* Urgent Action Link Tag/Pill */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#EAF9FA] px-4 py-2.5 text-sm text-[#1B696E]">
          <AlertCircle size={15} className="shrink-0" />
          <span className="text-[11px]">Act now, before it's gone!</span>
        </div>
      </div>
    </div>
  );
}
