import React from "react";
import Header from "./__components/aside/Header";
import { getBusniessProfile } from "@/actions/quires/user.api";
import { getNotification } from "@/actions/quires/system_info.api";
import { getProviderNavLinks } from "./__components/aside/HeaderLinks";
import { translateData } from "@/app/components/utils/translateText";
import { getDictionary } from "../dictionaries";
import NotFoundData from "@/app/components/shared/NotFoundData";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const [profileInfoData, notificationsData, navItems] = await Promise.all([
    getBusniessProfile(),
    getNotification(),
    getProviderNavLinks(lang),
  ]);
  const profileInfo = await translateData(profileInfoData, lang);
  const notifications = await translateData(notificationsData, lang);

  const notificationsList = Array.isArray(notifications?.data?.data)
    ? notifications.data.data
    : Array.isArray(notifications?.data)
      ? notifications.data
      : Array.isArray(notifications)
        ? notifications
        : [];

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Header
        t={t}
        lang={lang}
        profileInfo={profileInfo}
        navItems={navItems}
        notifications={notificationsList}
      />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
