import { ChevronLeft, ChevronRight } from "lucide-react";
import AppForm from "../AppForm";
import FileInput from "../inputs/FileInput";
import {
  setOpenDealModal,
  setStep,
  updateDealInfo,
} from "@/redux/features/provider/deal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { FieldValues } from "react-hook-form";

export default function Media() {
  const dispatch = useAppDispatch();
  const { dealInfo, openDealModal } = useAppSelector((state) => state.deal);

  const onSubmit = (value: FieldValues) => {
    dispatch(updateDealInfo(value));
    dispatch(setStep(2));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <AppForm onSubmit={onSubmit} defaultValues={dealInfo}>
          <div className="space-y-6">
            <div>
              <FileInput name="coverImage" label="Cover Image" />
            </div>

            <div>
              <FileInput multiple name="galleryImages" label="Gallery Images" />
            </div>
            <div className="flex justify-between pt-6 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={() => dispatch(setOpenDealModal(!openDealModal))}
                className="px-6 py-2.5 border border-slate-200 rounded-full font-medium text-slate-500 text-sm flex items-center gap-1 hover:bg-slate-50 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full text-sm flex items-center gap-1 shadow-sm transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AppForm>
      </div>
    </div>
  );
}
