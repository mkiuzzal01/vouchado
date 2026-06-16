import Image from "next/image";
import Container from "../shared/Container";

export interface StatItem {
  value: string;
  label: string;
}

export interface PromoBannerProps {
  title?: string;
  brandName?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
  stats?: StatItem[];
}

export default function PromoBanner({
  title = "Grow Your Business with",
  brandName = "VOUCHADO",
  description = "Join 300+ local businesses and reach thousands of new customers",
  ctaText = "Partner With us",
  onCtaClick,
  imageUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  stats = [
    { value: "300+", label: "Partner Businesses" },
    { value: "50k+", label: "Active Customers" },
    { value: "2M+", label: "Deals Redeemed" },
  ],
}: PromoBannerProps) {
  return (
    <Container className="py-6">
      <section className="w-full  overflow-hidden rounded-3xl bg-[#135d66] text-white shadow-xl">
        <div className="relative flex flex-col md:flex-row min-h-[360px]">
          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full md:w-[45%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold leading-tight">
              {title}
              <span className="block font-black mt-1">{brandName}</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white/80 max-w-md">
              {description}
            </p>

            <button
              onClick={onCtaClick}
              className="mt-6 w-fit bg-white text-[#135d66] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition active:scale-95"
            >
              {ctaText}
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full md:w-[55%] h-[260px] md:h-auto">
            {/* Image */}
            <Image
              src={imageUrl}
              alt="Promo banner"
              fill
              priority
              className="object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-black/20" />

            {/* Stats */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center md:justify-end">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-center min-w-[110px]"
                >
                  <div className="text-lg sm:text-xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
