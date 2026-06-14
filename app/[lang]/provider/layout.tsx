import Link from "next/link";
import {
  IProviderNavItem,
  providerNavItems,
} from "./__components/aside/AsideLinks";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Tabs */}
      <nav className="flex justify-center items-center border-b bg-white">
        <div className="flex gap-3 p-4">
          {providerNavItems.map((item: IProviderNavItem) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 transition hover:text-blue-600 hover:bg-gray-100"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
