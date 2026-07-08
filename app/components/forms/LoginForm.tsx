/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import { useSearchParams } from "next/navigation";
import Container from "../shared/Container";
import SocialLogin from "../utils/SocilaLogin";
import SubmitButton from "../buttons/SubmitButton";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
  img: StaticImageData;
  login_type: "user" | "provider";
}

export default function Login({ t, locale, img, login_type }: Props) {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const redirectPath = redirectUrl || `/${locale}`;

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await login(values).unwrap();
      if (res?.token) {
        toast.success(res?.message || "Login successful");

        dispatch(
          setUser({
            user: {
              id: res.data.id,
              email: res.data.email,
              role: res.data.role,
              name: res.data.name,
              avatar: res.data.avatar,
            },
            token: res.token,
            tokenType: res.token_type,
            expiresAt: res.expires_at,
          }),
        );

        reset();
        router.push(redirectPath);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* ================= LEFT IMAGE ================= */}
          <div className="hidden lg:flex items-center justify-center">
            <Image
              src={img}
              alt="signin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            {/* HEADER */}
            <div className="flex justify-center items-center flex-col gap-1 mb-8">
              <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-2">
                {t.auth.login.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {t.auth.login.description}
              </p>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="space-y-4">
              <SocialLogin login_type={login_type} />

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
                email: "",
                password: "",
              }}
            >
              <div className="space-y-5">
                <TextInput
                  icon={<Mail size={18} />}
                  label={t.auth.login.email}
                  name="email"
                  className="h-12"
                  required
                  placeholder={t.auth.login.email}
                />

                <TextInput
                  icon={<Lock size={18} />}
                  label={t.auth.login.password}
                  name="password"
                  type="password"
                  className="h-12"
                  required
                  placeholder={t.auth.login.password}
                />

                <div className="flex items-end gap-2 py-2">
                  <Link
                    href={`/${locale}/forgot`}
                    className="text-xs text-gray-700 hover:text-primary transition-colors"
                  >
                    {t.auth.login.forgot_password}{" "}
                  </Link>
                </div>
                {/* SUBMIT */}
                <div className="pt-2">
                  <SubmitButton
                    isLoading={isLoading}
                    title={t.auth.login.login}
                    className="h-12 w-full rounded-full text-white bg-primary hover:bg-[#0f7275]"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-700 text-center">
                    {t.auth.login.no_account}{" "}
                    <Link
                      href={
                        login_type === "provider"
                          ? `/${locale}/provider-registration`
                          : `/${locale}/registration`
                      }
                      className="text-primary font-semibold"
                    >
                      {t.auth.login.register}
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
