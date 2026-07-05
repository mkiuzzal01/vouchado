import Image from "next/image";
import providerBg_1 from "@/public/provider/Frame 2147240670.png";
import providerBg_2 from "@/public/provider/Frame 2147240672 (1).png";
import { QrCode, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import CreateDealForm from "@/app/components/forms/muti-steps/CreateDealForm";
import { setOpenDealModal } from "@/redux/features/provider/deal.slice";
import { useState } from "react";
import ScanVoucher from "@/app/components/utils/ScanVoucher";

export default function PromoCreateDeals() {
  const [scanModal, setScanModal] = useState(false);
  const dispatch = useAppDispatch();
  const { openDealModal } = useAppSelector((state) => state.deal);

  return (
    <div className="relative flex flex-col md:flex-row gap-4 w-full items-stretch">
      {/* Left Card: Scan Voucher */}
      <div className="relative flex-1 rounded-[24px] overflow-hidden min-h-[200px] flex items-center p-8 bg-linear-to-r from-[#eef9fa] to-[#e6f4f7]">
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
            <button className="text-[20px] lg:text-[24px] xl:text-[32px] font-bold text-gray-900">
              Scan Voucher
            </button>
          </div>

          <p className="text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-gray-500 max-w-xs leading-relaxed">
            Scan a voucher QR code to redeem and validate instantly
          </p>

          <Button
            onClick={() => setScanModal(!scanModal)}
            className="rounded-full px-[30px] xl:py-[24px] text-[14px] font-medium"
          >
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md border border-gray-100">
        <span className="text-xl font-semibold text-gray-500">or</span>
      </div>

      {/* Right Card: Create New Deal */}
      <div className="relative flex-1 rounded-[24px] overflow-hidden min-h-[200px] flex items-center p-8 bg-linear-to-r from-[#f0f7fc] to-[#ebf3f9]">
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
          <h3 className="text-lg lg:text-[24px] xl:text-[32px] font-bold text-gray-900">
            Create New Deal
          </h3>

          <p className="text-lg lg:text-[14px] xl:text-[16px] font-medium text-gray-500 max-w-xs leading-relaxed">
            Create a new deal in minutes and start attracting more customers.
          </p>

          <Button
            onClick={() => dispatch(setOpenDealModal(!openDealModal))}
            variant={"outline"}
            className="rounded-full lg:bg-transparent px-[30px] xl:py-[24px] text-[14px] font-medium border border-[#009BA8]"
          >
            <Plus size={20} className="text-[#009BA8]" />
            <span className="ml-2 text-[#009BA8]">Create New Deal</span>
            <ChevronRight
              size={20}
              className="ml-1 text-[#009BA8] group-hover:translate-x-0.5 transition-transform"
            />
          </Button>
        </div>
      </div>
      <ModalContainer
        title="Create new voucher"
        isOpen={openDealModal}
        onClose={() => dispatch(setOpenDealModal(!openDealModal))}
      >
        <CreateDealForm />
      </ModalContainer>
      <ModalContainer
        isOpen={scanModal}
        onClose={() => setScanModal(!scanModal)}
      >
        <ScanVoucher />
      </ModalContainer>
    </div>
  );
}
