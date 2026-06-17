import React from "react";
import Container from "@/app/components/shared/Container";

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
    iconPath: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4M12 16h.01" />
    ), // Shield with details
  },
  {
    id: 2,
    title: "QR-Protected Redemption",
    description: "Each voucher is verified at point of use.",
    iconPath: (
      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm14 6h2V9h-2V7h2V5h-4v6h2zm-6 10h2v-2h-2v2zm6-6h2v-2h-2v2zm-6-4h2V7h-2V5h-2v4h2zm-8 8h8v-8H3v8zm2-6h4v4H5v-4zm14 10h2v-4h-4v2h2v2zm-8-2h2v-2h-2v2zm-2 2h2v-2H9v2zm2-6h2v-2h-2v2z" />
    ), // QR representation
  },
  {
    id: 3,
    title: "Verified Customers",
    description: "Real, accountable buyers visit your business.",
    iconPath: (
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M16 11l2 2 4-4" />
    ),
  },
  {
    id: 4,
    title: "Fraud Prevention",
    description: "Active monitoring protects your revenue.",
    iconPath: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4M12 16h.01" />
    ),
  },
  {
    id: 5,
    title: "Safe Transactions",
    description: "Funds handled with full transparency.",
    iconPath: <path d="M2 10h20" />,
  },
];

export default function PromotionalSteps() {
  return (
    <Container className="py-8">
      <div className="w-full bg-white rounded-3xl border border-[#EDF2F7] shadow-sm p-6 lg:p-8">
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
