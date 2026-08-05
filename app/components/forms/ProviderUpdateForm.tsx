"use client";

import { FieldValues, useFormContext } from "react-hook-form";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextArea from "./inputs/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import { Building2, User, Mail, Phone, Globe } from "lucide-react";
import AddressInput from "./inputs/AddressInput";
import { useState, useEffect } from "react";
import TimeInput from "./inputs/TimeInput";
import { useUpdateProviderProfileMutation } from "@/redux/features/provider/provider.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PhoneInput from "./inputs/PhoneInput";

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

// Inner helper component to consume the form context and watch the Sunday field reactively
function SundayHoursSection() {
  const { watch, register } = useFormContext();
  const hoursSunday = watch("hours_sunday", "closed");

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl gap-3 transition-all">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Sunday</span>
        <select
          {...register("hours_sunday")}
          className={`text-xs font-medium rounded-xl px-2.5 py-1 focus:outline-none border ${
            hoursSunday === "closed"
              ? "bg-red-50 border-red-100 text-red-500"
              : "bg-emerald-50 border-emerald-100 text-emerald-600"
          }`}
        >
          <option value="closed">Closed</option>
          <option value="open">Open</option>
        </select>
      </div>

      {/* Conditionally reveal time selection inputs when Sunday is marked open */}
      {hoursSunday === "open" && (
        <div className="flex justify-between items-center gap-2 animate-fadeIn">
          <TimeInput
            isCurrentDateValidation={false}
            name="open_time_sunday"
            placeholder="09:00"
          />
          <span className="text-gray-400">-</span>
          <TimeInput
            isCurrentDateValidation={false}
            name="close_time_sunday"
            placeholder="18:00"
          />
        </div>
      )}
    </div>
  );
}

export default function ProviderUpdateForm({ setIsOpen, profileInfo }: Props) {
  const router = useRouter();
  const data = profileInfo?.data || profileInfo;

  const [address, setAddress] = useState(data?.business_address || "");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(
    data?.latitude && data?.longitude
      ? { lat: Number(data.latitude), lng: Number(data.longitude) }
      : null,
  );

  useEffect(() => {
    if (data) {
      if (data.business_address) setAddress(data.business_address);
      if (data.latitude && data.longitude) {
        setCoordinates({
          lat: Number(data.latitude),
          lng: Number(data.longitude),
        });
      }
    }
  }, [data]);

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

  const formDefaultValues: Record<string, any> = {
    business_name: data?.business_name || "",
    full_name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    business_website: data?.business_website || "",
    business_category: data?.business_category || "",
    business_description: data?.business_description || "",
    business_address: data?.business_address || "",
    business_logo: data?.business_logo_full_url || "",
    business_cover_image: data?.business_cover_image_full_url || "",
    hours_sunday: "closed",
    open_time_sunday: "09:00",
    close_time_sunday: "17:00",
  };

  if (Array.isArray(data?.business_hours)) {
    data.business_hours.forEach((item: any) => {
      const targetDay = item?.day?.toLowerCase();
      if (targetDay === "sunday") {
        formDefaultValues["hours_sunday"] = item?.is_closed ? "closed" : "open";
        if (!item?.is_closed) {
          formDefaultValues["open_time_sunday"] = item?.open_time || "09:00";
          formDefaultValues["close_time_sunday"] = item?.close_time || "17:00";
        }
      } else {
        formDefaultValues[`open_time_${targetDay}`] =
          item?.open_time || "09:00";
        formDefaultValues[`close_time_${targetDay}`] =
          item?.close_time || "17:00";
      }
    });
  }

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

    if (formData?.business_logo) {
      const logoFile =
        formData.business_logo instanceof FileList
          ? formData.business_logo[0]
          : formData.business_logo;
      if (logoFile instanceof File) {
        formPayload.append("business_logo", logoFile);
      }
    }

    if (formData?.business_cover_image) {
      const coverFile =
        formData.business_cover_image instanceof FileList
          ? formData.business_cover_image[0]
          : formData.business_cover_image;
      if (coverFile instanceof File) {
        formPayload.append("business_cover_image", coverFile);
      }
    }

    // Append Monday through Saturday
    DAYS_OF_WEEK.forEach((day, index) => {
      const backendDayName = day.toLowerCase();
      const openTime = formData[`open_time_${backendDayName}`] || "09:00";
      const closeTime = formData[`close_time_${backendDayName}`] || "17:00";

      formPayload.append(`business_hours[${index}][day]`, backendDayName);
      formPayload.append(`business_hours[${index}][open_time]`, openTime);
      formPayload.append(`business_hours[${index}][close_time]`, closeTime);
      formPayload.append(`business_hours[${index}][is_closed]`, "0");
    });

    // Dynamic Sunday Logic Strategy
    const sundayStatus = formData.hours_sunday || "closed";
    const isSundayClosed = sundayStatus === "closed";

    formPayload.append(`business_hours[6][day]`, "sunday");
    formPayload.append(
      `business_hours[6][open_time]`,
      isSundayClosed ? "00:00" : formData.open_time_sunday || "09:00",
    );
    formPayload.append(
      `business_hours[6][close_time]`,
      isSundayClosed ? "00:00" : formData.close_time_sunday || "17:00",
    );
    formPayload.append(
      `business_hours[6][is_closed]`,
      isSundayClosed ? "1" : "0",
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
      <AppForm onSubmit={handleUpdate} defaultValues={formDefaultValues}>
        <div className="flex flex-col gap-6">
          {/* File Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileInput
              imageFeatures={true}
              defaultImage={data?.business_logo_full_url}
              label="Business Logo"
              name="business_logo"
            />
            <FileInput
              imageFeatures={true}
              defaultImage={data?.business_cover_image_full_url}
              label="Cover Image"
              name="business_cover_image"
            />
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
                      isCurrentDateValidation={false}
                      name={`open_time_${day.toLowerCase()}`}
                      placeholder="09:00"
                    />
                    <span>-</span>
                    <TimeInput
                      isCurrentDateValidation={false}
                      name={`close_time_${day.toLowerCase()}`}
                      placeholder="18:00"
                    />
                  </div>
                </div>
              ))}

              {/* Reactive Sub-component */}
              <SundayHoursSection />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Form Fields */}
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

            <PhoneInput
              name="phone"
              label="Phone Number"
              placeholder="12134564598"
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
                { value: "beauty-wellness", label: "Beauty & Wellness" },
                { value: "grocery", label: "Grocery" },
                { value: "pet", label: "Pet" },
              ]}
            />
          </div>

          {/* Descriptions */}
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

          {/* Actions */}
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
