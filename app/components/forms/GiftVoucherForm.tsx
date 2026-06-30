import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";

export default function GiftVoucherForm() {
  const handleSubmit = (values: any) => {
    console.log("Form submitted with:", values);
  };

  return (
    <div>
      <AppForm onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {/* Email Input Field */}
          <TextInput
            name="email"
            label="Person’s email address"
            placeholder="johncarter@brix.com"
            type="email"
          />

          {/* Amount Input Field */}
          <TextInput
            name="amount"
            label="Gift amount"
            placeholder="150"
            type="number"
          />

          <div className="pt-2">
            <SubmitButton
              title="Continue"
              className="w-full py-6 rounded-full"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
