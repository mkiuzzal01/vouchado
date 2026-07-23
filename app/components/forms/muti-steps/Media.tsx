import { ChevronLeft, ChevronRight } from "lucide-react";
import { FieldValues } from "react-hook-form";
import AppForm from "../AppForm";
import FileInput from "../inputs/FileInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  setOpenDealModal,
  setStep,
  updateMedia,
} from "@/redux/features/deal/deal.slice";

export default function Media() {
  const dispatch = useAppDispatch();

  const { media } = useAppSelector((state) => state.deal);

  const onSubmit = (values: FieldValues) => {
    dispatch(updateMedia(values));
    dispatch(setStep(2));
  };

  const handleBack = () => {
    dispatch(setOpenDealModal(false));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <AppForm defaultValues={media} onSubmit={onSubmit}>
          <div className="space-y-6">
            <FileInput required name="coverImage" label="Cover Image" />

            <FileInput
              required
              multiple
              maxFiles={4}
              name="galleryImages"
              label="Gallery Images"
            />

            <div className="flex justify-between pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <button
                type="submit"
                className="flex items-center gap-1 rounded-full bg-teal-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-600"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </AppForm>
      </div>
    </div>
  );
}
