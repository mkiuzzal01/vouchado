import heroBg from "@/public/hero/hero.png";
import Container from "../shared/Container";
import Stats from "../utils/Stats";
import ModernSearch from "../forms/quires/ModernSearch";
import Verified from "../icons/Verified";
import CallSupport from "../icons/CallSupport";
import Payment from "../icons/Payment";
import hero from "@/public/hero/Offer.png";
import Image from "next/image";

const FEATURES = [
  { title: "100% Verified Deals", icon: <Verified size={24} /> },
  { title: "Secure Checkout", icon: <Payment size={24} /> },
  { title: "24/7 Support", icon: <CallSupport size={24} /> },
];

export default function Hero() {
  return (
    <div className="w-full md:max-w-[90%] mx-auto">
      <div
        className="relative bg-cover bg-top bg-no-repeat md:rounded-2xl"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      >
        <Container>
          <div className="flex flex-col-reverse md:flex-row">
            <div className="relative z-10 flex min-h-[60vh] md:min-h-[70vh] items-center pt-4">
              <div className="w-full max-w-3xl space-y-1 sm:space-y-3 text-center md:text-left">
                {/* Badge */}
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] sm:text-xs text-white backdrop-blur">
                  YOUR CITY. YOUR DEALS.
                </span>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
                  Discover Amazing <br />
                  <span className="text-cyan-400">Local</span> Deals.
                </h1>

                {/* Subheading */}
                <h4 className="text-base sm:text-lg font-medium text-white">
                  Save up to 70% on experiences you love.
                </h4>

                {/* Description */}
                <p className="text-white/80">
                  Find exclusive discounts on restaurants, spas, adventures,
                  beauty <br />
                  treatments, and local activities. New deals added every day!
                </p>

                <ModernSearch buttonClass="text-white font-semibold bg-[#1ec6cc] hover:bg-[#1ec6cc]/90" />

                {/* Features */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 py-4">
                  {FEATURES.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] sm:text-xs text-white backdrop-blur"
                    >
                      {feature.icon}
                      {feature.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative mt-40 left-40 md:left-70 md:top-25 lg:top-0 z-10">
              <Image
                className="h-15 w-15 md:h-40 md:w-40"
                src={hero}
                alt="hero"
              />
            </div>
          </div>
        </Container>
        <Stats />
      </div>
    </div>
  );
}
