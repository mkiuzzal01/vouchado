import Image from "next/image";
import providerBg_1 from "@/public/provider/Frame 2147240670.png";
import providerBg_2 from "@/public/provider/Frame 2147240672 (1).png";
import { QrCode, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoCreateDeals() {
  return (
    <div className="relative flex flex-col md:flex-row gap-4 w-full items-stretch">
      {/* Left Card: Scan Voucher */}
      <div className="relative flex-1 rounded-[24px] overflow-hidden min-h-[200px] flex items-center p-8 bg-gradient-to-r from-[#eef9fa] to-[#e6f4f7]">
        {/* Background Graphic Asset */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={providerBg_1}
            alt="Scan Banner Background"
            fill
            className="object-cover object-left"
            priority
          />
        </div>

        {/* Content Layer (shifted right slightly to accommodate the phone graphics) */}
        <div className="relative z-10 ml-auto w-full max-w-[58%] flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-[20px] lg:text-[24px] xl:text-[32px] font-bold text-gray-900">
              Scan Voucher
            </h3>
          </div>

          <p className="text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-gray-500 max-w-xs leading-relaxed">
            Scan a voucher QR code to redeem and validate instantly
          </p>

          <Button className="rounded-full px-[30px] xl:py-[24px] text-[14px] font-medium">
            <QrCode size={20} />
            <span className="ml-2">Scan Now</span>
            <ChevronRight
              size={20}
              className="ml-1 group-hover:translate-x-0.5 transition-transform"
            />
          </Button>
        </div>
      </div>

      {/* Middle "or" Badge Separator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-md border border-gray-100">
        <span className="text-sm font-semibold text-gray-500">or</span>
      </div>

      {/* Right Card: Create New Deal */}
      <div className="relative flex-1 rounded-[24px] overflow-hidden min-h-[200px] flex items-center p-8 bg-gradient-to-r from-[#f0f7fc] to-[#ebf3f9]">
        {/* Background Graphic Asset */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={providerBg_2}
            alt="Create Deal Banner Background"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 mr-auto w-full max-w-[60%] flex flex-col items-start space-y-4">
          <h3 className="text-[20px] lg:text-[24px] xl:text-[32px] font-bold text-gray-900">
            Create New Deal
          </h3>

          <p className="text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-gray-500 max-w-xs leading-relaxed">
            Create a new deal in minutes and start attracting more customers.
          </p>

          <Button className="rounded-full px-[30px] xl:py-[24px] text-[14px] font-medium">
            <Plus size={20} />
            <span className="ml-2">Create New Deal</span>
            <ChevronRight
              size={20}
              className="ml-1 group-hover:translate-x-0.5 transition-transform"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
