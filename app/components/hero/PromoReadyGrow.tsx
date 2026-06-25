import Image from "next/image";
import Container from "@/app/components/shared/Container";
import readyGrowIcon from "@/public/business/home.png";
import Link from "next/link";

interface Props {
  lang: string;
}

export default function PromoReadyGrow({ lang }: Props) {
  return (
    <Container className="py-4">
      {/* --- DEEP TEAL POD BANNER --- */}
      <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0c4d52] via-[#0b5157] to-[#062d30] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/5">
        {/* 1. Halftone Dot Texture Layer in Top-Right Corner */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(circle at top right, white, transparent 55%)",
            WebkitMaskImage:
              "radial-gradient(circle at top right, white, transparent 55%)",
          }}
        />

        {/* LEFT SIDE: Integrated Image Asset & Typography Block */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8 max-w-3xl relative z-10 w-full">
          {/* Next.js Optimized Asset Container */}
          <div className="shrink-0 p-1 border border-gray-500 rounded-full flex items-center justify-center select-none pointer-events-none">
            <Image
              src={readyGrowIcon}
              alt="Vouchado grow your business storefront icon"
              width={112} // Matches mock visual density scale
              height={112}
              quality={90}
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
          </div>

          {/* Typography Wrapper */}
          <div className="space-y-3 mt-1 sm:mt-2">
            <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-white tracking-tight leading-[1.15]">
              Ready to grow your <br className="hidden md:inline" /> business?
            </h2>
            <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Join local businesses using Vouchado to attract customers, fill
              unused capacity, and generate additional revenue.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Action Buttons Block */}
        <div className="flex flex-col gap-3.5 w-full sm:w-auto shrink-0 relative z-10">
          {/* Primary Action Button */}
          <Link href={`/${lang}/provider`}>
            <button className="bg-linear-to-r from-[#5ACCD3] to-[#1bb6be] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-2 group whitespace-nowrap">
              <span>Become a Partner</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </Link>

          {/* Secondary Action Button */}
          <Link
            href={`/${lang}/contact`}
            className="border border-white/50 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 active:scale-[0.98] transition-all duration-200 whitespace-nowrap text-center"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </Container>
  );
}
