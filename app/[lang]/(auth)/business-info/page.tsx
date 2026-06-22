import BusineesInfoForm from "@/app/components/forms/BusineesInfoForm";
import Container from "@/app/components/shared/Container";
import img from "@/public/business/Rectangle 38.png";
import Image from "next/image";

export default function page() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* ================= LEFT IMAGE ================= */}
          <div className="hidden md:flex items-center justify-center bg-slate-50 relative min-h-[600px] h-full">
            <Image
              src={img}
              alt="Business onboarding background"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <BusineesInfoForm lang="en" />
          </div>
        </div>
      </div>
    </Container>
  );
}
