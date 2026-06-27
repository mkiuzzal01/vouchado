import ExploreCategories from "@/app/components/categories/ExploreCategories";
import TrendingNow from "@/app/components/categories/TrendingNow";
import Hero from "@/app/components/hero/Hero";
import PromoBanner from "@/app/components/hero/PromoBanner";
import DealsNear from "@/app/components/sections/DealsNear";
import Trusted from "@/app/components/sections/Trusted";
import Steps from "@/app/components/utils/Steps";

interface Props {
  params: Promise<{ lang: "en" | "de" }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;

  return (
    <>
      <Hero />
      {/* <Steps />
      <ExploreCategories />
      <DealsNear lang={lang} />
      <TrendingNow lang={lang} />
      <Trusted />
      <PromoBanner lang={lang} /> */}
    </>
  );
}
