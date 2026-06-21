import React from "react";
import SettingAside from "./__components/SettingAside";
import Container from "@/app/components/shared/Container";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const { lang } = await params;

  return (
    <Container className="py-6">
      {/* Title Header Section with Dashboard spacing matching */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Settings
        </h1>
      </div>

      {/* Grid Alignment Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Nav Component */}
        <div className="md:col-span-1">
          <SettingAside lang={lang} />
        </div>

        {/* Core Detail Settings Window Viewport */}
        <div className="md:col-span-3 bg-white border border-gray-100 rounded-2xl p-6 min-h-[480px]">
          {children}
        </div>
      </div>
    </Container>
  );
}
