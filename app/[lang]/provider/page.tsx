import { getProviderStats } from "@/actions/quires/stats.api";
import Dashboard from "./__components/Dashboard";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getPurchasedDeals } from "@/actions/quires/deals.api";

interface IPageProps {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: IPageProps) {
  const { lang } = await params;
  const stats = await getProviderStats();
  const purchases = await getPurchasedDeals();

  if (!stats?.data) return <NotFoundData title={"No Stats Available"} />;

  return (
    <Dashboard lang={lang} stat={stats?.data} purchases={purchases?.data} />
  );
}
