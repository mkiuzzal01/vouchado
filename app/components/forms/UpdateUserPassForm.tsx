"use client";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UpdateUserPassFormProps {
  onClose: () => void;
}

export default function UpdateUserPassForm({
  onClose,
}: UpdateUserPassFormProps) {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const router = useRouter();

  const submit = async (data: any) => {
    try {
      const res = await changePassword(data).unwrap();
      toast.success(res.message);
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <div>
      <AppForm onSubmit={submit}>
        <div>
          <TextInput
            type="password"
            name="old_password"
            label="Current Password"
            placeholder="Enter current password"
          />
          <TextInput
            type="password"
            name="password"
            label="New Password"
            placeholder="Enter new password"
          />
          <TextInput
            type="password"
            name="password_confirmation"
            label="Confirm New Password"
            placeholder="Enter new password"
          />
          <SubmitButton
            className="w-full sm:w-auto px-8 py-2.5 bg-[#31BFC8] hover:bg-[#31BF96]/90 text-white font-bold text-xs rounded-full transition-colors shadow-sm"
            isLoading={isLoading}
            title="Update Password"
          />
        </div>
      </AppForm>
    </div>
  );
}
