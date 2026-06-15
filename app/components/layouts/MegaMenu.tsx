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

interface MegaMenuProps {
  showNavbar: boolean;
  setShowNavbar: (value: boolean) => void;
  navLinks: any;
  services: any;
  menuTitle: string;
}

export default function MegaMenu({
  showNavbar,
  setShowNavbar,
  navLinks,
  services,
  menuTitle,
}: MegaMenuProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <NavigationMenu className="hidden md:block w-full">
        <NavigationMenuList className="flex items-center gap-2">
          {/* SERVICES */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition">
              <Menu size={15} />
              {menuTitle}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="bg-white shadow-xl rounded-2xl  p-5 w-[min(95vw,650px)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service: any) => (
                  <div key={service.href} className="rounded-xl bg-gray-50 p-3">
                    <Link
                      href={service.href}
                      className="block px-2 py-2 font-semibold text-gray-900 hover:bg-gray-100 rounded-md"
                    >
                      {service.title}
                    </Link>

                    {service.subMenu?.length && (
                      <div className="mt-2 ml-2 space-y-1 border-l pl-3">
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
          {navLinks.map((item: any) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive(item.href)
                      ? "bg-gray-200 text-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          {/* LOCATION */}
          <NavigationMenuItem>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition"
            >
              <Location size={15} />
              Berlin, Germany
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* ================= MOBILE (PROFESSIONAL DRAWER STYLE) ================= */}
      {showNavbar && (
        <div className="md:hidden fixed inset-0 z-50 bg-white p-4 overflow-y-auto">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>

            <button
              onClick={() => setShowNavbar(false)}
              className="text-sm px-3 py-1 bg-gray-100 rounded-md"
            >
              Close
            </button>
          </div>

          {/* SERVICES ACCORDION */}
          <Accordion>
            <AccordionItem value="services">
              <AccordionTrigger className="text-sm font-medium"></AccordionTrigger>

              <AccordionContent>
                <div className="space-y-3 ml-2">
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
          <div className="mt-4 flex flex-col gap-2">
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
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-sm mt-4"
          >
            <Location size={15} />
            Berlin, Germany
          </Link>
        </div>
      )}
    </>
  );
}
