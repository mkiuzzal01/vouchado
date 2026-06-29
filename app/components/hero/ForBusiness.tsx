import Container from "../shared/Container";
import bgimage from "@/public/section-headers/Hero Section (5).png";
import Image from "next/image";

export default function ForBusiness() {
  return (
    <div className="relative overflow-hidden  lg:min-h-[500px] h-[300px]">
      <Container>
        <Image
          src={bgimage}
          alt="Background"
          fill
          className="object-cover -z-10"
          priority
        />

        <div className="relative z-10 flex min-h-[300px] lg:min-h-[500px] flex-col items-center justify-center text-center space-y-5 px-6">
          <h1 className="text-2xl md:text-[48px] lg:text-[64px] xl:text-[88px] font-bold text-white leading-[1.15] tracking-tight">
            Launch Deals in{" "}
            <span className="bg-linear-to-r from-[#5ACCD3] to-[#2de2ea] bg-clip-text text-transparent">
              Minutes <br /> AND GROW YOUR BUSINESS
            </span>
          </h1>

          <p className="text-xl md:text-3xl font-semibold text-[#DFE3E8]">
            A Simple, guided flow from setup to redemption. No technical skill
            required.
          </p>
        </div>
      </Container>
    </div>
  );
}
