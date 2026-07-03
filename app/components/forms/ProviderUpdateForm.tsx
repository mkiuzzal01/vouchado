"use client";

import { FieldValues } from "react-hook-form";
import AppForm from "./AppForm";
import FileInput from "./inputs/FileInput";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextArea from "./inputs/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import { Building2, User, Mail, Phone, Globe, MapPin } from "lucide-react";

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
}

export default function ProviderUpdateForm({ setIsOpen }: Props) {
  const handleUpdate = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="w-full bg-transparent">
      <AppForm onSubmit={handleUpdate}>
        <div className="flex flex-col gap-6">
          {/* Top Row: File Uploads Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileInput name="logo" />
            <FileInput name="cover_image" />
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
                  <div className="w-40">
                    {" "}
                    <SelectInput
                      name={`hours_${day.toLowerCase()}`}
                      options={[
                        { value: "09:00-18:00", label: "09:00 - 18:00" },
                        { value: "09:00-20:00", label: "09:00 - 20:00" },
                        { value: "10:00-17:00", label: "10:00 - 17:00" },
                      ]}
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
              name="website"
              label="Website (optional)"
              placeholder="example.com"
              icon={<Globe size={16} />}
            />

            <SelectInput
              name="category"
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
              name="description"
              label="Business Description"
              placeholder="Please Describe..."
              rows={4}
            />

            <TextInput
              name="address"
              label="Address"
              placeholder="Denmark, UK"
              icon={<MapPin size={16} />}
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
              className="rounded-full text-xs font-semibold p-5"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
