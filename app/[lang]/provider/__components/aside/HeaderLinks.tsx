import Dasboard from "@/app/components/icons/Dasboard";
import DealIcon from "@/app/components/icons/DealIcon";
import MessageIcon from "@/app/components/icons/MessageIcon";
import Settings from "@/app/components/icons/Settings";

export interface IProviderNavItem {
  icon: React.FC<{ size: number; color: string }>;
  label: string;
  href: string;
}

export const providerNavItems: IProviderNavItem[] = [
  {
    icon: Dasboard,
    label: "Dashboard",
    href: "/provider",
  },
  {
    icon: DealIcon,
    label: "Deals",
    href: "/provider/deals",
  },
  {
    icon: MessageIcon,
    label: "Messages",
    href: "/provider/message",
  },

  {
    icon: Settings,
    label: "Settings",
    href: "/provider/settings",
  },
];
