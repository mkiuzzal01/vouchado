import React from "react";
import Container from "../shared/Container";
import bgimage from "@/public/section-headers/Hero Section (5).png";

export interface CategoryPill {
  label: string;
  iconPath: React.ReactNode;
}

export default function ForBusiness() {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#0f545a] via-[#0d595f] to-[#0c4044] pt-20 pb-12 px-4 sm:px-8 overflow-hidden flex flex-col items-center">
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff12_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-75"
        style={{
          backgroundImage: `url(${bgimage.src})`,
        }}
      />

      <Container>
        <div className="text-center space-y-5 mb-10">
          <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
            Launch Deals in{" "}
            <span className="bg-gradient-to-r from-[#5ACCD3] to-[#2de2ea] bg-clip-text text-transparent">
              Minutes <br /> AND GROW YOUR BUSINESS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/80 text-base sm:text-lg font-light leading-relaxed tracking-wide">
            A Simple, guided flow from setup to redemption. No technical skill
            required.
          </p>
        </div>
      </Container>
    </div>
  );
}
