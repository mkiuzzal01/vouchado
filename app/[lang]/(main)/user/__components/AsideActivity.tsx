import Redeem from "@/app/components/icons/Redeem";
import SpaBooking from "@/app/components/icons/SpaBooking";
import UsOlympic from "@/app/components/icons/UsOlympic";
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

      <div className="space-y-2">
        {recentActivities.map((act, index) => (
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
        <button className="w-full py-2 px-4 text-center font-semibold text-teal-500 border border-teal-500/30 rounded-full hover:bg-teal-50/50 transition-colors">
          View more
        </button>
      </div>
    </div>
  );
}
