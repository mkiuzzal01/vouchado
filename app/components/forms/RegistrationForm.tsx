"use client";
import { FieldValues } from "react-hook-form";
import Container from "../shared/Container";
import AppForm from "./AppForm";
import { Lock, Mail, User } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SocialLogin from "../utils/SocilaLogin";
import TextInput from "./inputs/TextInput";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
  img: StaticImageData;
  register_type?: "user" | "provider";
}

export default function RegistrationForm({
  t,
  locale,
  img,
  register_type,
}: Props) {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    const data = {
      ...values,
      password_confirmation: values.password,
      term_policy_agreed: true,
      role: register_type,
    };

    try {
      const res = await register(data).unwrap();

      if (res?.message) {
        toast?.info(res?.message);
        reset();
        router?.push(
          `/${locale}/verify?email=${res?.data?.email}&for=${register_type}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast?.error(error.message);
      }
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-8xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* ================= LEFT IMAGE ================= */}
          <div className="hidden lg:flex items-center justify-center">
            <Image
              src={img}
              alt="signin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-4 lg:p-10 flex flex-col justify-center">
            {/* HEADER */}
            <div className="flex justify-center items-center flex-col gap-1 mb-8">
              <h2 className="font-semibold text-2xl lg:text-3xl mb-2">
                {t.auth.register.title}
              </h2>
              <p className="text-xs lg:text-sm text-muted-foreground">
                {t.auth.register.description}
              </p>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="space-y-4">
              <SocialLogin />

              {/* DIVIDER */}
              <div className="flex items-center gap-3">
                <div className="h-px bg-gray-200 flex-1" />
                <span className="text-xs text-gray-400 uppercase">or</span>
                <div className="h-px bg-gray-200 flex-1" />
              </div>
            </div>

            {/* FORM */}
            <AppForm
              onSubmit={onSubmit}
              defaultValues={{
                name: "",
                email: "",
                password: "",
              }}
            >
              <div className="space-y-5">
                <TextInput
                  icon={<User size={18} />}
                  label={t.auth.register.name}
                  name="name"
                  className="h-12"
                  placeholder={t.auth.register.name}
                />

                <TextInput
                  icon={<Mail size={18} />}
                  label={t.auth.register.email}
                  name="email"
                  className="h-12"
                  placeholder={t.auth.register.email}
                />

                <TextInput
                  icon={<Lock size={18} />}
                  label={t.auth.register.password}
                  name="password"
                  type="password"
                  className="h-12"
                  placeholder={t.auth.register.password}
                />

                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                  />
                  <label className="text-xs text-gray-700" htmlFor="terms">
                    I agree to Tech Takes{" "}
                    <Link
                      href={`/${locale}/terms`}
                      className="underline text-primary font-semibold"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={`/${locale}/privacy`}
                      className="underline text-primary font-semibold"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* SUBMIT */}
                <SubmitButton
                  isLoading={isLoading}
                  title="Register"
                  className="h-12 w-full rounded-full text-white bg-primary hover:bg-[#0f7275]"
                  disabled={!agreedToTerms}
                />
                <div>
                  <p className="text-xs text-gray-700 text-center">
                    {t.auth.register.already_account}{" "}
                    <Link
                      href={
                        register_type === "provider"
                          ? `/${locale}/provider-login`
                          : `/${locale}/login`
                      }
                      className="text-primary font-semibold"
                    >
                      {t.auth.register.login}
                    </Link>
                  </p>
                </div>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </Container>
  );
}
