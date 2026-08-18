"use client";

import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import SubmitButton from "../buttons/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddressInput from "./inputs/AddressInput";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { setBusinessForm } from "@/redux/features/provider/business_profile.slice";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "@/redux/features/deal/deal.api";
import { getDictionary } from "@/app/[lang]/dictionaries";
import PhoneInput from "./inputs/PhoneInput";

interface Props {
  lang: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function BusineesInfoForm({ lang, t }: Props) {
  const router = useRouter();
  const { data } = useGetCategoriesQuery(null);
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleAddressChange = (
    value: string,
    coords?: { lat: number; lng: number },
  ) => {
    setAddress(value);
    if (coords) {
      setCoordinates(coords);
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    if (!address) {
      toast.error(t?.auth?.business_info_form?.address_required);
      return;
    }
    dispatch(
      setBusinessForm({
        business_name: values?.businessName,
        business_email: values?.emailAddress,
        phone: values?.phoneNumber,
        business_category: values?.businessCategory,
        latitude: coordinates?.lat,
        longitude: coordinates?.lng,
        business_address: address,
      }),
    );

    toast.success(t?.auth?.business_info_form?.toast_success);
    setTimeout(() => {
      router.push(`/${lang}/business-profile-setup`);
    }, 1000);
  };

  return (
    <div className="w-full space-y-2 lg:space-y-6">
      {/* Section Header */}
      <div>
        <h2 className=" text-2xl lg:text-[32px] font-bold text-gray-900 tracking-tight">
          {t?.auth?.business_info_form?.title}
        </h2>
        <p className="text-[#637381] font-normal mt-0.5">
          {t?.auth?.business_info_form?.subtitle}
        </p>
      </div>
      <AppForm onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="gap-2">
            <TextInput
              required
              label={t?.auth?.business_info_form?.business_name_label}
              name="businessName"
              placeholder={
                t?.auth?.business_info_form?.business_name_placeholder
              }
            />

            <SelectInput
              required
              label={t?.auth?.business_info_form?.business_category_label}
              name="businessCategory"
              options={
                data?.data?.map((item: any) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
            />

            <PhoneInput
              required
              className="mt-4"
              label={t?.auth?.business_info_form?.phone_number_label}
              name="phoneNumber"
              placeholder={
                t?.auth?.business_info_form?.phone_number_placeholder
              }
            />

            <TextInput
              required
              label={t?.auth?.business_info_form?.email_address_label}
              type="email"
              name="emailAddress"
              placeholder={
                t?.auth?.business_info_form?.email_address_placeholder
              }
            />

            <AddressInput
              placeholder={t?.auth?.business_info_form?.address_placeholder}
              onChange={handleAddressChange}
              value={address}
            />
          </div>

          <SubmitButton
            title={t?.auth?.business_info_form?.submit_button}
            className="w-full rounded-full h-12  font-semibold"
          />
        </div>
        <div className="mt-4">
          <p className="text-[#637381] text-sm lg:text-base font-semibold text-center">
            {t?.auth?.business_info_form?.already_have_account}
            <Link
              href={`/${lang}/provider-login`}
              className="text-[#29b6be] font-bold ml-1 hover:underline"
            >
              {t?.auth?.business_info_form?.login_link}
            </Link>
          </p>
        </div>
      </AppForm>
    </div>
  );
}
