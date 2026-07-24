import React from "react";
import Header from "./__components/aside/Header";
import { getBusniessProfile } from "@/actions/quires/user.api";
import { getNotification } from "@/actions/quires/system_info.api";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const profileInfo = await getBusniessProfile();
  const res = await getNotification();
  const notifications = res?.data || [];

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Header
        lang={lang}
        profileInfo={profileInfo}
        notifications={notifications}
      />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
