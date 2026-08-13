import Container from "@/app/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import contactImage from "@/public/hero/Contact us 2.png";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProgrssIcon from "../icons/ProgrssIcon";

interface Props {
  lang: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function PromoContact({ lang, t }: Props) {
  const bannerData = t?.contact?.promotional_banner;

  const partnerAvatars = [
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      alt: "Vouchado partner business owner avatar female",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      alt: "Vouchado partner business owner avatar male",
    },
    {
      src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80",
      alt: "Vouchado partner business owner avatar executive",
    },
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="flex flex-col gap-8 md:gap-10">
          {/* --- LIGHT TEAL PROMO BANNER POD --- */}
          <div className="w-full rounded-[24px] bg-[#EAF5F6] border border-[#2DE2EA]/60 p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-sm">
            {/* LEFT CONTENT BLOCK: Icon, Title & Highlighted Text */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 max-w-4xl">
              <div className="shrink-0 flex items-center justify-center gap-4 bg-[#DCEEF0] p-3.5 sm:p-4 rounded-full">
                <ProgrssIcon />
              </div>

              <div className="space-y-2 text-left">
                <h2 className="text-2xl font-bold sm:text-3xl md:text-[32px] text-[#073A3F] tracking-tight leading-snug">
                  {bannerData?.title_1 || "Lass dein Business mit"}{" "}
                  <span className="text-[#1EC6CC] uppercase">
                    {bannerData?.title_highlight || "VOUCHADO"}
                  </span>{" "}
                  {bannerData?.title_2 || "wachsen"}
                </h2>

                <p className="text-sm sm:text-base text-[#4A6B6C] leading-relaxed">
                  {bannerData?.desc_1 || "Bereits"}{" "}
                  <span className="font-bold text-[#073A3F]">
                    {bannerData?.desc_highlight || "über 300 Unternehmen"}
                  </span>{" "}
                  {bannerData?.desc_2 ||
                    "nutzen unsere Plattform, um neue Kunden zu gewinnen, freie Kapazitäten zu füllen und ihren Umsatz zu steigern – ganz ohne Vorabkosten."}
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT BLOCK: Primary CTA & Trust Proof */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-start gap-4 shrink-0">
              {/* Primary Action Link */}
              <Link
                href={`/${lang}/provider-login`}
                className="w-full sm:w-auto bg-[#1EC6CC] hover:bg-[#19b1b7] active:scale-[0.98] text-white font-bold text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-md shadow-[#1EC6CC]/20 whitespace-nowrap text-center block"
              >
                {bannerData?.cta_primary || "Jetzt Partner werden"}
              </Link>

              {/* Social Proof Trust Layer */}
              <div className="flex items-center gap-3">
                {/* Overlapping Avatar Stack */}
                <div className="flex -space-x-2.5 overflow-hidden">
                  {partnerAvatars.map((avatar, index) => (
                    <Image
                      key={index}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#EAF5F6] object-cover"
                      src={avatar.src}
                      alt={avatar.alt}
                      width={32}
                      height={32}
                    />
                  ))}
                </div>

                {/* Trust Descriptor Label */}
                <p className="text-xs sm:text-[13px] text-[#4A6B6C] font-semibold leading-tight text-left">
                  {bannerData?.partner_trust || "300+ Partner vertrauen uns"}
                </p>
              </div>
            </div>
          </div>

          {/* --- CONTACT ILLUSTRATION SHOWCASE POD --- */}
          <div className="relative w-full rounded-[32px] bg-[#DFE3E8]/40 border border-slate-100 p-4 sm:p-8 md:p-12 overflow-hidden flex items-center justify-center shadow-sm min-h-[380px] sm:min-h-[500px] lg:min-h-[580px]">
            <div className="relative w-full h-full max-w-5xl min-h-[340px] sm:min-h-[460px] lg:min-h-[540px]">
              <Image
                src={contactImage}
                alt="Vouchado contact us 3D mockup illustration"
                priority
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
