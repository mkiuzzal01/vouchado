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
    <Container className="py-4">
      {/* Grid Alignment Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Nav Component */}
        <div className="md:col-span-1">
          <SettingAside lang={lang} />
        </div>

        {/* Core Detail Settings Window Viewport */}
        <div className="md:col-span-3 min-h-[480px]">{children}</div>
      </div>
    </Container>
  );
}
