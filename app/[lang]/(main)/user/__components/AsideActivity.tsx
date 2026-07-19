"use client";

import { useState, useEffect, useRef } from "react";
import Redeem from "@/app/components/icons/Redeem";
import SpaBooking from "@/app/components/icons/SpaBooking";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { Activity } from "@/redux/types/user_profile";

interface IAsideActivity {
  recentActivities: Activity[];
}

export default function AsideActivity({ recentActivities }: IAsideActivity) {
  // 1. Manage the visibility limit count state (starts at 5)
  const [visibleCount, setVisibleCount] = useState(5);
  const observerRef = useRef<HTMLDivElement | null>(null);

  if (!recentActivities || recentActivities.length === 0) {
    return <NotFoundData description="No recent activities found" />;
  }

  // 2. Slice the main array data source up to the visible count marker
  const displayedActivities = recentActivities.slice(0, visibleCount);
  const hasMore = visibleCount < recentActivities.length;

  // 3. Set up the Intersection Observer to trigger updates automatically on scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Increase by 5 elements (or your preferred chunk size) when user scrolls down
          setVisibleCount((prev) => prev + 5);
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Recent activities
      </h3>

      <div className="space-y-2">
        {displayedActivities.map((act, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-100 p-1 rounded-xl"
          >
            <div className="flex items-center gap-2">
              {act.type === "earn" ? <SpaBooking /> : <Redeem />}
              <p className="text-sm lg:text-lg font-semibold text-[#212B36]">
                {act.title}
              </p>
            </div>
            <p
              className={`text-xl lg:text-2xl font-bold shrink-0 ${
                act.type === "earn" ? "text-teal-600" : "text-rose-500"
              }`}
            >
              {act.points}
            </p>
          </div>
        ))}
        {hasMore && (
          <div ref={observerRef} className="pt-2">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="w-full py-2 px-4 text-center font-semibold text-teal-500 border border-teal-500/30 rounded-full hover:bg-teal-50/50 transition-colors text-sm"
            >
              Loading more items...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
