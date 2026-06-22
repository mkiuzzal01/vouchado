"use client";
import { useState } from "react";
import Container from "../shared/Container";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import TimeInput from "./inputs/TimeInput";
import SubmitButton from "../buttons/SubmitButton";
import Image from "next/image";
import img from "@/public/auth/Rectangle 35.png";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BusinessProfileSetupForm() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = (formData: any) => {
    const payload = {
      ...formData,
      workingDays: selectedDays,
    };
    console.log("Submitting Business Profile:", payload);
  };

  return (
    <Container className="py-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full  bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
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
                      <FileInput name="logo" label="Upload Logo" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <FileInput
                        name="coverPhotoUrl"
                        label="Upload cover image"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Working Days Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Working Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = selectedDays.includes(day);
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
                </div>

                {/* Opening Hours Grid */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Opening Hours
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <TimeInput name="openingTime" label="00 : 00" />
                    <TimeInput name="closingTime" label="00 : 00" />
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="pt-4">
                  <SubmitButton
                    isLoading={false}
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
