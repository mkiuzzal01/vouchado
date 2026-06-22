import {
  LucideIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
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
    href: "/provider",
  },
  {
    icon: ShoppingBag,
    label: "Deals",
    href: "/provider/deals",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "/provider/message",
  },

  {
    icon: Settings,
    label: "Settings",
    href: "/provider/settings",
  },
];
