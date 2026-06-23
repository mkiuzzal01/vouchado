import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useDispatch } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { setStep } from "@/redux/features/provider/deal.slice";
import Image from "next/image";

export default function Preview() {
  const dispatch = useDispatch();
  const dealState = useAppSelector((state) => state.deal);

  const submitCompletedPayload = () => {
    console.table(dealState);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Main Column Grid Layout Elements */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {dealState.dealInfo.name ||
                "US Olympic & Paralympic Museum Ticket"}
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">
              Experience America's Olympic history through interactive exhibits.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#29b6be]">
            <span className="px-2.5 py-1 bg-cyan-50/60 rounded-md">
              ✓ Instant Confirmation
            </span>
            <span className="px-2.5 py-1 bg-cyan-50/60 rounded-md">
              ✓ Mobile Ticket
            </span>
            <span className="px-2.5 py-1 bg-cyan-50/60 rounded-md">
              ✓ Best Price Guarantee
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 relative w-full max-h-[380px]">
            <Image
              src={
                dealState.media.coverImage ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
              }
              alt="Main Content Preview Showcase Banner"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dealState.media.galleryImages?.map((image, idx) => (
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  key={idx}
                  src={
                    image ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                  }
                  alt={`Additional Image ${idx + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Sub Navigation Anchor Mocks */}
          <div className="border-b border-gray-100 flex gap-6 text-xs font-bold text-gray-400 pb-px">
            <span className="text-[#29b6be] border-b-2 border-[#29b6be] pb-2 cursor-pointer">
              Overview
            </span>
            <span className="pb-2 cursor-pointer hover:text-slate-600 transition-colors">
              What's Included
            </span>
            <span className="pb-2 cursor-pointer hover:text-slate-600 transition-colors">
              Visitor Info
            </span>
            <span className="pb-2 cursor-pointer hover:text-slate-600 transition-colors">
              Reviews
            </span>
          </div>

          {/* Highlights Blocks Section Layout */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">
              Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs text-slate-600 flex gap-2">
                <span className="text-[#29b6be] font-bold">✨</span>
                <span>Explore the inspiring history of Team USA</span>
              </div>
              <div className="p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs text-slate-600 flex gap-2">
                <span className="text-[#29b6be] font-bold">✨</span>
                <span>Interactive exhibits & hands-on activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
        <button
          type="button"
          onClick={() => dispatch(setStep(4))}
          className="px-5 h-11 border border-gray-200 rounded-full font-semibold text-gray-500 hover:bg-gray-50 text-sm flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={submitCompletedPayload}
          className="px-8 h-11 bg-[#29b6be] hover:bg-[#1fa0a7] text-white font-bold rounded-full text-sm shadow-md transition-colors"
        >
          Publish Deal
        </button>
      </div>
    </div>
  );
}
