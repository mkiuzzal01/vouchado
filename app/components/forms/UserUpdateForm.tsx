import React from "react";
import TextInput from "./inputs/TextInput";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import { Home, Mail, Phone, User, Globe, Building2, X } from "lucide-react";

interface UserUpdateFormProps {
  onClose?: () => void;
}

export default function UserUpdateForm({ onClose }: UserUpdateFormProps) {
    
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <AppForm onSubmit={onSubmit}>
        <div className="space-y-5">
          {/* Centered Profile Avatar Input */}
          <div className="flex justify-center mb-6">
            <FileInput name="avatar" label="" accept="image/*" />
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
                title="Update"
                className="w-full sm:w-auto px-8 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-full transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>
      </AppForm>
    </div>
  );
}
