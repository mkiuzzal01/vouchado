import ExploreCategories from "@/app/components/categories/ExlopreCategories";
import TrendingNow from "@/app/components/categories/TrendingNow";
import Hero from "@/app/components/hero/Hero";
import PromoBanner from "@/app/components/hero/Promotional";
import DealsNear from "@/app/components/sections/DealsNear";
import Truested from "@/app/components/sections/Truested";
import Steps from "@/app/components/utils/Steps";

export default function page() {
  return (
    <>
      <Hero />
      <Steps />
      <ExploreCategories />
      <DealsNear />
      <TrendingNow />
      <Truested />
      <PromoBanner />
    </>
  );
}
