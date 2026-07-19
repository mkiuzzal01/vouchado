"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { updateGranted12Months } from "@/redux/features/deal/deal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { toast } from "react-toastify";

export default function DealsTerms() {
  const dispatch = useAppDispatch();

  const { granted_12_months } = useAppSelector((state) => state.deal);

  const handleTermsAndConditionsChange = () => {
    if (granted_12_months) {
      toast.success("Granted 12 Months For This Deal");
    } else {
      toast.error("Revoked 12 Months For This Deal");
    }
    dispatch(updateGranted12Months());
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <Checkbox
        id="12_months"
        checked={!!granted_12_months}
        onCheckedChange={() => handleTermsAndConditionsChange()}
        className="transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
      />
      <Label
        htmlFor="12_months"
        className="font-semibold text-sm text-slate-700 cursor-pointer"
      >
        Granted 12 Months
      </Label>
    </div>
  );
}
