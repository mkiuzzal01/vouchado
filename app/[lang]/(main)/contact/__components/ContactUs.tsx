import React from "react";
import ContactForm from "@/app/components/forms/ContactForm";
import Container from "@/app/components/shared/Container";
import Image from "next/image";
import bg_image from "@/public/section-headers/Hero Section (6).png";
import QuickResponse from "@/app/components/icons/QuickResponse";
import RealPeaple from "@/app/components/icons/RealPeaple";
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
    iconPath: <RealPeaple />,
  },
  {
    id: 3,
    label: "100% Secure",
    subLabel: "Your data is safe",
    iconPath: <Secure100 />,
  },
];

const SIDEBAR_INFO: SidebarInfo[] = [
  {
    id: 1,
    label: "Email",
    value: "info@okazzion.com",
    iconPath: <MailIcon />,
  },
  {
    id: 2,
    label: "Phone",
    value: "(555) 123-4567",
    subValue: "Mon-Fri, 9am-6pm EST",
    iconPath: <Phone />,
  },
  {
    id: 3,
    label: "Address",
    value: "123 Commerce Street",
    subValue: "New York, NY 10013",
    iconPath: <LocationIcon color="#ffff" />,
  },
];

interface props {
  lang: string;
}

export default function ContactUs({ lang }: props) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background Image */}
      <Image
        src={bg_image}
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-center"
      />

      <Container>
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="xl:col-span-5 flex flex-col h-full space-y-12 text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-bold tracking-wide uppercase max-w-max">
                <HeadPhone />
                <span>WE'RE HERE TO HELP</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.1]">
                Got a question or <br /> need support?
              </h2>

              <p className="text-lg text-white/80">
                Send us a message and our team will get back to you as soon as
                possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:pt-6">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.id} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-white">
                    <span>{badge.iconPath}</span>

                    <span className="text-lg font-semibold">{badge.label}</span>
                  </div>

                  <p className="text-sm font-normal text-white/80">
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
            {SIDEBAR_INFO.map((info) => (
              <div
                key={info.id}
                className="flex items-start gap-4 bg-white/10 rounded-3xl p-5 border border-white/30"
              >
                <div>{info.iconPath}</div>
                <div>
                  <span className="text-xl font-bold tracking-wide text-white">
                    {info.label}
                  </span>
                  <div className="mt-3 space-y-0.5">
                    <p className="font-medium text-white">{info.value}</p>

                    {info.subValue && (
                      <p className="font-normal text-white">{info.subValue}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
