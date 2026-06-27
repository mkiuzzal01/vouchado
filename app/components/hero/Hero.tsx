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
    <div className="w-full xl:max-w-[95%] 2xl:max-w-[90%] mx-auto mt-4 sm:mt-6">
      <div className="relative rounded-2xl md:rounded-[32px] flex flex-col justify-between shadow-2xl min-h-[75vh]">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-[32px] overflow-hidden">
          <Image 
            src={heroBg.src} 
            alt="home banner image" 
            fill 
            className="object-cover object-[80%_center] md:object-center" 
            priority
          />
          {/* Optional overlay for better text readability on mobile */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/10"></div>
        </div>

        <Container className="flex-grow flex flex-col">
            {/* Offer Badge (Absolute Positioning for perfect responsiveness) */}
            <div className="absolute right-2 top-2 sm:right-4 sm:top-4 md:right-10 md:top-1/10 lg:left-[55%] lg:top-[10%] xl:top-[13%] z-20 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <Image
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44 drop-shadow-2xl"
                src={hero}
                alt="70% Off Special Offer"
              />
            </div>
          <div className="relative flex-grow flex items-center pt-15 lg:pt-20 xl:pb-16">
            

            {/* Text Content */}
            <div className="relative z-10 w-full max-w-2xl md:max-w-md lg:max-w-lg xl:max-w-2xl space-y-4 sm:space-y-6 md:space-y-4 lg:space-y-5 xl:space-y-6 text-center md:text-left mt-12 md:mt-0">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-white/20 border border-white/30 px-4 py-1.5 md:px-3 md:py-1 lg:px-4 lg:py-1.5 text-[10px] sm:text-xs md:text-[10px] lg:text-[11px] xl:text-xs font-semibold tracking-widest text-white backdrop-blur-md shadow-sm">
                YOUR CITY. YOUR DEALS.
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-7xl font-extrabold leading-[1.1] text-white drop-shadow-md">
                Discover Amazing <br className="hidden sm:block" />
                <span className="text-[#1ec6cc] drop-shadow-sm">Local</span> Deals.
              </h1>

              {/* Subheading */}
              <h4 className="text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-medium text-white/95 drop-shadow">
                Save up to 70% on experiences you love.
              </h4>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-sm lg:text-base xl:text-lg text-white/90 max-w-xl mx-auto md:mx-0 leading-relaxed drop-shadow">
                Find exclusive discounts on restaurants, spas, adventures,
                beauty treatments, and local activities. New deals added every day!
              </p>

              <div className="pt-2 sm:pt-0 xl:pt-4 w-full max-w-xl mx-auto md:mx-0 md:scale-[0.9] lg:scale-[0.95] xl:scale-100 origin-center md:origin-left">
                <ModernSearch buttonClass="text-white font-semibold bg-[#1ec6cc] hover:bg-[#15a8ad] transition-colors shadow-lg" />
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-2 lg:gap-3 pt-4 sm:pt-6 md:pt-3 lg:pt-4 xl:pt-6">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors border border-white/10 px-4 py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 text-[10px] sm:text-xs md:text-[10px] lg:text-[11px] xl:text-xs font-medium text-white backdrop-blur-md [&>svg]:scale-75 lg:[&>svg]:scale-90 xl:[&>svg]:scale-100"
                  >
                    {feature.icon}
                    {feature.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Stats Component - Positioned at the bottom */}
          <Stats />
      </div>
    </div>
  );
}
