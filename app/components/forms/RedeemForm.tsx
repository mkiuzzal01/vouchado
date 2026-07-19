"use client";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import RangeInput from "./inputs/RangeInput";

export default function RedeemForm() {
  const { user } = useAppSelector((state) => state.auth);

  const handleFormSubmit = (values: { budget: number }, reset: () => void) => {
    console.log("Form submitted with values:", values);
    reset();
  };

  return (
    <div>
      <h1 className="text-sm text-gray-500">
        Every 1,000 points can be redeemed for a €50 discount.
      </h1>
      <AppForm onSubmit={handleFormSubmit}>
        <RangeInput
          label="Select Maximum Budget Allocation (€)"
          name="budget"
          min={0}
          max={1000}
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
