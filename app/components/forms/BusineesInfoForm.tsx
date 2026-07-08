"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import SubmitButton from "../buttons/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  lang: string;
}

export default function BusineesInfoForm({ lang }: Props) {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    router.push(`/${lang}/provider-registration`);
  };

  return (
    <div className="w-full space-y-2 lg:space-y-6">
      {/* Section Header */}
      <div>
        <h2 className=" text-2xl lg:text-[32px] font-bold text-gray-900 tracking-tight">
          Business Settings
        </h2>
        <p className="text-[#637381] font-normal mt-0.5">
          Please set up your business information
        </p>
      </div>

      {/* Form Context Shell */}
      <AppForm onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Input Grid Structure matching image_42eaf7.png */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <TextInput
              label="Business Name"
              name="businessName"
              placeholder="Enter your business name"
            />

            <TextInput
              label="Contact Person"
              name="contactPerson"
              placeholder="Enter your name"
            />

            <TextInput
              label="Email Address"
              type="email"
              name="emailAddress"
              placeholder="Enter your email"
            />

            <TextInput
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="XXXXXXXXXX"
            />

            <SelectInput
              label="Business Category"
              name="businessCategory"
              options={[
                {
                  label: "Select a category",
                  value: "",
                },
                {
                  label: "Beauty & Wellness",
                  value: "beauty-wellness",
                },
                {
                  label: "Food & Beverage",
                  value: "food-beverage",
                },
              ]}
            />

            <TextInput
              label="City"
              name="city"
              placeholder="Enter your city name"
            />
          </div>

          <SubmitButton
            title="Register Now - It's Free"
            className="w-full rounded-full h-12  font-semibold"
          />
        </div>
        <div className="mt-4">
          <p className="text-[#637381] text-sm lg:text-base font-semibold text-center">
            Already have an account yet?
            <Link
              href={`/${lang}/provider-login`}
              className="text-[#29b6be] font-bold ml-1 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </AppForm>
    </div>
  );
}
