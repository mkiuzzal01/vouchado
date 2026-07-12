import TextInput from "./inputs/TextInput";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import { Home, Mail, Phone, User, Globe, Building2, X } from "lucide-react";
import { IUserProfile } from "@/redux/types/user_profile";
import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";
import { toast } from "react-toastify";

interface UserUpdateFormProps {
  onClose?: () => void;
  userProfile?: IUserProfile;
}

export default function UserUpdateForm({
  onClose,
  userProfile,
}: UserUpdateFormProps) {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const defaultValues = {
    fullName: userProfile?.name,
    number: userProfile?.phone,
    email: userProfile?.email,
    fullAddress: userProfile?.address,
    country: userProfile?.country,
    city: userProfile?.city,
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("number", data.number);
    formData.append("email", data.email);
    formData.append("fullAddress", data.fullAddress);
    formData.append("country", data.country);
    formData.append("city", data.city);

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    try {
      const res = await updateUserProfile(formData).unwrap();
      toast.success(res.message);
      onClose?.();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <AppForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="space-y-5">
          {/* Centered Profile Avatar Input */}
          <div className="flex justify-center mb-6">
            <FileInput
              defaultImage={userProfile?.avatar_full_url ?? ""}
              name="avatar"
              label="Upload your photo"
              accept="image/*"
            />
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
            {/* Full Name spans across both columns */}
            <div className="sm:col-span-2">
              <TextInput
                icon={<User size={16} className="text-gray-400" />}
                name="fullName"
                label="Full name"
                placeholder="Johnathan Smith"
              />
            </div>

            {/* Row 2: Number & Email Address */}
            <div>
              <TextInput
                icon={<Phone size={16} className="text-gray-400" />}
                name="number"
                label="Number"
                placeholder="1234567892"
              />
            </div>
            <div>
              <TextInput
                icon={<Mail size={16} className="text-gray-400" />}
                name="email"
                label="Email address"
                placeholder="johncarter@brix.com"
              />
            </div>

            {/* Full Address spans across both columns */}
            <div className="sm:col-span-2">
              <TextInput
                icon={<Home size={16} className="text-gray-400" />}
                name="fullAddress"
                label="Full Address"
                placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
              />
            </div>

            {/* Row 4: Country & City */}
            <div>
              <TextInput
                icon={<Globe size={16} className="text-gray-400" />}
                name="country"
                label="Country"
                placeholder="America"
              />
            </div>
            <div>
              <TextInput
                icon={<Building2 size={16} className="text-gray-400" />}
                name="city"
                label="City"
                placeholder="Austin"
              />
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
            <div className="w-full sm:w-auto">
              <SubmitButton
                isLoading={isLoading}
                title="Update"
                className="w-full h-10 sm:w-auto px-8 py-2.5 bg-[#31BFC8] hover:bg-[#31BF96]/90 text-white font-bold text-xs rounded-full transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>
      </AppForm>
    </div>
  );
}
