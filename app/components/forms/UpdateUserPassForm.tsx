"use client";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";

export default function UpdateUserPassForm() {
  const submit = () => {};
  return (
    <div>
      <AppForm onSubmit={submit}>
        <div>
          <TextInput
            name="currentPassword"
            label="Current Password"
            placeholder="Enter current password"
          />
          <TextInput
            name="newPassword"
            label="New Password"
            placeholder="Enter new password"
          />
          <TextInput
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Enter new password"
          />
          <SubmitButton title="Update Password" />
        </div>
      </AppForm>
    </div>
  );
}
