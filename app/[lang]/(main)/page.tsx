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
import { getDictionary } from "../dictionaries";

interface Props {
  params: Promise<{ lang: "en" | "de" }>;
  searchParams: Promise<{ service?: string; lat?: string; lng?: string }>;
}

export default async function page({ params, searchParams }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const { service, lat, lng } = await searchParams;

  const query = new URLSearchParams();

  if (lat) {
    query.set("latitude", lat);
  }
  if (lng) {
    query.set("longitude", lng);
  }
  if (service) {
    query.set("search", service);
  }

  const banner = await getBanner();
  const categories = await getCategories();
  const deals = await getDeals(query.toString());
  const trendingDeals = await getDealTrending();

  return (
    <>
      <Hero banner={banner} t={t} />
      <Steps t={t} />
      <ExploreCategories categories={categories?.data} t={t} />
      <DealsNear lang={lang} deals={deals} t={t} />
      <TrendingNow lang={lang} deals={trendingDeals} t={t} />
      <Trusted t={t} />
      <PromoBanner lang={lang} t={t} />
    </>
  );
}
