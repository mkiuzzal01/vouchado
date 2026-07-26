"use client";
import { useOrderCancelationRequestMutation } from "@/redux/features/order/order.api";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  lang: string;
  session_id: string;
}

export default function Cancel({ lang, session_id }: Props) {
  const [orderCancelationRequest] = useOrderCancelationRequestMutation();

  useEffect(() => {
    if (session_id) {
      orderCancelationRequest(session_id);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-[50vh]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600">Please try again</p>
        <Link href={`/${lang}`}>
          <button className="mt-4 w-full sm:w-auto px-7 py-3 rounded-full bg-[#31BFC8] hover:shadow-lg text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition duration-200 active:scale-[0.99] whitespace-nowrap">
            <Home className="w-4 h-4" /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
