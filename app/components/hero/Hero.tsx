import Link from "next/link";
import heroBg from "@/public/hero/hero.png";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "../shared/Container";
import Location from "../icons/Location";

const FEATURES = ["100% Verified Deals", "Secure Checkout", "24/7 Support"];

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20 md:py-28"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <Container>
        <div className="relative z-10 flex min-h-[60vh] md:min-h-[70vh] items-center">
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
            <div className="mt-6 sm:mt-8">
              {/* Mobile: Card style search */}
              <div className="flex flex-col gap-2 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur-md md:hidden">
                {/* Location */}
                <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2">
                  <Location />
                  <input
                    type="text"
                    placeholder="Your location"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search services"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                {/* Button */}
                <Button className="h-11 w-full rounded-xl bg-cyan-500 hover:bg-cyan-600">
                  Search
                </Button>
              </div>

              {/* Desktop: original style */}
              <div className="hidden md:flex w-full overflow-hidden rounded-full bg-white shadow-lg">
                <div className="flex items-center gap-2 border-r px-4 py-3 w-full">
                  <Location />
                  <input
                    type="text"
                    placeholder="Search your location"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-4 py-3 w-full">
                  <Search className="h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search category or service"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <Button className="h-12 rounded-none rounded-r-full bg-cyan-500 px-6 hover:bg-cyan-600">
                  Search
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-5 sm:pt-6">
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
    </section>
  );
}
