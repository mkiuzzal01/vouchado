import heroBg from "@/public/hero/hero.png";

import Container from "../shared/Container";
import Stats from "../utils/Stats";
import ModernSearch from "../forms/quires/ModernSearch";

const FEATURES = ["100% Verified Deals", "Secure Checkout", "24/7 Support"];

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <Container>
        <div className="relative z-10 flex min-h-[60vh] md:min-h-[70vh] items-center pt-4">
          <div className="w-full max-w-3xl space-y-5 sm:space-y-6 text-center md:text-left">
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
            <h4 className="text-base sm:text-lg font-medium text-white/90">
              Save up to 70% on experiences you love.
            </h4>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/70">
              Find exclusive discounts on restaurants, spas, adventures, beauty
              treatments, and local activities.
            </p>

            {/* ================= MODERN SEARCH ================= */}
            <ModernSearch />

            {/* Features */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 py-4">
              {FEATURES.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] sm:text-xs text-white backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Stats />
    </section>
  );
}
