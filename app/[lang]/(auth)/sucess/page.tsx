"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import success from "@/public/auth/Group 87.png";
import { useRouter } from "next/navigation";

interface Props {
  role?: string;
}

export default function VerificationSuccess({ role }: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* Success Icon Graphic */}
        <div className="mb-6 flex items-center justify-center">
          <Image
            src={success}
            alt="Email Verification Successful"
            width={180}
            height={180}
            priority
          />
        </div>

        {/* Messaging */}
        <h1 className="mb-6 text-2xl font-semibold text-[#1e293b]">
          Email Verification Successful
        </h1>

        {/* CTA Button */}
        {role !== "provider" && (
          <Button
            onClick={() => router.push("/provider-login")}
            className="w-full h-10 rounded-full text-base font-medium"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
