import TopBar from "@/app/components/layouts/TopBar";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";
import { getDictionary } from "../dictionaries";
import { cookies } from "next/headers";
import {
  footerLinks,
  getNavLinks,
  getServices,
} from "@/app/components/layouts/navigationLinks";
import {
  getSocialLinks,
  getSystemInfo,
} from "@/actions/quires/system_info.api";
import { getBusniessProfile, getUserProfile } from "@/actions/quires/user.api";

interface RootLayout {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function layout({ children, params }: RootLayout) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("vuchado_token")?.value;

  const t = await getDictionary(lang);

  const navLinks = await getNavLinks(lang);
  const services = await getServices(lang);
  const footerLink = await footerLinks(lang);
  const socialLinks = await getSocialLinks();
  const systemInfo = await getSystemInfo();

  let userInfo = null;
  let providerInfo = null;

  if (token) {
    const [userResult, providerResult] = await Promise.allSettled([
      getUserProfile(),
      getBusniessProfile(),
    ]);

    if (userResult.status === "fulfilled") {
      userInfo = userResult.value;
    }

    if (providerResult.status === "fulfilled") {
      providerInfo = providerResult.value;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar content={t?.layout?.top} />
      <Navbar
        t={t}
        systemInfo={systemInfo}
        provider_info={providerInfo}
        user_info={userInfo}
        lang={lang}
        navLinks={navLinks}
        services={services}
      />
      <main className="flex-1">{children}</main>
      <Footer
        t={t}
        footerLinks={footerLink}
        socialLinks={socialLinks}
        systemInfo={systemInfo}
      />
    </div>
  );
}
