import Container from "@/app/components/shared/Container";
import PurchasesTable from "./__components/PurchasesTable";
import MetricCards from "../__components/MetricCards";
import CreateDealAction from "./__components/CreateDealAction";
import { getProviderStats } from "@/actions/quires/stats.api";
import { getPurchasedDeals } from "@/actions/quires/deals.api";
import Bag from "@/app/components/icons/Bag";
import DealSold from "@/app/components/icons/DealSold";
import DealsRedeem from "@/app/components/icons/DealsRedeem";
import DealYet from "@/app/components/icons/DealYet";
import FilterDeals from "./__components/FilterDeals";
import { getDictionary } from "../../dictionaries";

interface Props {
  searchParams: Promise<{
    filter: string;
  }>;
  params: Promise<{ lang: string }>;
}

export default async function Page({ searchParams, params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;
  const stats = await getProviderStats();
  const { filter } = await searchParams;

  const query = new URLSearchParams();

  if (filter) {
    query.set("filter", filter);
  }

  const purchases = await getPurchasedDeals(query.toString());

  const metrics = [
    {
      id: 1,
      title: t.provider_profile.dashboard.stats_1.deals_sold_total,
      value: stats?.data?.deals_sold_total?.value,
      trend: `${stats?.data?.deals_sold_total?.percentage} % ${t.provider_profile.dashboard.stats_1.all_time}`,
      isPositive: true,
      icon: DealSold,
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: 2,
      title: t.provider_profile.dashboard.stats_1.deals_sold_this_month,
      value: stats?.data?.deals_sold_this_month?.value,
      trend: `${stats?.data?.deals_sold_this_month?.percentage} % ${t.provider_profile.dashboard.stats_1.this_month}`,
      isPositive: true,
      icon: Bag,
      color: "text-cyan-500 bg-cyan-50",
    },
    {
      id: 3,
      title: t.provider_profile.dashboard.stats_1.deals_redeemed,
      value: stats?.data?.deals_redeemed?.value,
      trend: `${stats?.data?.deals_redeemed?.percentage} % ${t.provider_profile.dashboard.stats_1.of_sold}`,
      isPositive: true,
      icon: DealsRedeem,
      color: "text-teal-500 bg-teal-50",
    },
    {
      id: 4,
      title: t.provider_profile.dashboard.stats_1.deals_unredeemed,
      value: stats?.data?.deals_unredeemed?.value,
      trend: `${stats?.data?.deals_unredeemed?.percentage} % ${t.provider_profile.dashboard.stats_1.of_sold}`,
      isPositive: false,
      icon: DealYet,
      color: "text-red-500 bg-red-50",
    },
  ];

  return (
    <Container>
      <div className="space-y-6 text-gray-800 py-4">
        <CreateDealAction
          title={
            t?.provider_profile?.dashboard?.deals_purchased?.purchase_deals
              ?.title
          }
          t={t}
        />
        <MetricCards stat={metrics} />
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.provider_profile.dashboard.deals_purchased?.title}
            </h2>
            <FilterDeals />
          </div>
          <PurchasesTable purchases={purchases?.data} t={t} />
        </div>
      </div>
    </Container>
  );
}
