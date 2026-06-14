import Link from "next/link";

interface Iprops {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: Iprops) {
  const { lang } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Tabs */}
      <nav className="border-b">
        <div className="flex gap-4 p-4">
          <Link href={`/${lang}/provider/profile`}>Profile</Link>
          <Link href={`/${lang}/provider/settings`}>Settings</Link>
        </div>
      </nav>

      {/* Bottom Content (Nested Pages) */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
