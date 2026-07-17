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

interface Props {
  searchParams: Promise<{}>;
}

export default async function Page({ searchParams }: Props) {
  const stats = await getProviderStats();
  const query = await searchParams;
  const purchases = await getPurchasedDeals();

  const metrics = [
    {
      id: 1,
      title: "Deals Sold (Total)",
      value: stats?.data?.deals_sold_total?.value,
      trend: `${stats?.data?.deals_sold_total?.percentage} % all time`,
      isPositive: true,
      icon: DealSold,
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: 2,
      title: "Deals Sold This Month",
      value: stats?.data?.deals_sold_this_month?.value,
      trend: `${stats?.data?.deals_sold_this_month?.percentage} % this month`,
      isPositive: true,
      icon: Bag,
      color: "text-cyan-500 bg-cyan-50",
    },
    {
      id: 3,
      title: "Deals Redeemed",
      value: stats?.data?.deals_redeemed?.value,
      trend: `${stats?.data?.deals_redeemed?.percentage} % of sold`,
      isPositive: true,
      icon: DealsRedeem,
      color: "text-teal-500 bg-teal-50",
    },
    {
      id: 4,
      title: "Deals yet Unredeemed",
      value: stats?.data?.deals_unredeemed?.value,
      trend: `${stats?.data?.deals_unredeemed?.percentage} % of sold`,
      isPositive: false,
      icon: DealYet,
      color: "text-red-500 bg-red-50",
    },
  ];

  return (
    <Container>
      <div className="space-y-6 text-gray-800 py-4">
        <CreateDealAction title="Services" />
        {/* Top Action Header Bar */}
        <MetricCards stat={metrics} />
        {/* Main Core Content Table Block */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Deal Purchased
            </h2>

            {/* Action Filter Pill Trigger */}
            <FilterDeals />
          </div>

          {/* Detailed Data Table Layout */}
          <PurchasesTable purchases={purchases?.data} />
        </div>
      </div>
    </Container>
  );
}
