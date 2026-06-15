import TopBar from "@/app/components/layouts/TopBar";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";
import { getDictionary } from "../dictionaries";
import {
  getNavLinks,
  getServices,
} from "@/app/components/layouts/navigationLinks";

interface RootLayout {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function layout({ children, params }: RootLayout) {
  const { lang } = await params;
  const nav = await getDictionary(lang);
  const navLinks = await getNavLinks(lang);
  const services = await getServices(lang);
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar content={nav.top} />
      <Navbar
        navLinks={navLinks}
        services={services}
        menuTitle={nav.nav.services}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
