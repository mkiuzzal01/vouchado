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
  const getSidebarInfo = (systemInfo?: SystemInfo): SidebarInfo[] => [
    {
      id: 1,
      label: t.contact.contact_info.email.title,
      value: systemInfo?.email || t.contact.contact_info.email.value,
      iconPath: <MailIcon />,
    },
    {
      id: 2,
      label: t.contact.contact_info.phone.title,
      value: systemInfo?.number || t.contact.contact_info.phone.value,
      subValue: t.contact.contact_info.phone.time,
      iconPath: <Phone />,
    },
    {
      id: 3,
      label: t.contact.contact_info.address.title,
      value: systemInfo?.address || t.contact.contact_info.address.value,
      iconPath: <LocationIcon color="#ffff" />,
    },
  ];

  const sidebarInfo = getSidebarInfo(systemInfo);

  const TRUST_BADGES: TrustBadge[] = [
    {
      id: 1,
      label: t.contact.quick_response,
      subLabel: t.contact.quick_response_sub,
      iconPath: <QuickResponse />,
    },
    {
      id: 2,
      label: t.contact.real_people,
      subLabel: t.contact.real_people_sub,
      iconPath: <RealPeople />,
    },
    {
      id: 3,
      label: t.contact.secure_100,
      subLabel: t.contact.secure_100_sub,
      iconPath: <Secure100 />,
    },
  ];

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
              <span>{t.contact.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[64px] font-bold text-white tracking-tight leading-tight sm:leading-[1.1]">
              {t.contact.heading}
            </h2>

            <p className="text-base sm:text-lg text-white/80">
              {t.contact.subheading}
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
          <ContactForm locale={lang} t={t} />
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
