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

import { navigationLinks, services } from "./navigationLinks";
import Menu from "../icons/Menu";
import Location from "../icons/Location";

export default function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {/* SERVICES DROPDOWN */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 font-medium hover:bg-gray-200 transition cursor-pointer">
            <Menu size={15} />
            Services
          </NavigationMenuTrigger>

          <NavigationMenuContent className="bg-white">
            <div className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.href} className="space-y-2">
                  {/* Main Service */}
                  <Link
                    href={service.href}
                    className="block rounded-md p-2 font-semibold hover:bg-muted"
                  >
                    {service.title}
                  </Link>

                  {/* Sub Services */}
                  <div className="ml-2 space-y-1 border-l pl-3">
                    {service.subMenu?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block rounded-md p-2 text-sm text-muted-foreground hover:bg-muted hover:text-black"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* STATIC LINKS (Home, About, Contact) */}
        {navigationLinks.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link href={item.href}>
              <NavigationMenuLink className="px-4 py-2 font-medium">
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem className="rounded-full bg-gray-100 px-4 py-2 font-medium hover:bg-gray-200 transition cursor-pointer">
          <Link href="/contact" className="flex items-center gap-2">
            <Location size={15} />
            Berlin, Germany
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
