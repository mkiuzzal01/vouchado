import BusineesInfoForm from "@/app/components/forms/BusineesInfoForm";
import Image from "next/image";
import readyGrowIcon from "@/public/business/home.png";
import Container from "@/app/components/shared/Container";
import { CheckCircle2 } from "lucide-react";

interface Props {
  lang: string;
}

export default function CreateBusiness({ lang }: Props) {
  const features = [
    "Museum admission",
    "All permanent exhibits",
    "Interactive experiences",
    "Digital guide",
  ];

  return (
    <Container>
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
        <div className="flex flex-col w-full gap-y-4">
          {/* Next.js Optimized Asset Container */}
          <div className="flex items-center gap-x-4">
            <div className="shrink-0 flex items-center justify-center select-none pointer-events-none">
              <Image
                src={readyGrowIcon}
                alt="Vouchado grow your business storefront icon"
                width={112}
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
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-base font-medium text-white/90"
              >
                <CheckCircle2 className="w-5 h-5 text-[#29b6be] fill-[#0c4d52] shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE: Action Buttons Block */}
        <div className="bg-white p-6 w-full md:w-full lg:w-4/5 rounded-xl">
          {/* Primary Action Button */}
          <BusineesInfoForm lang={lang} />
        </div>
      </div>
    </Container>
  );
}
