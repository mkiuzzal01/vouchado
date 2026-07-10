"use client";
import { useState } from "react";
import Container from "../shared/Container";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import TimeInput from "./inputs/TimeInput";
import SubmitButton from "../buttons/SubmitButton";
import Image from "next/image";
import img from "@/public/auth/Rectangle 35.png";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useUpdateProviderProfileMutation } from "@/redux/features/provider/provider.api";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface DaySchedule {
  day: string;
  open_time: string;
  close_time: string;
}

interface Props {
  lang: string;
}

export default function BusinessProfileSetupForm({ lang }: Props) {
  const router = useRouter();
  const [workingHours, setWorkingHours] = useState<
    Record<string, Omit<DaySchedule, "day">>
  >({});
  const {
    business_name,
    business_category,
    phone,
    latitude,
    longitude,
    business_email,
    business_address,
  } = useAppSelector((state) => state?.business);

  const [updateProviderProfile, { isLoading }] =
    useUpdateProviderProfileMutation();

  const toggleDay = (day: string) => {
    setWorkingHours((prev) => {
      const updated = { ...prev };
      if (day in updated) {
        delete updated[day];
      } else {
        updated[day] = { open_time: "09:00", close_time: "17:00" };
      }
      return updated;
    });
  };

  const handleSubmit = async (formData: FieldValues) => {
    const formPayload = new FormData();
    formPayload.append("phone", phone || "");
    formPayload.append("latitude", String(latitude));
    formPayload.append("longitude", String(longitude));
    formPayload.append("business_name", business_name || "");
    formPayload.append("business_email", business_email || "");
    formPayload.append("business_category", business_category || "");
    formPayload.append("business_address", business_address || "");

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

    DAYS_OF_WEEK.forEach((day, index) => {
      const isSelected = day in workingHours;
      const backendDayName = day.toLowerCase();

      const openTime =
        formData?.hours?.[day]?.openingTime ||
        workingHours[day]?.open_time ||
        "09:00";
      const closeTime =
        formData?.hours?.[day]?.closingTime ||
        workingHours[day]?.close_time ||
        "17:00";

      const isClosedValue = isSelected ? "0" : "1";
      formPayload.append(`business_hours[${index}][day]`, backendDayName);
      formPayload.append(`business_hours[${index}][open_time]`, openTime);
      formPayload.append(`business_hours[${index}][close_time]`, closeTime);
      formPayload.append(`business_hours[${index}][is_closed]`, isClosedValue);
    });

    try {
      const res = await updateProviderProfile(formPayload).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        router.push(`/${lang}/provider-login`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="py-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* ================= LEFT IMAGE ================= */}
          <div className="hidden lg:flex items-center justify-center bg-slate-50 relative min-h-[600px] h-full">
            <Image
              src={img}
              alt="Business assets promo"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            {/* HEADER */}
            <div className="flex justify-center items-center flex-col gap-1 mb-8 text-center">
              <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-slate-900">
                Upload Assets
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                Please set up your business information
              </p>
            </div>

            {/* FORM */}
            <AppForm onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* File Uploads Grid */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <FileInput name="business_logo" label="Upload Logo" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <FileInput
                        name="business_cover_image"
                        label="Upload cover image"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Working Days Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Working Days & Hours
                  </label>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = day in workingHours;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition-all duration-150 ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-gray-50/50 hover:bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Time Grid inputs per selected day */}
                  <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {DAYS_OF_WEEK.filter((day) => day in workingHours).map(
                      (day) => (
                        <div
                          key={day}
                          className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn"
                        >
                          <span className="text-sm font-semibold text-slate-700 min-w-[90px]">
                            {day}
                          </span>
                          <div className="grid grid-cols-2 gap-3 flex-1">
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                Open
                              </span>
                              <TimeInput
                                name={`hours.${day}.openingTime`}
                                label="00 : 00"
                              />
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                Close
                              </span>
                              <TimeInput
                                name={`hours.${day}.closingTime`}
                                label="00 : 00"
                              />
                            </div>
                          </div>
                        </div>
                      ),
                    )}

                    {Object.keys(workingHours).length === 0 && (
                      <p className="text-xs text-center text-slate-400 py-4 italic">
                        Select operating days above to calibrate custom daily
                        shifts.
                      </p>
                    )}
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="pt-4">
                  <SubmitButton
                    isLoading={isLoading}
                    title="Save & Continue"
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
