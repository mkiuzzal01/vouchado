"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "@/app/components/forms/ContactForm";
import bg_image from "@/public/section-headers/Hero Section (6).png";
import QuickResponse from "@/app/components/icons/QuickResponse";
import RealPeople from "@/app/components/icons/RealPeaple";
import Secure100 from "@/app/components/icons/Secure100";
import HeadPhone from "@/app/components/icons/HeadPhone";
import LocationIcon from "@/app/components/icons/LocationIcon";
import Phone from "@/app/components/icons/Phone";
import MailIcon from "@/app/components/icons/MailIcon";
import { getDictionary } from "@/app/[lang]/dictionaries";

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
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ContactUs({ lang, systemInfo, t }: ContactUsProps) {
  const contactData = t?.contact;

  const getSidebarInfo = (systemInfo?: SystemInfo): SidebarInfo[] => [
    {
      id: 1,
      label: contactData?.contact_info?.email?.title || "E-Mail",
      value: systemInfo?.email || contactData?.contact_info?.email?.value || "",
      iconPath: <MailIcon />,
    },
    {
      id: 2,
      label: contactData?.contact_info?.phone?.title || "Telefon",
      value:
        systemInfo?.number || contactData?.contact_info?.phone?.value || "",
      subValue: contactData?.contact_info?.phone?.time || "",
      iconPath: <Phone />,
    },
    {
      id: 3,
      label: contactData?.contact_info?.address?.title || "Adresse",
      value:
        systemInfo?.address || contactData?.contact_info?.address?.value || "",
      iconPath: <LocationIcon color="#ffffff" />,
    },
  ];

  const sidebarInfo = getSidebarInfo(systemInfo);

  const TRUST_BADGES: TrustBadge[] = [
    {
      id: 1,
      label: contactData?.quick_response || "Schnelle Antwort",
      subLabel: contactData?.quick_response_sub || "",
      iconPath: <QuickResponse />,
    },
    {
      id: 2,
      label: contactData?.real_people || "Echte Menschen",
      subLabel: contactData?.real_people_sub || "",
      iconPath: <RealPeople />,
    },
    {
      id: 3,
      label: contactData?.secure_100 || "100 % Sicher",
      subLabel: contactData?.secure_100_sub || "",
      iconPath: <Secure100 />,
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-full 2xl:w-[1856px] overflow-hidden py-10 px-4 sm:px-8 2xl:py-16 2xl:ps-[80px] 2xl:pe-[64px] rounded-2xl sm:rounded-[32px] shadow-2xl">
      {/* Background Image */}
      <Image
        src={bg_image}
        alt="Background Pattern"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Headings & Trust Badges */}
        <div className="xl:col-span-5 flex flex-col justify-between h-full space-y-8 sm:space-y-12 text-left">
          <div className="space-y-4 sm:space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide uppercase max-w-max">
              <HeadPhone />
              <span>{contactData?.badge || "WIR SIND FÜR DICH DA"}</span>
            </div>

            {/* Title with Cyan Highlight */}
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.15]">
              {contactData?.heading_1 || "Hast du eine Frage oder brauchst du"}{" "}
              <span className="text-[#1ec6cc]">
                {contactData?.heading_highlight || "Unterstützung?"}
              </span>
            </h2>

            {/* Subheading with Highlighted Text */}
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              {contactData?.subheading_1 ||
                "Schreib uns einfach eine Nachricht."}{" "}
              {contactData?.subheading_2 || "Unser Team"}{" "}
              <span className="font-bold text-white">
                {contactData?.subheading_highlight ||
                  "meldet sich so schnell wie möglich"}
              </span>{" "}
              {contactData?.subheading_3 || "bei dir."}
            </p>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <span className="shrink-0">{badge.iconPath}</span>
                  <span className="text-sm sm:text-base font-bold whitespace-nowrap">
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-snug">
                  {badge.subLabel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN: Form Container */}
        <div className="xl:col-span-5 w-full">
          <ContactForm locale={lang} t={t} />
        </div>

        {/* RIGHT COLUMN: Contact Cards */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          {sidebarInfo.map((info) => (
            <div
              key={info.id}
              className="flex items-start gap-4 bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-200"
            >
              <div className="shrink-0 p-2.5 rounded-full bg-white/10 text-white">
                {info.iconPath}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-base sm:text-lg font-bold tracking-wide text-white block">
                  {info.label}
                </span>
                <div className="mt-1 space-y-0.5">
                  <p className="font-semibold text-white text-xs sm:text-sm break-all">
                    {info.value}
                  </p>
                  {info.subValue && (
                    <p className="font-normal text-white/75 text-xs">
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
