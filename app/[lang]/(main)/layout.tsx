import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";

interface RootLayout {
  children: React.ReactNode;
}

export default function layout({ children }: RootLayout) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
