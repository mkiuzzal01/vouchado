// src/components/sections/ContactUs.tsx
import React from "react";
import ContactForm from "@/app/components/forms/ContactForm";
import Container from "@/app/components/shared/Container";

interface TrustBadge {
  id: number;
  label: string;
  subLabel: string;
  iconPath: React.ReactNode;
}

interface SidebarInfo {
  id: number;
  label: string;
  value: string;
  subValue?: string;
  iconPath: React.ReactNode;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 1,
    label: "Quick Response",
    subLabel: "Usually within 24h",
    iconPath: (
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />
    ),
  },
  {
    id: 2,
    label: "Real People",
    subLabel: "Here to help",
    iconPath: (
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    ),
  },
  {
    id: 3,
    label: "100% Secure",
    subLabel: "Your data is safe",
    iconPath: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

const SIDEBAR_INFO: SidebarInfo[] = [
  {
    id: 1,
    label: "Email",
    value: "info@okazzion.com",
    iconPath: (
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
    ),
  },
  {
    id: 2,
    label: "Phone",
    value: "(555) 123-4567",
    subValue: "Mon-Fri, 9am-6pm EST",
    iconPath: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    id: 3,
    label: "Address",
    value: "123 Commerce Street",
    subValue: "New York, NY 10013",
    iconPath: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />,
  },
];

export default function ContactUs() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0c4d52] via-[#0b5157] to-[#062d30] p-6 sm:p-10 lg:p-14 shadow-xl">
      <Container>
        {/* Subtle Halftone Corner Grid Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ffffff08_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(circle at top right, white, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(circle at top right, white, transparent 60%)",
          }}
        />

        {/* --- MAIN RESPONSIBLE GRID SYSTEM --- */}
        {/* 12-Column Split: Editorial (5 cols) | Form (5 cols) | Info Blocks (2 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-start relative z-10">
          {/* COLUMN 1: LEFT HAND EDITORIAL TEXT BLOCK (5/12 Spans) */}
          <div className="xl:col-span-5 flex flex-col  h-full space-y-12 text-left">
            <div className="space-y-6">
              {/* Floating Micro-Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-bold tracking-wide uppercase max-w-max">
                <svg
                  className="w-3.5 h-3.5 stroke-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 0c-.266.917-.68 1.796-1.225 2.6M18.33 21H13l-1.5-3"
                  />
                </svg>
                <span>We're Here to Help</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.1]">
                Got a question or <br /> need support?
              </h2>

              <p className="text-white/75 text-base font-light leading-relaxed max-w-md">
                Send us a message and our team will get back to you as soon as
                possible.
              </p>
            </div>

            {/* Lower Inline Horizontal Trust Row */}
            <div className="grid grid-cols-3 gap-2 pt-6">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.id} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-white">
                    <svg
                      className="w-4 h-4 shrink-0 opacity-80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      {badge.iconPath}
                    </svg>
                    <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 font-light pl-5">
                    {badge.subLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CENTER FLOATING CONTEXT FORM (5/12 Spans) */}
          <div className="xl:col-span-5 w-full">
            <ContactForm />
          </div>

          {/* COLUMN 3: RIGHT ALIGNED UTILITY QUICK-LINKS (2/12 Spans) */}
          <div className="xl:col-span-2 flex flex-col gap-4 w-full h-full justify-start">
            {SIDEBAR_INFO.map((info) => (
              <div
                key={info.id}
                className="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col text-left space-y-3 transition-colors hover:bg-white/[0.07]"
              >
                {/* Title Bar with Transparent White Circular Shield */}
                <div className="flex items-center gap-2.5 text-white/90">
                  <div className="flex items-center justify-center text-white shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      {info.iconPath}
                    </svg>
                  </div>
                  <span className="text-sm font-bold tracking-wide">
                    {info.label}
                  </span>
                </div>

                {/* Dynamic Value Readout Fields */}
                <div className="space-y-0.5 pl-0.5">
                  <p className="text-xs sm:text-[13px] text-white/90 font-medium break-all selection:bg-teal-500">
                    {info.value}
                  </p>
                  {info.subValue && (
                    <p className="text-[11px] text-white/50 font-normal leading-tight">
                      {info.subValue}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
