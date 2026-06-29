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
    iconPath: <SecurePayment size={32} />,
  },
  {
    id: 2,
    title: "QR-Protected Redemption",
    description: "Each voucher is verified at point of use.",
    iconPath: <ProtectedRedeem size={32} />,
  },
  {
    id: 3,
    title: "Verified Customers",
    description: "Real, accountable buyers visit your business.",
    iconPath: <VerifyedCustomer size={32} />,
  },
  {
    id: 4,
    title: "Fraud Prevention",
    description: "Active monitoring protects your revenue.",
    iconPath: <Fraud size={32} />,
  },
  {
    id: 5,
    title: "Safe Transactions",
    description: "Funds handled with full transparency.",
    iconPath: <SafeTransaction size={32} />,
  },
];

export default function PromotionalSteps() {
  return (
    <Container className="pb-8">
      <div className="w-full bg-white rounded-3xl border border-[#EDF2F7] p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 items-start">
          {SECURITY_BADGES.map((badge, idx) => {
            return (
              <div
                key={badge.id}
                className={`
                    flex flex-row items-center gap-4 w-full h-full lg:px-1
                    lg:border-r lg:border-[#EDF2F7] 
                    ${idx === SECURITY_BADGES.length - 1 ? "lg:border-r-0" : ""}
                  `}
              >
                {/* Circular Soft Cyan Icon Wrapper */}
                <div className="rounded-full bg-[#2DE2EA]/10 text-[#0E6A70] flex items-center justify-center p-3">
                  {badge.iconPath}
                </div>

                {/* Text Information Unit */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1F2937]">
                    {badge.title}
                  </h4>
                  <p className="text-xs lg:text-[15px] text-[#6B7280] font-normal">
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
