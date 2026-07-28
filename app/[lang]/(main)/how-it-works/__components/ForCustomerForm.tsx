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

export default function ForCustomerForm({ lang }: { lang: string }) {
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
          Customer Information
        </h2>
        <p className="text-sm sm:text-base text-[#637381] font-normal mt-1 leading-relaxed">
          Create your customer account to start exploring local deals.
        </p>
      </div>

      <AppForm onSubmit={handleSubmit}>
        <div className="space-y-6 select-none">
          {/* Responsive Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <TextInput
              disabled
              label="Full Name"
              name="fullName"
              placeholder="Enter your name"
            />

            <TextInput
              disabled
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
            />

            <div className="md:col-span-2">
              <TextInput
                disabled
                label="Email Address"
                type="email"
                name="emailAddress"
                placeholder="Enter your email"
              />
            </div>

            <TextInput
              disabled
              label="Your Address"
              type="text"
              name="address"
              placeholder="Enter your address"
            />

            <TextInput
              disabled
              label="City"
              type="text"
              name="city"
              placeholder="Enter your city"
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
              I agree to Tech Takes{" "}
              <Link
                href={`/${lang}/terms`}
                className="underline text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href={`/${lang}/privacy`}
                className="underline text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Privacy Policy
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
            Already have an account?
            <Link
              href={`/${lang}/login`}
              className="text-[#29b6be] font-bold ml-1.5 hover:underline transition-all"
            >
              Log in
            </Link>
          </p>
        </div>
      </AppForm>
    </div>
  );
}
