/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import GoogleIcon from "../icons/GoogleIcon";
import { auth, googleProvider } from "@/lib/firebase.config";
import { useSocialLoginMutation } from "@/redux/features/auth/auth.api";

interface Props {
  login_type?: "user" | "provider";
}

export default function SocialLogin({ login_type }: Props) {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const locale = (params.lan as string) || "en";
  const [loading, setLoading] = useState(false);
  const [login] = useSocialLoginMutation();

  const redirectPath = redirectUrl || `/${locale}`;

  const handleGoogleLogin = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken as string;
      const res = await login({
        token,
        provider: "google",
        role: login_type || "user",
      }).unwrap();

      if (res?.message) {
        toast.success(res.message);
        dispatch(
          setUser({
            user: {
              id: res.data?.id,
              email: res.data?.email,
              role: res.data?.role,
              name: res.data?.name,
              avatar: res.data?.avatar,
            },
            vuchado_token: res?.token,
          }),
        );
        router.push(redirectPath);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`
          w-full  my-2
          flex items-center justify-center gap-3
          px-5 py-3
          border border-gray-300
          rounded-xl
          shadow-sm
          transition-all duration-200
          hover:shadow-md hover:bg-gray-50
          active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        <span className="text-gray-500 font-medium text-sm sm:text-base">
          {loading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}
