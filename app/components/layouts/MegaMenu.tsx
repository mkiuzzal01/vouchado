"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const providerItems = [
  {
    title: "Dashboard",
    href: "/provider/provider-dashboard",
    description: "Manage your provider dashboard.",
  },
  {
    title: "Orders",
    href: "/provider/orders",
    description: "View and manage orders.",
  },
  {
    title: "Settings",
    href: "/provider/settings",
    description: "Update your account settings.",
  },
];

const userItems = [
  {
    title: "Dashboard",
    href: "/user/user-dashboard",
    description: "Access your dashboard.",
  },
  {
    title: "Profile",
    href: "/user/profile",
    description: "Manage your profile.",
  },
  {
    title: "Subscriptions",
    href: "/user/subscription",
    description: "View your subscriptions.",
  },
];

export default function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2 font-medium">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Provider */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Provider</NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="grid w-[500px] grid-cols-2 gap-4 p-6">
              {providerItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md p-3 hover:bg-muted"
                >
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* User */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>User</NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="grid w-[500px] grid-cols-2 gap-4 p-6">
              {userItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md p-3 hover:bg-muted"
                >
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2 font-medium">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
