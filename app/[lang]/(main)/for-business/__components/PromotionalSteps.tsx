import React from "react";
import Container from "@/app/components/shared/Container";
import SecurePayment from "@/app/components/icons/SecurePayment";
import QRCode from "@/app/components/icons/QRCode";
import ProtectedRedeem from "@/app/components/icons/ProtectedRedeem";
import VerifyedCustomer from "@/app/components/icons/VerifyedCustomer";
import Fraud from "@/app/components/icons/Fraud";
import SafeTransaction from "@/app/components/icons/SafeTransaction";

interface SecurityBadge {
  id: number;
  title: string;
  description: string;
  iconPath: React.ReactNode;
}

const SECURITY_BADGES: SecurityBadge[] = [
  {
    id: 1,
    title: "Secure Payments",
    description: "Bank-grade encryption on every transaction.",
    iconPath: <SecurePayment size={24} />,
  },
  {
    id: 2,
    title: "QR-Protected Redemption",
    description: "Each voucher is verified at point of use.",
    iconPath: <ProtectedRedeem size={24} />,
  },
  {
    id: 3,
    title: "Verified Customers",
    description: "Real, accountable buyers visit your business.",
    iconPath: <VerifyedCustomer size={24} />,
  },
  {
    id: 4,
    title: "Fraud Prevention",
    description: "Active monitoring protects your revenue.",
    iconPath: <Fraud size={24} />,
  },
  {
    id: 5,
    title: "Safe Transactions",
    description: "Funds handled with full transparency.",
    iconPath: <SafeTransaction size={24} />,
  },
];

export default function PromotionalSteps() {
  return (
    <Container className="py-8">
      <div className="w-full bg-white rounded-3xl border border-[#EDF2F7] p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 items-start">
          {SECURITY_BADGES.map((badge, idx) => {
            return (
              <div
                key={badge.id}
                className={`
                    flex flex-row items-start gap-4 w-full h-full lg:px-3
                    /* Apply subtle right gray divider borders exclusively on wide desktop setups */
                    lg:border-r lg:border-[#EDF2F7] 
                    ${idx === SECURITY_BADGES.length - 1 ? "lg:border-r-0" : ""}
                  `}
              >
                {/* Circular Soft Cyan Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-[#2DE2EA]/10 text-[#0E6A70] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {badge.iconPath}
                  </svg>
                </div>

                {/* Text Information Unit */}
                <div className="space-y-1.5 text-left">
                  <h4 className="text-[15px] font-bold text-[#1F2937] tracking-tight leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#6B7280] font-normal leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
