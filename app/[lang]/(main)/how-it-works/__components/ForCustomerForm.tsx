"use client";
import AppForm from "@/app/components/forms/AppForm";
import TextInput from "@/app/components/forms/inputs/TextInput";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "react-toastify";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  lang: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ForCustomerForm({ lang, t }: Props) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = (values: FieldValues) => {
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    router.push(`/${lang}/registration`);
  };

  return (
    <div className="w-full p-6 lg:p-4 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="select-none text-left">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
          {t.how_it_work?.for_customer_form?.title}
        </h2>
        <p className="text-sm sm:text-base text-[#637381] font-normal mt-1 leading-relaxed">
          {t.how_it_work?.for_customer_form?.description}
        </p>
      </div>

      <AppForm onSubmit={handleSubmit}>
        <div className="space-y-6 select-none">
          {/* Responsive Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <TextInput
              disabled
              label={t.how_it_work?.for_customer_form?.full_name}
              name="fullName"
              placeholder={
                t.how_it_work?.for_customer_form?.full_name_placeholder
              }
            />

            <TextInput
              disabled
              label={t.how_it_work?.for_customer_form?.phone_number}
              name="phoneNumber"
              placeholder={
                t.how_it_work?.for_customer_form?.phone_number_placeholder
              }
            />

            <div className="md:col-span-2">
              <TextInput
                disabled
                label={t.how_it_work?.for_customer_form?.email}
                type="email"
                name="emailAddress"
                placeholder={
                  t.how_it_work?.for_customer_form?.email_placeholder
                }
              />
            </div>

            <TextInput
              disabled
              label={t.how_it_work?.for_customer_form?.your_address}
              type="text"
              name="address"
              placeholder={
                t.how_it_work?.for_customer_form?.your_address_placeholder
              }
            />

            <TextInput
              disabled
              label={t.how_it_work?.for_customer_form?.city}
              type="text"
              name="city"
              placeholder={t.how_it_work?.for_customer_form?.city_placeholder}
            />
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start gap-3 py-1">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
              className="mt-0.5 shrink-0"
            />
            <label
              className="text-xs sm:text-sm text-gray-700 leading-snug cursor-pointer select-none"
              htmlFor="terms"
            >
              {t.auth.register.agree_terms}{" "}
              <Link
                href={`/${lang}/terms`}
                className="underline text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                {t.auth.register.terms_of_service}
              </Link>{" "}
              {t.auth.register.and}{" "}
              <Link
                href={`/${lang}/privacy`}
                className="underline text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                {t.auth.register.privacy_policy}
              </Link>
              .
            </label>
          </div>

          {/* Submit Action */}
          <SubmitButton
            disabled={!agreedToTerms}
            title="Register Now - It's Free"
            className="w-full rounded-full h-11 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-200"
          />
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <p className="text-[#637381] text-xs sm:text-sm font-medium">
            {t.auth.register.already_account}{" "}
            <Link
              href={`/${lang}/login`}
              className="text-[#29b6be] font-bold ml-1.5 hover:underline transition-all"
            >
              {t.auth.register.login}
            </Link>
          </p>
        </div>
      </AppForm>
    </div>
  );
}
