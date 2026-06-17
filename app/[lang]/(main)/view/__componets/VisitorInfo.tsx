import Accessibility from "@/app/components/icons/Accessablity";
import Location from "@/app/components/icons/Location";
import Time from "@/app/components/icons/Time";
import ItemMap from "./ItemMap";

export default function VisitorInfo() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 text-left">
      <h4 className="text-sm font-bold text-gray-900 tracking-tight">
        Visitor Information
      </h4>

      <div className="space-y-3.5 text-xs text-gray-600 font-light">
        {/* Location Meta Layout Block */}
        <div className="flex items-start gap-2.5">
          <Location size={20} />

          <div className="space-y-0.5">
            <p className="font-bold text-gray-900">Location</p>
            <p className="text-gray-400 leading-normal text-[11px]">
              200 S Sierra Madre St, Colorado Springs, CO 80903, United States
            </p>
          </div>
        </div>

        {/* Opening Hours Meta Layout Block */}
        <div className="flex items-start gap-2.5">
          <Time />
          <div className="space-y-0.5">
            <p className="font-bold text-gray-900">Opening Hours</p>
            <p className="text-gray-400 leading-normal text-[11px]">
              Mon - Sun: 9:00 AM - 5:00 PM, Last entry: 4:00 PM
            </p>
          </div>
        </div>

        {/* Accessibility Meta Layout Block */}
        <div className="flex items-start gap-2.5">
          <Accessibility />
          <div className="space-y-0.5">
            <p className="font-bold text-gray-900">Accessibility</p>
            <p className="text-gray-400 leading-normal text-[11px]">
              Fully accessible for wheelchairs and strollers.
            </p>
          </div>
        </div>
      </div>

      {/* Miniature Map Segment Frame Layout */}
      <div className="relative w-full bg-slate-50 border border-gray-100 rounded-xl overflow-hidden flex flex-col justify-between">
        <ItemMap />
      </div>
    </div>
  );
}
