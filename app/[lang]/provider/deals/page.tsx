import Container from "@/app/components/shared/Container";
import ActiveDealsTable from "./__components/ActiveDealsTable";
import CreateDealAction from "../purchases/__components/CreateDealAction";
import MetricCards from "../__components/MetricCards";
import Revenue from "@/app/components/icons/Revenue";
import ActiveVoucher from "@/app/components/icons/ActiveVoucher";
import Expried from "@/app/components/icons/Expried";
import AlreadyRedeem from "@/app/components/icons/AlreadyRedeem";

export const metricsData = [
  {
    id: 1,
    title: "Total Revenue",
    value: "1,782",
    trend: "12% all time",
    isPositive: true,
    icon: Revenue,
    color: "text-cyan-500 bg-cyan-50/50",
  },
  {
    id: 2,
    title: "Active vouchers in total",
    value: "245",
    trend: "8% this month",
    isPositive: true,
    icon: ActiveVoucher,
    color: "text-cyan-500 bg-cyan-50/50",
  },
  {
    id: 3,
    title: "expired vouchers in total",
    value: "1,567",
    trend: "70% of sold",
    isPositive: true,
    icon: Expried,
    color: "text-cyan-500 bg-cyan-50/50",
  },
  {
    id: 4,
    title: "Vouchers already redeemed",
    value: "526",
    trend: "30% of sold",
    isPositive: false,
    icon: AlreadyRedeem,
    color: "text-rose-500 bg-rose-50",
  },
];

export default function DealsPage() {
  return (
    <Container className="py-6 space-y-8 bg-slate-50/50 min-h-screen">
      <CreateDealAction title="Deals" />
      <MetricCards metrics={metricsData} />
      <ActiveDealsTable />
    </Container>
  );
}
