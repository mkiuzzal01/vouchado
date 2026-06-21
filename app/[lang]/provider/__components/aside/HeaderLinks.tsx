import {
  LucideIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Briefcase,
} from "lucide-react";

export interface IProviderNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const providerNavItems: IProviderNavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/provider/dashboard",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "/provider/message",
  },
  {
    icon: Briefcase,
    label: "Services",
    href: "/provider/services",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/provider/settings",
  },
];
