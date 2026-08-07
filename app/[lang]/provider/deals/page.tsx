import Container from "@/app/components/shared/Container";
import ActiveDealsTable from "./__components/ActiveDealsTable";
import CreateDealAction from "../purchases/__components/CreateDealAction";
import MetricCards from "../__components/MetricCards";
import Revenue from "@/app/components/icons/Revenue";
import ActiveVoucher from "@/app/components/icons/ActiveVoucher";
import Expried from "@/app/components/icons/Expried";
import AlreadyRedeem from "@/app/components/icons/AlreadyRedeem";
import { getProviderRevenueStats } from "@/actions/quires/stats.api";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getActiveDeals } from "@/actions/quires/deals.api";

interface IProps {
  searchParams: Promise<{ search: string; status: string }>;
}

export default async function DealsPage({ searchParams }: IProps) {
  const { search, status } = await searchParams;
  const revenueStats = await getProviderRevenueStats();

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (status) query.set("status", status);

  const activeDeals = await getActiveDeals(query.toString());

  if (!revenueStats?.data || !activeDeals?.data)
    return <NotFoundData title={"No Revenue Stats Available"} />;

  const metricsData = [
    {
      id: 1,
      title: "Total Revenue",
      value: revenueStats?.data?.total_revenue?.value,
      trend: `${revenueStats?.data?.total_revenue?.percentage} % all time`,
      isPositive: revenueStats?.data?.total_revenue?.percentage > 0,
      icon: Revenue,
      color: "text-cyan-500 bg-cyan-50/50",
    },
    {
      id: 2,
      title: "Active vouchers in total",
      value: revenueStats?.data?.active_vouchers?.value,
      trend: `${revenueStats?.data?.active_vouchers?.percentage} % this month`,
      isPositive: revenueStats?.data?.active_vouchers?.percentage > 0,
      icon: ActiveVoucher,
      color: "text-cyan-500 bg-cyan-50/50",
    },
    {
      id: 3,
      title: "expired vouchers in total",
      value: revenueStats?.data?.expired_vouchers?.value,
      trend: `${revenueStats?.data?.expired_vouchers?.percentage} % of sold`,
      isPositive: revenueStats?.data?.expired_vouchers?.percentage > 0,
      icon: Expried,
      color: "text-cyan-500 bg-cyan-50/50",
    },
    {
      id: 4,
      title: "Vouchers already redeemed",
      value: revenueStats?.data?.redeemed_vouchers?.value,
      trend: `${revenueStats?.data?.redeemed_vouchers?.percentage} % of sold`,
      isPositive: revenueStats?.data?.redeemed_vouchers?.percentage > 0,
      icon: AlreadyRedeem,
      color: "text-rose-500 bg-rose-50",
    },
  ];

  return (
    <Container className="py-6 space-y-8 bg-slate-50/50 min-h-screen">
      <CreateDealAction title="Deals" />
      <MetricCards stat={metricsData} />
      <ActiveDealsTable payload={activeDeals} />
    </Container>
  );
}
