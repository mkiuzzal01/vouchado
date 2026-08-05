"use client";
import { FieldValues } from "react-hook-form";
import Container from "../shared/Container";
import AppForm from "./AppForm";
import { ArrowLeft, Mail } from "lucide-react";
import SubmitButton from "../buttons/SubmitButton";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "react-toastify";
import TextInput from "./inputs/TextInput";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
}

export default function ForgotForm({ t, locale }: Props) {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await forgotPassword(values).unwrap();

      if (res?.message) {
        toast.info(res?.message);
        reset();
        router.push(`/${locale}/verify?email=${values?.email}&from=forgot`);
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
              {t.auth.forgot.back}
            </button>
          </div>
          {/* ================= RIGHT FORM ================= */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            {/* HEADER */}
            <div className="flex justify-center items-center flex-col gap-1 mb-8">
              <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-2">
                {t.auth.forgot.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {t.auth.forgot.description}
              </p>
            </div>

            {/* FORM */}
            <AppForm
              onSubmit={onSubmit}
              defaultValues={{
                email: "",
              }}
            >
              <div className="space-y-5">
                <TextInput
                  icon={<Mail size={18} />}
                  type="email"
                  label={t.auth.forgot.email}
                  name="email"
                  className="h-12"
                  placeholder={t.auth.forgot.email}
                />

                {/* SUBMIT */}
                <div className="pt-2">
                  <SubmitButton
                    isLoading={isLoading}
                    title={t.auth.forgot.reset_password}
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
                    {t.auth.forgot.back}
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
