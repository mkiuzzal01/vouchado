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
  { title: "100% Verified Deals", icon: <Verified size={20} /> },
  { title: "Secure Checkout", icon: <Payment size={20} /> },
  { title: "24/7 Support", icon: <CallSupport size={20} /> },
];

export default function Hero() {
  return (
    <div className="w-full px-4 sm:px-6 md:max-w-[95%] lg:max-w-[90%] mx-auto my-4">
      {/* Main Hero Card Container */}
      <div
        className="relative bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden pt-12 pb-24 md:pb-32 px-6 sm:px-12 lg:px-20"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      >
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left Content Column */}
            <div className="w-full lg:max-w-[55%] z-10 text-left space-y-6">
              {/* Badge */}
              <div>
                <span className="inline-flex px-4 py-1.5 items-center rounded-md bg-white/10 text-xs font-semibold tracking-wider text-white backdrop-blur-sm">
                  YOUR CITY. YOUR DEALS.
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-white tracking-tight">
                  Discover Amazing <br />
                  <span className="text-[#38bdf8]">Local</span> Deals.
                </h1>

                <h4 className="text-lg sm:text-xl font-semibold text-white/90">
                  Save up to 70% on experiences you love.
                </h4>

                <p className="text-sm sm:text-base text-white/75 font-normal max-w-xl leading-relaxed">
                  Find exclusive discounts on restaurants, spas, adventures,
                  beauty treatments, and local activities. New deals added every
                  day!
                </p>
              </div>

              {/* Search Bar Component Wrapper */}
              <div className="w-full max-w-2xl pt-2">
                <ModernSearch buttonClass="text-white font-semibold bg-gradient-to-r from-[#1ec6cc] to-[#2DAEB6] hover:brightness-110 transition-all rounded-full px-6" />
              </div>

              {/* Features List */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-md shadow-sm"
                  >
                    <span className="text-cyan-400">{feature.icon}</span>
                    {feature.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="relative w-full lg:w-[45%] flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
              {/* Floating Circle Offer Badge */}
              <div className="absolute top-4 left-4 sm:left-12 lg:-left-6 z-20 bg-gradient-to-br from-[#1ec6cc]/80 to-[#2DAEB6]/80 backdrop-blur-md border border-white/20 text-white rounded-full w-28 h-28 sm:w-36 sm:h-36 flex flex-col items-center justify-center text-center p-2 shadow-lg animate-fade-in">
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/90">
                  Save Up to
                </span>
                <span className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  70%
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-white/90">
                  Today
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stats Overlay Bottom Section */}
      <div className="relative -mt-12 z-20 px-4 sm:px-8">
        <Stats />
      </div>
    </div>
  );
}
