"use client";

import { FieldValues } from "react-hook-form";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextArea from "./inputs/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import { Building2, User, Mail, Phone, Globe } from "lucide-react";
import AddressInput from "./inputs/AddressInput";
import { useState } from "react";
import TimeInput from "./inputs/TimeInput";
import { useUpdateProviderProfileMutation } from "@/redux/features/provider/provider.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Props {
  setIsOpen: (value: boolean) => void;
  profileInfo: any;
}

export default function ProviderUpdateForm({ setIsOpen, profileInfo }: Props) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [updateProviderProfile, { isLoading }] =
    useUpdateProviderProfileMutation();

  const handleAddressChange = (
    value: string,
    coords?: { lat: number; lng: number },
  ) => {
    setAddress(value);
    if (coords) {
      setCoordinates(coords);
    }
  };

  const handleUpdate = async (formData: FieldValues) => {
    const formPayload = new FormData();
    formPayload.append("phone", formData.phone || "");
    formPayload.append("latitude", coordinates?.lat.toString() || "");
    formPayload.append("longitude", coordinates?.lng.toString() || "");
    formPayload.append("business_name", formData.business_name || "");
    formPayload.append("business_email", formData.email || "");
    formPayload.append("business_category", formData.business_category || "");
    formPayload.append("business_address", address || "");
    formPayload.append("full_name", formData.full_name || "");
    formPayload.append(
      "business_description",
      formData.business_description || "",
    );
    if (formData.business_website) {
      formPayload.append("business_website", formData.business_website);
    }

    // For Business Logo
    if (formData?.business_logo) {
      const logoFile =
        formData.business_logo instanceof FileList
          ? formData.business_logo[0]
          : formData.business_logo;
      if (logoFile) formPayload.append("business_logo", logoFile);
    }

    // For Cover Image
    if (formData?.business_cover_image) {
      const coverFile =
        formData.business_cover_image instanceof FileList
          ? formData.business_cover_image[0]
          : formData.business_cover_image;
      if (coverFile) formPayload.append("business_cover_image", coverFile);
    }

    // Process Monday to Saturday business hours
    DAYS_OF_WEEK.forEach((day, index) => {
      const backendDayName = day.toLowerCase();

      // Match the names given to the TimeInput elements exactly
      const openTime = formData[`open_time_${backendDayName}`] || "09:00";
      const closeTime = formData[`close_time_${backendDayName}`] || "17:00";

      formPayload.append(`business_hours[${index}][day]`, backendDayName);
      formPayload.append(`business_hours[${index}][open_time]`, openTime);
      formPayload.append(`business_hours[${index}][close_time]`, closeTime);
      formPayload.append(`business_hours[${index}][is_closed]`, "0");
    });

    // Handle Sunday edge case
    const sundayStatus = formData.hours_sunday || "closed";
    formPayload.append(`business_hours[6][day]`, "sunday");
    formPayload.append(`business_hours[6][open_time]`, "00:00");
    formPayload.append(`business_hours[6][close_time]`, "00:00");
    formPayload.append(
      `business_hours[6][is_closed]`,
      sundayStatus === "closed" ? "1" : "0",
    );

    try {
      const res = await updateProviderProfile(formPayload).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        setIsOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="w-full bg-transparent">
      <AppForm onSubmit={handleUpdate}>
        <div className="flex flex-col gap-6">
          {/* Top Row: File Uploads Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileInput label="Business Logo" name="business_logo" />
            <FileInput label="Cover Image" name="business_cover_image" />
          </div>

          <hr className="border-gray-100" />

          {/* Opening Hours Schedule Section */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Opening Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-2xl"
                >
                  <span className="text-sm font-semibold text-gray-700">
                    {day}
                  </span>
                  <div className="flex justify-between items-center gap-2">
                    <TimeInput
                      name={`open_time_${day.toLowerCase()}`}
                      placeholder="09:00"
                    />
                    <span>-</span>
                    <TimeInput
                      name={`close_time_${day.toLowerCase()}`}
                      placeholder="18:00"
                    />
                  </div>
                </div>
              ))}
              {/* Sunday Special State Case */}
              <div className="col-span-2 flex items-center justify-between bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl">
                <span className="text-sm font-semibold text-gray-700">
                  Sunday
                </span>
                <select
                  name="hours_sunday"
                  className="text-xs bg-red-50 border border-red-100 text-red-500 font-medium rounded-xl px-2.5 py-1 focus:outline-none"
                >
                  <option value="closed">Closed</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Text Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              name="business_name"
              label="Business Name"
              placeholder="Akij Group"
              icon={<Building2 size={16} />}
            />
            <TextInput
              name="full_name"
              label="Full name"
              placeholder="Johnathan Smith"
              icon={<User size={16} />}
            />
            <TextInput
              name="email"
              label="Email address"
              placeholder="johncarter@brix.com"
              icon={<Mail size={16} />}
            />
            <TextInput
              name="phone"
              label="Phone Number"
              placeholder="12134564598"
              icon={<Phone size={16} />}
            />
            <TextInput
              name="business_website"
              label="Website (optional)"
              placeholder="example.com"
              icon={<Globe size={16} />}
            />

            <SelectInput
              name="business_category"
              label="Business Category"
              options={[
                { value: "cloth", label: "Cloth" },
                { value: "beauty", label: "Beauty" },
                { value: "grocery", label: "Grocery" },
                { value: "pet", label: "Pet" },
              ]}
            />
          </div>

          {/* Description & Address */}
          <div className="flex flex-col gap-4">
            <TextArea
              name="business_description"
              label="Business Description"
              placeholder="Please Describe..."
              rows={4}
            />

            <AddressInput
              placeholder="Write full address"
              onChange={handleAddressChange}
              value={address}
            />
          </div>

          {/* Actions Footer */}
          <div className="flex justify-end items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <SubmitButton
              title="Update"
              isLoading={isLoading}
              className="rounded-full text-xs font-semibold p-5"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
