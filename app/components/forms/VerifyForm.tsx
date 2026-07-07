"use client";
import Container from "../shared/Container";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

import AppForm from "./AppForm";
import SubmitButton from "../buttons/SubmitButton";
import OtpInput from "./inputs/OTPInput";

import {
  useForgotVerifyOTPMutation,
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";

interface Props {
  locale: string;
  t: any;
  email?: string;
  from?: string;
}

export default function Verify({ locale, t, email, from }: Props) {
  const router = useRouter();

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [forgotVerifyOTP, { isLoading: forgotLoading }] =
    useForgotVerifyOTPMutation();

  const [resendOTP, { isLoading: resendLoading }] = useResendOTPMutation();

  const loading = isLoading || forgotLoading;

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const payload = {
        email,
        otp: values?.otp,
      };

      const response =
        from === "forgot"
          ? await forgotVerifyOTP(payload).unwrap()
          : await verifyOTP(payload).unwrap();

      if (response?.message) {
        toast.success(response.message);
        reset();

        router.push(
          from === "forgot"
            ? `/${locale}/reset?t=${response?.data?.token}`
            : `/${locale}/login`,
        );
      }
    } catch (error: any) {
      const message =
        error?.data?.message || "Something went wrong. Please try again.";

      if (message === "Email already verified") {
        toast.info(message);
        router.push(`/${locale}/reset`);
        return;
      }

      toast.error(message);
    }
  };

  const handleResend = async () => {
    try {
      const response = await resendOTP({ email }).unwrap();
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to resend verification code.",
      );
    }
  };

  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          {/* Back Button */}
          <div className="px-6 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-primary"
            >
              <ArrowLeft size={18} />
              {t?.auth?.verify?.back}
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 md:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
                {t?.auth?.verify?.title}
              </h2>

              <p className="text-sm leading-6 text-muted-foreground">
                {t?.auth?.verify?.description}{" "}
                <span className="font-medium text-gray-800">{email}</span>,
                {t?.auth?.verify?.description_end}
              </p>
            </div>

            {/* Form */}
            <AppForm onSubmit={onSubmit}>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <OtpInput name="otp" label={t?.auth?.verify?.otp_label} />
                </div>

                <SubmitButton
                  disabled={loading}
                  title={t?.auth?.verify?.verify}
                  className="h-12 w-full rounded-full"
                />

                {/* Resend */}
                <div className="flex items-center justify-center gap-1 text-sm">
                  <p className="text-gray-600">
                    {t?.auth?.verify?.not_received}
                  </p>

                  <button
                    type="button"
                    onClick={handleResend}
                    // disabled={resendLoading}
                    className="font-semibold text-primary transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {t?.auth?.verify?.resend}
                  </button>
                </div>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </Container>
  );
}
