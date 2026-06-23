import { ReactNode } from "react";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

interface Brand {
  id: string;
  content: ReactNode;
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
    content: (
      <div className="flex items-center gap-2 font-bold text-slate-800">
        <svg
          className="h-6 w-6 text-[#00b67a]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span>Trustpilot</span>
      </div>
    ),
  },
  {
    id: "visa",
    content: (
      <span className="text-2xl font-black italic tracking-tight text-[#1a1f71]">
        VISA
      </span>
    ),
  },
  {
    id: "paypal",
    content: (
      <div className="text-xl font-black italic">
        <span className="text-[#00457c]">Pay</span>
        <span className="text-[#0079c1]">Pal</span>
      </div>
    ),
  },
  {
    id: "mastercard",
    content: (
      <div className="flex flex-col items-center">
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full bg-[#EB001B]" />
          <div className="h-6 w-6 rounded-full bg-[#F79E1B]" />
        </div>
        <span className="mt-1 text-[10px] font-medium text-slate-500">
          mastercard
        </span>
      </div>
    ),
  },
];

function FeatureCard({ icon, title, subtitle }: Feature) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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

function BrandCard({ content }: Brand) {
  return (
    <div className="flex h-24 items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {content}
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
