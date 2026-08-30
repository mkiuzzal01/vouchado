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

// Map of display day names to backend day names (always English)
const DAY_MAP = {
  Sunday: "sunday",
  Monday: "monday",
  Tuesday: "tuesday",
  Wednesday: "wednesday",
  Thursday: "thursday",
  Friday: "friday",
  Saturday: "saturday",
} as const;

export default function BusinessProfileSetupForm({ lang, t }: Props) {
  const router = useRouter();

  // Get translated day names from dictionary
  const translatedDays = useMemo(
    () => [
      t?.auth?.business_profile_setup?.days?.Sunday || "Sunday",
      t?.auth?.business_profile_setup?.days?.Monday || "Monday",
      t?.auth?.business_profile_setup?.days?.Tuesday || "Tuesday",
      t?.auth?.business_profile_setup?.days?.Wednesday || "Wednesday",
      t?.auth?.business_profile_setup?.days?.Thursday || "Thursday",
      t?.auth?.business_profile_setup?.days?.Friday || "Friday",
      t?.auth?.business_profile_setup?.days?.Saturday || "Saturday",
    ],
    [t],
  );

  // Store selected day names in a Set
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());

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

  const toggleDay = useCallback((day: string) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  }, []);

  const handleSubmit = async (formData: FieldValues) => {
    const formPayload = new FormData();

    if (selectedDays?.size === 0) {
      toast.error(t?.auth?.business_profile_setup?.no_days_selected);
      return;
    }

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

    // Build hours payload with English day names for backend
    // Use the English day names from DAY_MAP as the source of truth
    const englishDays = Object.keys(DAY_MAP) as (keyof typeof DAY_MAP)[];

    englishDays.forEach((day, index) => {
      const translatedDay = t?.auth?.business_profile_setup?.days?.[day] || day;
      const isSelected = selectedDays.has(translatedDay);
      const backendDayName = DAY_MAP[day];

      const openTime = formData?.hours?.[translatedDay]?.openingTime || "09:00";
      const closeTime =
        formData?.hours?.[translatedDay]?.closingTime || "17:00";

      formPayload.append(`business_hours[${index}][day]`, backendDayName);
      formPayload.append(`business_hours[${index}][open_time]`, openTime);
      formPayload.append(`business_hours[${index}][close_time]`, closeTime);
      formPayload.append(
        `business_hours[${index}][is_closed]`,
        isSelected ? "0" : "1",
      );
    });

    try {
      console.log(formPayload);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* LEFT SIDE IMAGE */}
          <div className="hidden lg:flex items-center justify-center bg-slate-50 relative min-h-[600px] h-full">
            <Image
              src={img}
              alt="Business assets promo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
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
                    {translatedDays.map((day) => {
                      const isSelected = selectedDays.has(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-medium border transition-colors duration-150 ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-gray-50/50 hover:bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {day}
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
                        {translatedDays
                          .filter((day) => selectedDays.has(day))
                          .map((day) => (
                            <div
                              key={day}
                              className="p-3 bg-white border border-slate-200/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                            >
                              <span className="text-sm font-semibold text-slate-700 min-w-[90px]">
                                {day}
                              </span>
                              <div className="grid grid-cols-2 gap-3 flex-1">
                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                    {t?.auth?.business_profile_setup?.open}
                                  </span>
                                  <TimeInput
                                    required
                                    isCurrentDateValidation={false}
                                    name={`hours.${day}.openingTime`}
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
                                    name={`hours.${day}.closingTime`}
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
