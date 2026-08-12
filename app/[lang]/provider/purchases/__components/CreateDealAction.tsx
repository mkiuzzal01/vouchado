"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import GiftVoucherForm from "@/app/components/forms/GiftVoucherForm";
import CreateDealForm from "@/app/components/forms/muti-steps/CreateDealForm";
import CreateGiftVoucherIcon from "@/app/components/icons/CreateGiftVoucherIcon";
import Plus from "@/app/components/icons/Pluse";
import Scan from "@/app/components/icons/Scan";
import ModalContainer from "@/app/components/shared/ModalContainer";
import ScanVoucher from "@/app/components/utils/ScanVoucher";
import { setOpenDealModal } from "@/redux/features/deal/deal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { useState } from "react";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  title: string;
}

export default function CreateDealAction({ title, t }: Props) {
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { openDealModal } = useAppSelector((state) => state.deal);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Page Title */}
      <h1 className="text-[44px] font-semibold text-slate-900 tracking-tight">
        {title}
      </h1>

      <div className="flex justify-between items-center">
        {/* Action Buttons Container */}
        <div className="flex flex-wrap items-center gap-3 w-full">
          {/* Outlined "Scan Voucher" Button */}
          <button
            onClick={() => setOpenVoucherModal(!openVoucherModal)}
            className="flex items-center justify-center gap-2 p-4 bg-white border font-semibold rounded-full text-[15px] hover:bg-[#2EC1CC]/5 transition-colors  w-full sm:w-auto tracking-wide"
          >
            <CreateGiftVoucherIcon />
            <span>
              {t?.provider_profile?.dashboard?.create_gift_voucher?.button}
            </span>
          </button>

          <button
            onClick={() => setIsScannerOpen(!isScannerOpen)}
            className="flex items-center justify-center gap-2 p-4 bg-white border border-[#2EC1CC] font-semibold rounded-full text-[15px] text-[#2EC1CC] hover:bg-[#2EC1CC]/5 transition-colors shadow-sm w-full sm:w-auto tracking-wide"
          >
            <Scan />
            <span>
              {t?.provider_profile?.dashboard?.utilities?.scan_voucher}
            </span>
          </button>

          {/* Solid "Add New Deal" Button */}
          <button
            onClick={() => dispatch(setOpenDealModal(!openDealModal))}
            className="flex items-center justify-center gap-2 p-4 bg-[#2EC1CC] font-semibold rounded-full text-[15px] text-white hover:bg-[#26A6AF] transition-colors shadow-sm w-full sm:w-auto tracking-wide"
          >
            <Plus color="#fff" size={14} />
            <span>
              {t?.provider_profile?.dashboard?.utilities?.create_new_deal}
            </span>
          </button>
        </div>
        <div>
          <ModalContainer
            title="Create new voucher"
            isOpen={openDealModal}
            onClose={() => dispatch(setOpenDealModal(!openDealModal))}
          >
            <CreateDealForm />
          </ModalContainer>

          <ModalContainer
            title="Create new voucher"
            width="lg"
            isOpen={openVoucherModal}
            onClose={() => setOpenVoucherModal(!openVoucherModal)}
          >
            <GiftVoucherForm deal_id={1} lang="en" t={t} />
          </ModalContainer>

          <ModalContainer
            title="Voucher Scanner"
            width="lg"
            isOpen={isScannerOpen}
            onClose={() => setIsScannerOpen(!isScannerOpen)}
          >
            <ScanVoucher setScanModal={setIsScannerOpen} />
          </ModalContainer>
        </div>
      </div>
    </div>
  );
}
