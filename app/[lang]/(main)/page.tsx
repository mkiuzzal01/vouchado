import { getCategories } from "@/actions/quires/cateogries.api";
import { getDeals, getDealTrending } from "@/actions/quires/deals.api";
import { getBanner } from "@/actions/quires/system_info.api";
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
  const banner = await getBanner();
  const categories = await getCategories();
  const deals = await getDeals();
  const trendingDeals = await getDealTrending();

  return (
    <>
      <Hero banner={banner} />
      <Steps />
      <ExploreCategories categories={categories} />
      <DealsNear lang={lang} deals={deals} />
      <TrendingNow lang={lang} deals={trendingDeals} />
      <Trusted />
      <PromoBanner lang={lang} />
    </>
  );
}
