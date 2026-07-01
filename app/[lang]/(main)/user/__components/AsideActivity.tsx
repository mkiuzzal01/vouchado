import Redeem from "@/app/components/icons/Redeem";
import SpaBooking from "@/app/components/icons/SpaBooking";
import UsOlympic from "@/app/components/icons/UsOlympic";

const activities = [
  {
    id: 1,
    name: "Spa booking",
    points: "+100",
    icon: <SpaBooking size={40} />,
    isPositive: true,
  },
  {
    id: 2,
    name: "US Olympic & Paralym...",
    points: "+50",
    icon: <UsOlympic />,
    isPositive: true,
  },
  {
    id: 3,
    name: "Redeemed €50 vou...",
    points: "-1000",
    icon: <Redeem />,
    isPositive: false,
  },
  {
    id: 4,
    name: "Spa booking",
    points: "+100",
    icon: <SpaBooking />,
    isPositive: true,
  },
];

export default function AsideActivity() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Recent activities
      </h3>

      <div className="space-y-2">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between border border-gray-100 p-1 rounded-xl"
          >
            <div className="flex items-center gap-2">
              {act.icon}
              <p className="text-sm lg:text-lg font-semibold text-[#212B36] truncate">
                {act.name}
              </p>
            </div>
            <p
              className={`text-xl lg:text-2xl font-bold shrink-0 ${act.isPositive ? "text-teal-600" : "text-rose-500"}`}
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
