"use client";

import React from "react";
import Image from "next/image";
import howToWork from "@/public/howToWork/Question.png";
import Container from "../shared/Container";

export default function HowtoWorkBanner() {
  return (
    <div className="relative w-full bg-[#169a9fff] overflow-hidden min-h-[160px] sm:min-h-[200px] md:min-h-[220px] flex items-center">
      <Container>
        {/* --- Left Side: Dynamic Text & Breadcrumbs --- */}
        <div className="relative z-10 py-8 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2.5">
            How it works
          </h1>
          <p className="text-white text-sm  md:text-base lg:text-lg font-medium">
            Discover how Vouchado brings you closer to unforgettable local
            experiences while helping you save money.
          </p>
        </div>

        {/* --- Right Side: Question Mark Graphic --- */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 max-w-[280px] md:max-w-[340px] h-full pointer-events-none z-0 select-none">
          <Image
            src={howToWork}
            alt="How it works illustration"
            fill
            priority
            quality={100}
            className="object-contain object-right-bottom translate-y-1 lg:translate-y-2 scale-[1.05]"
          />
        </div>
      </Container>
    </div>
  );
}
