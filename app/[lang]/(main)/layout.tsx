import TopBar from "@/app/components/layouts/TopBar";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";
import { getDictionary } from "../dictionaries";
import {
  footerLinks,
  getNavLinks,
  getServices,
} from "@/app/components/layouts/navigationLinks";
import {
  getSocialLinks,
  getSystemInfo,
} from "@/actions/quires/system_info.api";
import { getBusniessProfile } from "@/actions/quires/user.api";

interface RootLayout {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function layout({ children, params }: RootLayout) {
  const { lang } = await params;
  const nav = await getDictionary(lang);
  const navLinks = await getNavLinks(lang);
  const services = await getServices(lang);
  const footerLinksData = await footerLinks(lang);
  const socialLinks = await getSocialLinks();
  const systemInfo = await getSystemInfo();

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar content={nav.top} />
      <Navbar
        lang={lang}
        login={nav.auth.login.login}
        register={nav.auth.register.register}
        menu={nav.nav.mobile_menu}
        navLinks={navLinks}
        services={services}
        menuTitle={nav.nav.category}
      />
      <main className="flex-1">{children}</main>
      <Footer
        footerLinks={footerLinksData}
        socialLinks={socialLinks}
        systemInfo={systemInfo}
      />
    </div>
  );
}
