"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  lang: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ForBusinessForm({ lang, t }: Props) {
  const router = useRouter();

  const handleSubmit = (value: FieldValues) => {
    router.push(`/${lang}/provider-registration`);
  };

  return (
    <div className="w-full space-y-2 lg:space-y-6 ">
      {/* Section Header */}
      <div className="select-none">
        <h2 className=" text-2xl lg:text-[32px] font-bold text-gray-900 tracking-tight">
          {t?.for_business?.for_business_section_right?.title}
        </h2>
        <p className="text-[#637381] font-normal mt-0.5">
          {t?.for_business?.for_business_section_right.description}
        </p>
      </div>

      {/* Form Context Shell */}
      <AppForm onSubmit={handleSubmit}>
        <div className="space-y-6 select-none">
          {/* Input Grid Structure matching image_42eaf7.png */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <TextInput
              disabled
              label={t?.for_business?.for_business_section_right?.business_name}
              name="businessName"
              placeholder={
                t?.for_business?.for_business_section_right
                  ?.business_name_placeholder
              }
            />

            <TextInput
              disabled
              label={
                t?.for_business?.for_business_section_right?.contact_person
              }
              name="contactPerson"
              placeholder={
                t?.for_business?.for_business_section_right
                  ?.contact_person_placeholder
              }
            />

            <TextInput
              disabled
              label={t?.for_business?.for_business_section_right?.email}
              type="email"
              name="emailAddress"
              placeholder={
                t?.for_business?.for_business_section_right?.email_placeholder
              }
            />

            <TextInput
              disabled
              label={t?.for_business?.for_business_section_right?.phone_number}
              type="tel"
              name="phoneNumber"
              placeholder={
                t?.for_business?.for_business_section_right
                  ?.phone_number_placeholder
              }
            />
            <TextInput
              disabled
              label={
                t?.for_business?.for_business_section_right?.business_category
              }
              type="text"
              name="category"
              placeholder={
                t?.for_business?.for_business_section_right
                  ?.business_category_placeholder
              }
            />

            <TextInput
              disabled
              label={t?.for_business?.for_business_section_right?.city}
              name="city"
              placeholder={
                t?.for_business?.for_business_section_right?.city_placeholder
              }
            />
          </div>

          <SubmitButton
            title={t?.for_business?.for_business_section_right?.submit_button}
            className="w-full rounded-full h-12  font-semibold"
          />
        </div>
        <div className="mt-4">
          <p className="text-[#637381] text-xs lg:text-base font-semibold text-center">
            {t?.for_business?.for_business_section_right?.login_prompt}
            <Link
              href={`/${lang}/provider-login`}
              className="text-[#29b6be] font-bold ml-1 hover:underline"
            >
              {t?.for_business?.for_business_section_right?.login_link}
            </Link>
          </p>
        </div>
      </AppForm>
    </div>
  );
}
