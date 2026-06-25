import Container from "@/app/components/shared/Container";
import Link from "next/link";

interface props {
  lang: string;
}

export default function PromoContact({ lang }: props) {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-8">
      <Container>
        {/* --- LIGHT TEAL CONTAINER POD --- */}
        <div className="w-full rounded-[24px] bg-[#EAF5F6] border border-[#2DE2EA] px-8 py-10 md:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-sm">
          {/* LEFT CONTENT BLOCK: Headings & Text */}
          <div className="space-y-3 text-left max-w-3xl">
            <h2 className="text-2xl font-semibold  sm:text-3xl md:text-[34px]  text-[#0E6A70]">
              Grow Your Business with VOUCHADO
            </h2>
            <p className="text-[#4A6B6C] max-w-2xl">
              Join 300+ businesses already using our platform to reach new
              customers, fill empty capacity, and increase revenue with zero
              upfront costs.
            </p>
          </div>

          {/* RIGHT CONTENT BLOCK: Button & Trust Avatars Stack */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-start gap-5 shrink-0">
            {/* Primary Action Button */}
            <Link href={`/${lang}/provider-login`}>
              <button className="bg-[#2BC4CA] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-[#23AAB0] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#2BC4CA]/10 whitespace-nowrap min-w-[180px] text-center">
                Partner With us
              </button>
            </Link>

            {/* Social Proof Trust Layer */}
            <div className="flex items-center gap-3">
              {/* Overlapping Avatar Group Stack */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#EAF5F6] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Vouchado partner business owner avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#EAF5F6] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Vouchado partner business owner avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#EAF5F6] object-cover"
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
                  alt="Vouchado partner business owner avatar"
                />
              </div>

              {/* Text Descriptor Label */}
              <p className="text-xs sm:text-[13px] text-[#4A6B6C] font-semibold leading-tight text-left">
                300+ partners <br /> trust us
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
