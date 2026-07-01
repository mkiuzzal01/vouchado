"use client";
import CreateDealForm from "@/app/components/forms/muti-steps/CreateDealForm";
import Plus from "@/app/components/icons/Pluse";
import Scan from "@/app/components/icons/Scan";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { setOpenDealModal } from "@/redux/features/provider/deal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";

interface Props {
  title: string;
}

export default function CreateDealAction({ title }: Props) {
  const dispatch = useAppDispatch();
  const { openDealModal } = useAppSelector((state) => state.deal);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Page Title */}
      <h1 className="text-[44px] font-semibold text-slate-900 tracking-tight">
        {title}
      </h1>

      {/* Action Buttons Container */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Outlined "Scan Voucher" Button */}
        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-[#2EC1CC] font-semibold rounded-full text-[15px] text-[#2EC1CC] hover:bg-[#2EC1CC]/5 transition-colors shadow-sm w-full sm:w-auto tracking-wide">
          <Scan />
          <span>Scan Voucher</span>
        </button>

        {/* Solid "Add New Deal" Button */}
        <button
          onClick={() => dispatch(setOpenDealModal(!openDealModal))}
          className="flex items-center justify-center gap-2 p-4 bg-[#2EC1CC] font-semibold rounded-full text-[15px] text-white hover:bg-[#26A6AF] transition-colors shadow-sm w-full sm:w-auto tracking-wide"
        >
          <Plus color="#fff" size={14} />
          <span>Add New Deal</span>
        </button>
      </div>
      <ModalContainer
        title="Create new voucher"
        isOpen={openDealModal}
        onClose={() => dispatch(setOpenDealModal(!openDealModal))}
      >
        <CreateDealForm />
      </ModalContainer>
    </div>
  );
}
