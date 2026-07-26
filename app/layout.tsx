import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./components/providers/ReduxProvider";
import { cn } from "@/lib/utils";
import FaviconProvider from "./components/providers/FaviconProvider";
import { getSystemInfo } from "@/actions/quires/system_info.api";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vouchado",
  description: "The local service marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const systemInfo = await getSystemInfo();

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.className,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <FaviconProvider systemInfo={systemInfo?.data} />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
