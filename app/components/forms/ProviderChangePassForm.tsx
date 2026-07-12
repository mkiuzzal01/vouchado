"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProviderChangePassForm() {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        router?.refresh?.();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <AppForm onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            required
            type="password"
            name="old_password"
            label="Current Password"
            placeholder="Enter Current Password"
          />
          <TextInput
            required
            type="password"
            name="password"
            label="New Password"
            placeholder="Enter New Password"
          />
          <TextInput
            required
            type="password"
            name="password_confirmation"
            label="Confirm New Password"
            placeholder="Confirm New Password"
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton
            isLoading={isLoading}
            title="Update"
            className="py-6 w-1/4 rounded-full"
          />
        </div>
      </AppForm>
    </div>
  );
}
