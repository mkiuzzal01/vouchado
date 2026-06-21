import React from "react";
import Header from "./__components/aside/Header";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Header lang={lang} />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
