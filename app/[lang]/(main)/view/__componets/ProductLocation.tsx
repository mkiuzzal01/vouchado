import Accessibility from "@/app/components/icons/Accessablity";
import Location from "@/app/components/icons/Location";
import Time from "@/app/components/icons/Time";
import ItemMap from "./ItemMap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface LatLng {
  lat: number;
  lng: number;
}

interface Props {
  location?: LatLng;
  accessibility?: string;
  opening?: string;
}

export default function ProductLocation({
  location,
  opening,
  accessibility,
}: Props) {
  const handleGetDirection = () => {
    if (!location) return;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 text-left">
      <h4 className="text-sm font-bold text-gray-900 tracking-tight">
        Local Information
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
              {opening ? opening : "Not Available"}
            </p>
          </div>
        </div>

        {/* Accessibility Meta Layout Block */}
        <div className="flex items-start gap-2.5">
          <Accessibility />
          <div className="space-y-0.5">
            <p className="font-bold text-gray-900">Accessibility</p>
            <p className="text-gray-400 leading-normal text-[11px]">
              {accessibility}
            </p>
          </div>
        </div>
      </div>

      {/* Miniature Map Segment Frame Layout */}
      <div className="relative w-full bg-slate-50 border border-gray-100 rounded-xl overflow-hidden flex flex-col justify-between">
        <ItemMap
          center={location ? location : { lat: 23.8103, lng: 90.4125 }}
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-black text-xl font-medium">
          US Olympic & Paralympic Museum
        </h1>
        <p className="text-[#454F5B]">
          200 S Sierra Madre St, Colorado prings, CO 80903, United States
        </p>
      </div>
      <Button
        onClick={handleGetDirection}
        variant="ghost"
        className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-xs font-medium  hover:bg-gray-50 flex items-center justify-between px-8"
      >
        <span className="text-sm">Get Direction</span> <ArrowRight size={14} />
      </Button>
    </div>
  );
}
