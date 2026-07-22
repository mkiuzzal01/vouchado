"use client";

import Redeem from "@/app/components/icons/Redeem";
import SpaBooking from "@/app/components/icons/SpaBooking";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { Activity } from "@/redux/types/user_profile";

interface IAsideActivity {
  recentActivities: Activity[];
}

export default function AsideActivity({ recentActivities }: IAsideActivity) {
  if (!recentActivities || recentActivities.length === 0) {
    return <NotFoundData description="No recent activities found" />;
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Recent activities
      </h3>

      <div className="max-h-77.5 overflow-y-auto space-y-2 pr-1">
        {recentActivities.map((act, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-100 p-2 rounded-xl"
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
      </div>
    </div>
  );
}
