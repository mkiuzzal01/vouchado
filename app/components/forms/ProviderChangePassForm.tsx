"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ProviderChangePassForm({ t }: Props) {
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
            label={
              t?.provider_profile?.settings?.change_password?.current_password
                ?.label || "Current Password"
            }
            placeholder={
              t?.provider_profile?.settings?.change_password?.current_password
                ?.placeholder || "Enter Current Password"
            }
          />
          <TextInput
            required
            type="password"
            name="password"
            label={
              t?.provider_profile?.settings?.change_password?.new_password
                ?.label || "New Password"
            }
            placeholder={
              t?.provider_profile?.settings?.change_password?.new_password
                ?.placeholder || "Enter New Password"
            }
          />
          <TextInput
            required
            type="password"
            name="password_confirmation"
            label={
              t?.provider_profile?.settings?.change_password?.confirm_password
                ?.label || "Confirm New Password"
            }
            placeholder={
              t?.provider_profile?.settings?.change_password?.confirm_password
                ?.placeholder || "Confirm New Password"
            }
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton
            isLoading={isLoading}
            title={
              t?.provider_profile?.settings?.change_password?.update_button ||
              "Update"
            }
            className="py-6 w-1/4 rounded-full"
          />
        </div>
      </AppForm>
    </div>
  );
}
