import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerificationSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Animated/Bubbled Checkmark Graphic */}
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
          {/* Main Checkmark Circle */}
          <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-[#29b6c6] bg-white text-[#29b6c6]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.5"
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Decorative Background Bubbles */}
          <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[#29b6c6] opacity-70"></div>
          <div className="absolute top-0 left-12 h-2.5 w-2.5 rounded-full bg-[#29b6c6] opacity-60"></div>
          <div className="absolute top-6 left-2 h-3 w-3 rounded-full bg-[#29b6c6] opacity-40"></div>
          <div className="absolute bottom-6 left-0 h-4 w-4 rounded-full bg-[#29b6c6] opacity-60"></div>
          <div className="absolute bottom-0 right-14 h-3 w-3 rounded-full bg-[#29b6c6] opacity-50"></div>
          <div className="absolute bottom-4 right-2 h-1.5 w-1.5 rounded-full bg-[#29b6c6] opacity-30"></div>
          <div className="absolute top-14 left-10 h-1.5 w-1.5 rounded-full bg-[#29b6c6] opacity-10"></div>
        </div>

        {/* Messaging */}
        <h1 className="mb-8 text-2xl font-bold text-[#1e293b] sm:text-3xl">
          Email Verification Successful
        </h1>

        {/* CTA Button */}
        <Link href="/login">
          <Button className="w-full rounded-2xl">Login</Button>
        </Link>
      </div>
    </div>
  );
}
