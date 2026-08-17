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

interface Props {
  lang: string;
}

export default function BusineesInfoForm({ lang }: Props) {
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

    toast.success("Moving to next step for profile setup");
    setTimeout(() => {
      router.push(`/${lang}/business-profile-setup`);
    }, 1000);
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
      <AppForm onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="gap-2">
            <TextInput
              label="Business Name"
              name="businessName"
              placeholder="Enter your business name"
            />

            <SelectInput
              label="Business Category"
              name="businessCategory"
              options={
                data?.data?.map((item: any) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
            />

            <TextInput
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="XXXXXXXXXX"
            />

            <TextInput
              label="Email Address"
              type="email"
              name="emailAddress"
              placeholder="Enter your email"
            />

            <AddressInput
              placeholder="Write full address"
              onChange={handleAddressChange}
              value={address}
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
