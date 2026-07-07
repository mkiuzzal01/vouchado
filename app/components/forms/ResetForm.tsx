"use client";
import Container from "../shared/Container";
import AppForm from "./AppForm";
import { FieldValues } from "react-hook-form";
import { ArrowLeft, Lock } from "lucide-react";
import SubmitButton from "../buttons/SubmitButton";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "react-toastify";
import { getDictionary } from "@/app/[lang]/dictionaries";
import TextInput from "./inputs/TextInput";

interface Props {
  locale: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
  token?: string;
}

export default function ResetForm({ locale, t, token }: Props) {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await resetPassword({
        ...values,
        token,
      }).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        reset();
        router.push(`/${locale}/login`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="grid grid-cols-1 w-full max-w-lg bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="pt-4 px-4">
            <button
              className="flex items-center gap-2 text-xs cursor-pointer  font-semibold text-gray-700"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft size={18} />
              {t?.auth?.reset?.back}
            </button>
          </div>
          {/* ================= RIGHT FORM ================= */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            {/* HEADER */}
            <div className="flex justify-center items-center flex-col gap-1 mb-8">
              <h2 className="text-2xl font-semibold ">
                {t?.auth?.reset?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t?.auth?.reset?.description}
              </p>
            </div>

            {/* FORM */}
            <AppForm
              onSubmit={onSubmit}
              defaultValues={{
                email: "",
              }}
            >
              <div className="space-y-6">
                <TextInput
                  icon={<Lock size={18} />}
                  label={t?.auth?.reset?.password}
                  name="password"
                  type="password"
                  className="h-12"
                  placeholder={t?.auth?.reset?.enter_password}
                />

                <TextInput
                  icon={<Lock size={18} />}
                  label={t?.auth?.reset?.confirm_password}
                  name="password_confirmation"
                  type="password"
                  className="h-12"
                  placeholder={t?.auth?.reset?.enter_confirm_password}
                />

                {/* SUBMIT */}
                <div className="pt-2">
                  <SubmitButton
                    title={t?.auth?.reset?.update}
                    className="h-12 w-full rounded-full"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="text-xs font-semibold text-gray-700 cursor-pointer"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    {t?.auth?.reset?.back}
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
