import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppForm from "../AppForm";
import TextInput from "../inputs/TextInput";
import { setStep, updateDealInfo } from "@/redux/features/deal/deal.slice";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks/globalhooks";

export default function Info() {
  const dispatch = useDispatch();
  const { dealInfo } = useAppSelector((state) => state.deal);

  const onSubmit = (value: FieldValues) => {
    dispatch(updateDealInfo(value));
    dispatch(setStep(3));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Input Shell Fields */}
      <div className="lg:col-span-3">
        <AppForm onSubmit={onSubmit} defaultValues={dealInfo}>
          <div className="space-y-4">
            <TextInput
              name="voucher_name"
              label="Name your voucher"
              placeholder="Summer Offer 2024"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="regularPrice"
                label="Regular price"
                placeholder="100"
                type="number"
                required
              />
              <TextInput
                name="discountedPrice"
                label="Discounted price"
                placeholder="70"
                type="number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="totalPurchaseLimit"
                label="Total Purchase limit"
                placeholder="100"
                type="number"
                required
              />
              <TextInput
                name="maxPurchasePerCustomer"
                label="Maximum Purchase Per Customer"
                placeholder="70"
                type="number"
                required
              />
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={() => dispatch(setStep(1))}
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
