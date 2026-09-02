"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

import Container from "../shared/Container";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import TimeInput from "./inputs/TimeInput";
import SubmitButton from "../buttons/SubmitButton";
import img from "@/public/auth/Rectangle 35.png";

import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useUpdateProviderProfileMutation } from "@/redux/features/provider/provider.api";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  lang: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

// Helper to safely extract File objects
const getFile = (val: unknown): File | null => {
  if (val instanceof FileList) return val[0] || null;
  if (val instanceof File) return val;
  return null;
};

// Stable English keys mapped to backend enum values
const DAYS_CONFIG = [
  { key: "Sunday", backendName: "sunday" },
  { key: "Monday", backendName: "monday" },
  { key: "Tuesday", backendName: "tuesday" },
  { key: "Wednesday", backendName: "wednesday" },
  { key: "Thursday", backendName: "thursday" },
  { key: "Friday", backendName: "friday" },
  { key: "Saturday", backendName: "saturday" },
] as const;

type DayKey = (typeof DAYS_CONFIG)[number]["key"];

export default function BusinessProfileSetupForm({ lang, t }: Props) {
  const router = useRouter();

  // Map stable keys to dictionary translations
  const daysList = useMemo(
    () =>
      DAYS_CONFIG.map((day) => ({
        ...day,
        label: t?.auth?.business_profile_setup?.days?.[day.key] || day.key,
      })),
    [t],
  );

  // Store stable English keys (e.g., "Sunday") instead of localized text
  const [selectedDays, setSelectedDays] = useState<Set<DayKey>>(new Set());

  const {
    business_name,
    business_category,
    phone,
    latitude,
    longitude,
    business_email,
    business_address,
  } = useAppSelector((state) => state?.business || {});

  const [updateProviderProfile, { isLoading }] =
    useUpdateProviderProfileMutation();

  const toggleDay = useCallback((dayKey: DayKey) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayKey)) {
        next.delete(dayKey);
      } else {
        next.add(dayKey);
      }
      return next;
    });
  }, []);

  const handleSubmit = async (formData: FieldValues) => {
    if (selectedDays.size === 0) {
      toast.error(
        t?.auth?.business_profile_setup?.no_days_selected ||
          "Please select at least one working day",
      );
      return;
    }

    const formPayload = new FormData();

    formPayload.append("phone", phone || "");
    formPayload.append("latitude", String(latitude ?? ""));
    formPayload.append("longitude", String(longitude ?? ""));
    formPayload.append("business_name", business_name || "");
    formPayload.append("business_email", business_email || "");
    formPayload.append("business_category", business_category || "");
    formPayload.append("business_address", business_address || "");

    // Process files
    const logoFile = getFile(formData?.business_logo);
    if (logoFile) formPayload.append("business_logo", logoFile);

    const coverFile = getFile(formData?.business_cover_image);
    if (coverFile) formPayload.append("business_cover_image", coverFile);

    // Build hours payload using stable keys
    daysList.forEach((dayItem, index) => {
      const isSelected = selectedDays.has(dayItem.key);
      const dayHours = formData?.hours?.[dayItem.key];

      const openTime = dayHours?.openingTime || "09:00";
      const closeTime = dayHours?.closingTime || "17:00";

      formPayload.append(`business_hours[${index}][day]`, dayItem.backendName);
      formPayload.append(`business_hours[${index}][open_time]`, openTime);
      formPayload.append(`business_hours[${index}][close_time]`, closeTime);
      formPayload.append(
        `business_hours[${index}][is_closed]`,
        isSelected ? "0" : "1",
      );
    });

    try {
      const res = await updateProviderProfile(formPayload).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        router.push(`/${lang}/provider-login`);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update business profile");
    }
  };

  return (
    <Container className="py-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* LEFT SIDE IMAGE */}
          <div className="w-full lg:w-[60%] min-h-[300px] lg:min-h-full bg-slate-50 relative">
            <Image
              src={img}
              alt="Business assets promo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full lg:w-[40%] p-6 md:p-10 flex flex-col justify-center">
            <div className="flex justify-center items-center flex-col gap-1 mb-8 text-center">
              <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-slate-900">
                {t?.auth?.business_profile_setup?.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                {t?.auth?.business_profile_setup?.subtitle}
              </p>
            </div>

            <AppForm onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* File Uploads Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <FileInput
                      t={t}
                      name="business_logo"
                      label={t?.auth?.business_profile_setup?.upload_logo}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <FileInput
                      t={t}
                      name="business_cover_image"
                      label={t?.auth?.business_profile_setup?.upload_cover}
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Working Days Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {t?.auth?.business_profile_setup?.working_days_hours}
                  </label>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {daysList.map(({ key, label }) => {
                      const isSelected = selectedDays.has(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleDay(key)}
                          className={`px-2 py-1 rounded-xl text-xs md:text-sm font-medium border transition-colors duration-150 ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-gray-50/50 hover:bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Fixed-height scrollable time panel */}
                  <div className="h-[220px] overflow-y-auto pr-1 border border-slate-100 rounded-xl p-2 bg-slate-50/50 custom-scrollbar">
                    {selectedDays.size === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-xs text-slate-400 italic text-center">
                          {t?.auth?.business_profile_setup?.no_days_selected}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {daysList
                          .filter(({ key }) => selectedDays.has(key))
                          .map(({ key, label }) => (
                            <div
                              key={key}
                              className="p-3 bg-white border border-slate-200/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                            >
                              <span className="text-sm font-semibold text-slate-700 min-w-[90px]">
                                {label}
                              </span>
                              <div className="grid grid-cols-2 gap-3 flex-1">
                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                    {t?.auth?.business_profile_setup?.open}
                                  </span>
                                  <TimeInput
                                    required
                                    isCurrentDateValidation={false}
                                    name={`hours.${key}.openingTime`}
                                    label="00 : 00"
                                  />
                                </div>
                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                    {t?.auth?.business_profile_setup?.close}
                                  </span>
                                  <TimeInput
                                    required
                                    isCurrentDateValidation={false}
                                    name={`hours.${key}.closingTime`}
                                    label="00 : 00"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <SubmitButton
                    isLoading={isLoading}
                    title={t?.auth?.business_profile_setup?.save_continue}
                    className="h-12 w-full rounded-full text-white bg-primary hover:bg-[#0f7275] transition-colors font-medium text-sm"
                  />
                </div>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </Container>
  );
}
