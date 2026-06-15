import TopBar from "@/app/components/layouts/TopBar";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";

interface RootLayout {
  children: React.ReactNode;
}

export default function layout({ children }: RootLayout) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
