"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Menu from "../icons/Menu";
import Location from "../icons/Location";
import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";

interface MegaMenuProps {
  lang: string;
  showNavbar: boolean;
  setShowNavbar: (value: boolean) => void;
  navLinks: any;
  services: any;
  menuTitle: string;
  menu: string;
  login: string;
  register: string;
}

export default function MegaMenu({
  lang,
  showNavbar,
  setShowNavbar,
  navLinks,
  services,
  menuTitle,
  menu,
  login,
  register,
}: MegaMenuProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <NavigationMenu className="hidden xl:block w-full">
        <NavigationMenuList className="flex items-center gap-2 xl:gap-1 2xl:gap-8">
          {/* HOME */}
          {/* <NavigationMenuItem>
            <NavigationMenuLink
              href={`/${lang}`}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive(`/${lang}`)
                  ? "bg-gray-200 text-black"
                  : "hover:bg-gray-100"
              }`}
            >
              <Home size={15} />
            </NavigationMenuLink>
          </NavigationMenuItem> */}

          {/* SERVICES */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 xl:gap-1 2xl:gap-2 rounded-full bg-gray-50 border px-4 py-2 xl:px-2 xl:py-1 2xl:py-3 2xl:px-5 2xl:py-2 text-sm xl:text-xs 2xl:text-base font-medium hover:bg-gray-200 transition 2xl:h-auto">
              <Menu className="size-4 lg:size-5 2xl:size-6" />
              {menuTitle}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="bg-white shadow-xl rounded-2xl  p-5 w-fit">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service: any) => (
                  <div key={service.href} className="rounded-xl bg-white p-3">
                    <Link
                      href={service.href}
                      className="block text-md px-2 py-2 font-medium text-gray-900 hover:bg-gray-100 rounded-md"
                    >
                      {service.title}
                    </Link>

                    {service.subMenu?.length && (
                      <div className="mt-2  space-y-1 pl-3">
                        {service.subMenu.map((sub: any) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-2 py-1 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* LINKS */}
          <div className="flex">
            {navLinks.map((item: any) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className={`px-3 xl:px-1.5 2xl:px-3 rounded-none  text-xs lg:text-sm xl:text-xs 2xl:text-base font-medium transition ${
                    isActive(item.href)
                      ? "border-b-2 border-[#2EC4C6] text-black"
                      : "hover:border-b-2 hover:border-[#2EC4C6]"
                  }`}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </div>

          {/* LOCATION */}
          <NavigationMenuItem>
            <Link
              href="/contact"
              className="flex items-center gap-2 xl:gap-1 2xl:gap-2 rounded-full bg-gray-50 border px-4 py-2 xl:px-2 xl:py-1 2xl:px-4 2xl:py-2 text-xs lg:text-sm xl:text-xs 2xl:text-base font-medium hover:bg-gray-200 transition"
            >
              <Location size={15} />
              Berlin, Germany
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* ================= MOBILE (PROFESSIONAL DRAWER STYLE) ================= */}
      {showNavbar && (
        <div className="xl:hidden fixed inset-0 z-50 bg-white p-4 overflow-y-auto">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold pl-4">{menu}</h2>

            <Button
              variant="ghost"
              onClick={() => setShowNavbar(false)}
              className="text-sm px-3 py-1 bg-gray-50 rounded-md"
            >
              <X size={18} />
            </Button>
          </div>

          {/* SERVICES ACCORDION */}
          <Accordion>
            <AccordionItem value="services">
              <AccordionTrigger className="p-3 font-medium">
                {menuTitle}
              </AccordionTrigger>

              <AccordionContent unselectable="on">
                <div className="space-y-3 ml-2 p-4">
                  {services.map((service: any) => (
                    <div key={service.href}>
                      <Link
                        href={service.href}
                        className="block font-semibold text-sm"
                        onClick={() => setShowNavbar(false)}
                      >
                        {service.title}
                      </Link>

                      {service.subMenu?.length && (
                        <div className="ml-3 border-l pl-3 space-y-1 mt-1">
                          {service.subMenu.map((sub: any) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setShowNavbar(false)}
                              className="block text-sm text-gray-600 hover:text-black"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-2">
            {navLinks.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowNavbar(false)}
                className={`px-3 py-2 rounded-md text-sm ${
                  isActive(item.href)
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* LOCATION */}
          <Link
            href="/contact"
            onClick={() => setShowNavbar(false)}
            className="flex items-center gap-2 px-2 lg:px-3 py-2 rounded-md bg-gray-100 text-xs lg:text-sm mt-4"
          >
            <Location size={15} />
            Berlin, Germany
          </Link>

          <div className="mt-4 sm:hidden flex items-center gap-2">
            <Link
              href={`/${lang}/login`}
              className="rounded-full px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
            >
              {login}
            </Link>

            <Link
              href={`/${lang}/registration`}
              className="rounded-full bg-[#2EC4C6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
            >
              {register}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
