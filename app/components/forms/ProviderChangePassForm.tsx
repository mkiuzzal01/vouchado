"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";
import { FieldValues } from "react-hook-form";

export default function ProviderChangePassForm() {
  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <AppForm onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput name="currentPassword" label="Current Password" />
          <TextInput name="newPassword" label="New Password" />
          <TextInput name="confirmPassword" label="Confirm New Password" />
        </div>
        <div className="flex justify-end">
          <SubmitButton title="Update" className="py-6 w-1/4 rounded-full" />
        </div>
      </AppForm>
    </div>
  );
}
