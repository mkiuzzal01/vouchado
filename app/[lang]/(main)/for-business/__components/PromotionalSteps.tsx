import React from "react";
import Container from "@/app/components/shared/Container";
import SecurePayment from "@/app/components/icons/SecurePayment";
import ProtectedRedeem from "@/app/components/icons/ProtectedRedeem";
import VerifyedCustomer from "@/app/components/icons/VerifyedCustomer";
import Fraud from "@/app/components/icons/Fraud";
import SafeTransaction from "@/app/components/icons/SafeTransaction";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface SecurityBadge {
  id: number;
  title: string;
  description: string;
  iconPath: React.ReactNode;
}

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function PromotionalSteps({ t }: Props) {
  const SECURITY_BADGES: SecurityBadge[] = [
    {
      id: 1,
      title: t?.for_business.features.secure_payments.title,
      description: t?.for_business.features.secure_payments.desc,
      iconPath: <SecurePayment size={32} />,
    },
    {
      id: 2,
      title: t?.for_business.features.qr_protected_redemption.title,
      description: t?.for_business.features.qr_protected_redemption.desc,
      iconPath: <ProtectedRedeem size={32} />,
    },
    {
      id: 3,
      title: t?.for_business.features.verified_customers.title,
      description: t?.for_business.features.verified_customers.desc,
      iconPath: <VerifyedCustomer size={32} />,
    },
    {
      id: 4,
      title: t?.for_business.features.fraud_prevention.title,
      description: t?.for_business.features.fraud_prevention.desc,
      iconPath: <Fraud size={32} />,
    },
    {
      id: 5,
      title: t?.for_business.features.safe_transactions.title,
      description: t?.for_business.features.safe_transactions.desc,
      iconPath: <SafeTransaction size={32} />,
    },
  ];

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
