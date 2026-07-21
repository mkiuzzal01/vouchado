"use client";
import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import RangeInput from "./inputs/RangeInput";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { updateLoyaltyPoint } from "@/redux/features/auth/auth.slice";

interface Props {
  loyaltyPoints: number;
}

export default function RedeemForm({ loyaltyPoints }: Props) {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (values: FieldValues) => {
    dispatch(updateLoyaltyPoint(Number(values.budget)));
  };

  const hasPoints = loyaltyPoints > 0;

  return (
    <div>
      <h1 className="text-sm text-gray-500">
        Every 1,000 points can be redeemed for a €50 discount.
      </h1>
      <AppForm onSubmit={handleFormSubmit} defaultValues={{ budget: 0 }}>
        <RangeInput
          disabled={!hasPoints}
          name="budget"
          min={0}
          max={loyaltyPoints}
          step={10}
          required
        />
        <SubmitButton
          title="Redeem"
          type="submit"
          className="bg-[#2BC4CA] hover:bg-[#2BC4CA] text-white py-3 rounded-full"
        />
      </AppForm>
    </div>
  );
}
