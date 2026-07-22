"use client";
import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import RangeInput from "./inputs/RangeInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { setRedeemPointsDiscount } from "@/redux/features/cart/cart.slice";

interface Props {
  onClose: () => void;
}

export default function RedeemForm({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const loyalty_point =
    useAppSelector((state) => state?.auth.user?.loyalty_point) ?? 0;

  const points_conversion_rate =
    useAppSelector((state) => state.cart.points_conversion_rate) || 0;

  const handleFormSubmit = (values: FieldValues) => {
    dispatch(setRedeemPointsDiscount(Number(values?.budget)));
    onClose();
  };

  const hasPoints = Number(loyalty_point) > 0;

  return (
    <div>
      <h1 className="text-sm text-gray-500">
        Every 1,000 points can be redeemed for a €
        {(1000 * points_conversion_rate).toFixed(2)} discount.
      </h1>
      <AppForm onSubmit={handleFormSubmit} defaultValues={{ budget: 0 }}>
        <RangeInput
          disabled={!hasPoints}
          name="budget"
          min={0}
          max={loyalty_point}
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
