import Container from "@/app/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import contactImage from "@/public/hero/Contact us 2.png";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProgrssIcon from "../icons/ProgrssIcon";

interface props {
  lang: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function PromoContact({ lang, t }: props) {
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
          <div className="w-full rounded-[24px] bg-[#EAF5F6] border border-[#2DE2EA]/60 px-6 sm:px-10 py-8 md:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between shadow-sm">
            {/* LEFT CONTENT BLOCK: Headings & Text */}
            <div className="flex items-start gap-[70px]">
              <div className="flex items-center gap-4 bg-[#DCEEF0] p-4 rounded-full">
                <ProgrssIcon />
              </div>
              <div className="space-y-2.5 text-left max-w-4xl">
                <h2 className="text-2xl font-bold sm:text-3xl md:text-[32px] text-[#0E6A70] tracking-tight leading-snug">
                  {t.contact.promotional_banner.title}
                </h2>
                <p className="text-sm sm:text-base text-[#4A6B6C] leading-relaxed">
                  {t.contact.promotional_banner.description_1}{" "}
                  <span className="font-bold text-[#0E6A70]">
                    {" "}
                    {t.contact.promotional_banner.description_2}
                  </span>{" "}
                  {t.contact.promotional_banner.description_3}{" "}
                  {t.contact.promotional_banner.description_4}
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT BLOCK: Action Button & Social Proof */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-start gap-4 shrink-0">
              {/* Primary Action Button */}
              <Link
                href={`/${lang}/provider-login`}
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto bg-[#2BC4CA] hover:bg-[#23AAB0] active:scale-[0.98] text-white font-bold text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-md shadow-[#2BC4CA]/20 whitespace-nowrap text-center">
                  {t.contact.promotional_banner.cta_primary}
                </button>
              </Link>

              {/* Social Proof Trust Layer */}
              <div className="flex items-center gap-3">
                {/* Overlapping Avatar Group Stack */}
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

                {/* Text Descriptor Label */}
                <p className="text-xs sm:text-[13px] text-[#4A6B6C] font-semibold leading-tight text-left">
                  {t.contact.promotional_banner.description_5}
                </p>
              </div>
            </div>
          </div>

          {/* --- CONTACT ILLUSTRATION SHOWCASE POD --- */}
          <div className="relative w-full rounded-[32px] bg-[##DFE3E8] border border-slate-100 p-4 sm:p-8 md:p-12 overflow-hidden flex items-center justify-center shadow-sm min-h-[380px] sm:min-h-[500px] lg:min-h-[580px]">
            <div className="relative w-full h-full max-w-5xl min-h-[340px] sm:min-h-[460px] lg:min-h-[540px]">
              <Image
                src={contactImage}
                alt="Vouchado contact us 3D mobile mockup with customer support elements"
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
