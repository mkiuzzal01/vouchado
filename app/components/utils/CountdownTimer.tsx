"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate: string;
  className?: string;
}

const CountdownTimer = ({ endDate, className = "" }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate).getTime() - Date.now();

    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60));

    return { days, hours };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <div
        className={`bg-[#fff0f0] text-[#FF4842] text-[10px] sm:text-[13px] px-3 py-1 rounded-sm ${className}`}
      >
        Expired
      </div>
    );
  }

  return (
    <div
      className={`bg-[#fff0f0] text-[#FF4842] text-[10px] sm:text-[13px] px-3 py-1 rounded-sm ${className}`}
    >
      Ends in {timeLeft.days > 0 ? `${timeLeft.days}d` : `${timeLeft.hours}h`}
    </div>
  );
};

export default CountdownTimer;
