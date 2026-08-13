import { getDictionary } from "@/app/[lang]/dictionaries";

export interface IProviderNavItem {
  iconName: "dashboard" | "deals" | "messages" | "settings";
  label: string;
  href: string;
}

export const getProviderNavLinks = async (
  lang: string,
): Promise<IProviderNavItem[]> => {
  const dict = await getDictionary(lang);

  return [
    {
      iconName: "dashboard",
      label: dict.provider_profile.dashboard.nav.dashboard,
      href: "/provider",
    },
    {
      iconName: "deals",
      label: dict.provider_profile.dashboard.nav.deals,
      href: "/provider/deals",
    },
    {
      iconName: "messages",
      label: dict.provider_profile.dashboard.nav.messages,
      href: "/provider/message",
    },
    {
      iconName: "settings",
      label: dict.provider_profile.dashboard.nav.settings,
      href: "/provider/settings",
    },
  ];
};
