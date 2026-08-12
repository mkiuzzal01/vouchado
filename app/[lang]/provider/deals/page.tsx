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
import { getDictionary } from "../../dictionaries";

interface IProps {
  searchParams: Promise<{ search: string; status: string }>;
  params: Promise<{ lang: string }>;
}

export default async function DealsPage({ searchParams, params }: IProps) {
  const { search, status } = await searchParams;
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

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
      title: t?.provider_profile?.dashboard?.stats_2?.total_revenue,
      value: revenueStats?.data?.total_revenue?.value,
      trend: `${revenueStats?.data?.total_revenue?.percentage} % all time`,
      isPositive: revenueStats?.data?.total_revenue?.percentage > 0,
      icon: Revenue,
      color: "text-cyan-500 bg-cyan-50/50",
    },
    {
      id: 2,
      title: t?.provider_profile?.dashboard?.stats_2?.active_vouchers,
      value: revenueStats?.data?.active_vouchers?.value,
      trend: `${revenueStats?.data?.active_vouchers?.percentage} % this month`,
      isPositive: revenueStats?.data?.active_vouchers?.percentage > 0,
      icon: ActiveVoucher,
      color: "text-cyan-500 bg-cyan-50/50",
    },
    {
      id: 3,
      title: t?.provider_profile?.dashboard?.stats_2?.expired_vouchers,
      value: revenueStats?.data?.expired_vouchers?.value,
      trend: `${revenueStats?.data?.expired_vouchers?.percentage} % of sold`,
      isPositive: revenueStats?.data?.expired_vouchers?.percentage > 0,
      icon: Expried,
      color: "text-cyan-500 bg-cyan-50/50",
    },
    {
      id: 4,
      title: t?.provider_profile?.dashboard?.stats_2?.redeemed_vouchers,
      value: revenueStats?.data?.redeemed_vouchers?.value,
      trend: `${revenueStats?.data?.redeemed_vouchers?.percentage} % of sold`,
      isPositive: revenueStats?.data?.redeemed_vouchers?.percentage > 0,
      icon: AlreadyRedeem,
      color: "text-rose-500 bg-rose-50",
    },
  ];

  return (
    <Container className="py-6 space-y-8 bg-slate-50/50 min-h-screen">
      <CreateDealAction
        title={
          t?.provider_profile?.dashboard?.deals_purchased?.purchase_deals?.title
        }
        t={t}
      />
      <MetricCards stat={metricsData} />
      <ActiveDealsTable
        title={t?.provider_profile?.dashboard?.active_deals?.title}
        description={t?.provider_profile?.dashboard?.active_deals?.description}
        payload={activeDeals}
        t={t}
      />
    </Container>
  );
}
