import { ReactNode } from "react";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";
import mastercard from "@/public/payment/mastercard.png";
import trustpilot from "@/public/payment/trustplot.png";
import paypal from "@/public/payment/paypal.png";
import visa from "@/public/payment/visa.png";
import Image, { StaticImageData } from "next/image";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

interface Brand {
  id: string;
  icon: StaticImageData;
}

const TRUST_FEATURES: Feature[] = [
  {
    id: "reviews",
    title: "4.8/5 Rating",
    subtitle: "Based on 12,500+ reviews",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "payments",
    title: "Secure Payments",
    subtitle: "100% protected transactions",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "24/7 Support",
    subtitle: "We're always here to help",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const BRAND_LOGOS: Brand[] = [
  {
    id: "trustpilot",
    icon: trustpilot,
  },
  {
    id: "visa",
    icon: visa,
  },
  {
    id: "paypal",
    icon: paypal,
  },
  {
    id: "mastercard",
    icon: mastercard,
  },
];

function FeatureCard({ icon, title, subtitle }: Feature) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function BrandCard({ icon }: Brand) {
  return (
    <div className="flex relative h-24 items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Image
        width={100}
        height={100}
        src={icon}
        alt="brand"
        className="object-contain"
      />
    </div>
  );
}

export default function Trusted() {
  return (
    <Container>
      <section className="py-5">
        <SectionHeader title="Trusted by the best and loved by all" />
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="grid gap-4 md:grid-cols-3 w-full">
            {TRUST_FEATURES.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
            {BRAND_LOGOS.map((brand) => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
