"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/globalhooks";

interface PrivateRouteProps {
  lang: string;
  children: React.ReactNode;
}

export default function PrivateRoute({ lang, children }: PrivateRouteProps) {
  const router = useRouter();

  const token = useAppSelector((state) => state.auth.vuchado_token);

  useEffect(() => {
    if (!token) {
      router.replace(`/${lang}/login?redirect=${window.location.href}`);
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
