import React from "react";
import Image from "next/image";
import ContactForm from "@/app/components/forms/ContactForm";
import Container from "@/app/components/shared/Container";
import bg_image from "@/public/section-headers/Hero Section (6).png";
import QuickResponse from "@/app/components/icons/QuickResponse";
import RealPeople from "@/app/components/icons/RealPeaple";
import Secure100 from "@/app/components/icons/Secure100";
import HeadPhone from "@/app/components/icons/HeadPhone";
import LocationIcon from "@/app/components/icons/LocationIcon";
import Phone from "@/app/components/icons/Phone";
import MailIcon from "@/app/components/icons/MailIcon";

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

interface SystemInfo {
  email?: string;
  number?: string;
  address?: string;
}

interface ContactUsProps {
  lang: string;
  systemInfo?: SystemInfo;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 1,
    label: "Quick Response",
    subLabel: "Usually within 24h",
    iconPath: <QuickResponse />,
  },
  {
    id: 2,
    label: "Real People",
    subLabel: "Here to help",
    iconPath: <RealPeople />,
  },
  {
    id: 3,
    label: "100% Secure",
    subLabel: "Your data is safe",
    iconPath: <Secure100 />,
  },
];

const getSidebarInfo = (systemInfo?: SystemInfo): SidebarInfo[] => [
  {
    id: 1,
    label: "Email",
    value: systemInfo?.email || "info@okazzion.com",
    iconPath: <MailIcon />,
  },
  {
    id: 2,
    label: "Phone",
    value: systemInfo?.number || "(555) 123-4567",
    subValue: "Mon-Fri, 9am-6pm EST",
    iconPath: <Phone />,
  },
  {
    id: 3,
    label: "Address",
    value: systemInfo?.address || "123 Commerce Street",
    subValue: "New York, NY 10013",
    iconPath: <LocationIcon color="#ffff" />,
  },
];

export default function ContactUs({ lang, systemInfo }: ContactUsProps) {
  const sidebarInfo = getSidebarInfo(systemInfo);

  return (
    <section className="relative mx-auto w-full max-w-full 2xl:w-[1856px] overflow-hidden py-10 px-4 sm:px-8 2xl:py-16 2xl:ps-[80px] 2xl:pe-[64px] rounded-2xl sm:rounded-[32px]">
      {/* Background Image */}
      <Image
        src={bg_image}
        alt="Background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="xl:col-span-5 flex flex-col h-full space-y-8 sm:space-y-12 text-left">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-bold tracking-wide uppercase max-w-max">
              <HeadPhone />
              <span>WE'RE HERE TO HELP</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[64px] font-bold text-white tracking-tight leading-tight sm:leading-[1.1]">
              Got a question or <br className="hidden sm:inline" /> need
              support?
            </h2>

            <p className="text-base sm:text-lg text-white/80">
              Send us a message and our team will get back to you as soon as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-2 lg:pt-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.id} className="space-y-1">
                <div className="flex items-center gap-1.5 text-white">
                  <span>{badge.iconPath}</span>
                  <span className="text-base sm:text-lg font-semibold">
                    {badge.label}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-normal text-white/80">
                  {badge.subLabel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="xl:col-span-5 w-full">
          <ContactForm locale={lang} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          {sidebarInfo.map((info) => (
            <div
              key={info.id}
              className="flex items-start gap-4 bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/30 backdrop-blur-sm"
            >
              <div>{info.iconPath}</div>
              <div>
                <span className="text-lg sm:text-xl font-bold tracking-wide text-white">
                  {info.label}
                </span>
                <div className="mt-2 sm:mt-3 space-y-0.5">
                  <p className="font-medium text-white text-sm sm:text-base break-all">
                    {info.value}
                  </p>

                  {info.subValue && (
                    <p className="font-normal text-white/80 text-xs sm:text-sm">
                      {info.subValue}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
