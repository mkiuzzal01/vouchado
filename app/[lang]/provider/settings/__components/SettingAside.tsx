"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingAsideProps {
  lang: string;
}

export default function SettingAside({ lang }: SettingAsideProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Analytics", href: `/${lang}/provider/settings` },
    { name: "Payment Information", href: `/${lang}/provider/settings/payment` },
    { name: "Notifications", href: `/${lang}/provider/settings/notifications` },
    {
      name: "Change Password",
      href: `/${lang}/provider/settings/change-password`,
    },
    {
      name: "Account Activation",
      href: `/${lang}/provider/settings/activation`,
    },
    { name: "Terms & Conditions", href: `/${lang}/provider/settings/terms` },
  ];

  return (
    <aside className="sticky top-28 flex flex-col gap-2 w-full bg-white p-4 rounded-xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              isActive
                ? "bg-[#29b6be] text-white shadow-sm"
                : "bg-gray-50/70 text-gray-600 hover:bg-gray-100/60 hover:text-gray-900"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </aside>
  );
}
