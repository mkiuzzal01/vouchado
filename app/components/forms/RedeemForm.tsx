import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";

export default function RedeemForm() {
  const onSumitForm = (value: FieldValues) => {
    console.log(value);
  };
  return (
    <div>
      <h1 className="text-sm text-gray-500">
        Every 1,000 points can be redeemed for a €50 discount.
      </h1>
      <AppForm onSubmit={onSumitForm}>
        <TextInput type="range" name="code" className="accent-[#2BC4CA]" />
        <SubmitButton
          title="Redeem"
          type="submit"
          className="bg-[#2BC4CA] hover:bg-[#2BC4CA] text-white py-3 rounded-full"
        />
      </AppForm>
    </div>
  );
}
