"use client";
import GiftVoucherForm from "@/app/components/forms/GiftVoucherForm";
import CreateGiftVoucherIcon from "@/app/components/icons/CreateGiftVoucherIcon";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useState } from "react";

interface Props {
  profileInfo: any;
}

export default function CreateGiftVoucher({ profileInfo }: Props) {
  const [openVoucherModal, setOpenVoucherModal] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 flex items-center gap-1.5">
          Hi {profileInfo?.name} <span className="animate-pulse">👋</span>
        </h1>
        <p className="text-base text-gray-400 font-normal mt-0.5">
          Let's grow your business today
        </p>
      </div>
      <button
        onClick={() => setOpenVoucherModal(!openVoucherModal)}
        className="flex items-center justify-center gap-2 p-4 bg-white border font-semibold rounded-full text-[15px] hover:bg-[#2EC1CC]/5 transition-colors  w-full sm:w-auto tracking-wide"
      >
        <CreateGiftVoucherIcon />
        <span>Create gift Voucher</span>
      </button>
      <ModalContainer
        width="lg"
        title="Create new voucher"
        isOpen={openVoucherModal}
        onClose={() => setOpenVoucherModal(!openVoucherModal)}
      >
        <GiftVoucherForm lang="en" deal_id={1} />
      </ModalContainer>
    </div>
  );
}
