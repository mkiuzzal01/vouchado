import { ReactNode } from "react";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";
import mastercard from "@/public/payment/mastercard.png";
import trustpilot from "@/public/payment/trustplot.png";
import paypal from "@/public/payment/paypal.png";
import visa from "@/public/payment/visa.png";
import Image, { StaticImageData } from "next/image";
import CustomerService from "../icons/CustomerService";
import PaymentIcon from "../icons/PaymentIcon";
import ReviewsIcon from "../icons/ReviewsIcon";
import { getDictionary } from "@/app/[lang]/dictionaries";

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
    <div className="w-full flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
        {icon}
      </div>

      <div>
        <h3 className="text-lg lg:text-xl font-bold text-[#212B36]">{title}</h3>
        <p className="text-sm text-[#637381]">{subtitle}</p>
      </div>
    </div>
  );
}

function BrandCard({ icon, id }: Brand) {
  return (
    <div className="flex w-full h-24 items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative w-full h-full max-w-[120px]">
        <Image
          src={icon}
          alt={`${id} brand logo`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 150px"
        />
      </div>
    </div>
  );
}

interface Props {
  t?: Awaited<ReturnType<typeof getDictionary>>;
}

export default function Trusted({ t }: Props) {
  const trustFeatures: Feature[] = [
    {
      id: "reviews",
      title: t?.home?.trusted?.reviews?.title || "4.8/5 Rating",
      subtitle:
        t?.home?.trusted?.reviews?.subtitle || "Based on 12,500+ reviews",
      icon: <ReviewsIcon size={48} />,
    },
    {
      id: "payments",
      title: t?.home?.trusted?.payments?.title || "Secure Payments",
      subtitle:
        t?.home?.trusted?.payments?.subtitle || "100% protected transactions",
      icon: <PaymentIcon size={48} />,
    },
    {
      id: "support",
      title: t?.home?.trusted?.support?.title || "24/7 Support",
      subtitle:
        t?.home?.trusted?.support?.subtitle || "We're always here to help",
      icon: <CustomerService size={48} />,
    },
  ];

  return (
    <Container>
      <section className="py-10">
        <SectionHeader
          title={
            t?.home?.trusted?.title || "Trusted by the best and loved by all"
          }
        />

        {/* Main responsive wrapper */}
        <div className="flex flex-col xl:flex-row gap-6 mt-8 w-full">
          {/* Trust Features Grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-full xl:w-[60%]">
            {trustFeatures.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>

          {/* Brand Logos Grid */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 w-full xl:w-[40%]">
            {BRAND_LOGOS.map((brand) => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
