"use client";

import ModalContainer from "@/app/components/shared/ModalContainer";
import { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  paymentInfo: any;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function PaymentInfo({ paymentInfo, t }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Subview Section Header */}
      <div className="pb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          {t?.provider_profile?.settings?.payment_information?.title ||
            "Payment Information"}
        </h2>
      </div>

      {/* Stripe Payment Integration Status Container */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50/80 hover:border-gray-100 transition-all">
        {/* Left Side Status Metrics */}
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-gray-800 tracking-wide">
            {t?.provider_profile?.settings?.payment_information?.payment_method
              ?.title || "Payment Method"}
          </h3>
          <p className="text-[11px] text-gray-400 font-medium tracking-wide">
            Stripe
          </p>
        </div>

        {/* Brand Rounded Action Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-cyan-100 bg-cyan-50/40 text-[#29b6be] hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-200"
        >
          {t?.provider_profile?.settings?.payment_information?.payment_method
            ?.edit || "Edit"}
        </button>
      </div>
      <ModalContainer
        width="md"
        title={
          t?.provider_profile?.settings?.payment_information?.title ||
          "Payment Information"
        }
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <PaymentMethods
          paymentMethod={paymentInfo}
          onClose={() => setOpen(false)}
          t={t}
        />
      </ModalContainer>
    </div>
  );
}
