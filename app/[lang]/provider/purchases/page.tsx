import Container from "@/app/components/shared/Container";
import PurchasesTable from "./__components/PurchasesTable";
import MetricCards from "../__components/MetricCards";
import CreateDealAction from "./__components/CreateDealAction";
import DealSold from "@/app/components/icons/DealSold";
import Bag from "@/app/components/icons/Bag";
import DealsRedeem from "@/app/components/icons/DealsRedeem";
import DealYet from "@/app/components/icons/DealYet";

const metrics = [
  {
    id: 1,
    title: "Deals Sold (Total)",
    value: "1,782",
    trend: "12% all time",
    isPositive: true,
    icon: DealSold,
    color: "text-blue-500 bg-blue-50",
  },
  {
    id: 2,
    title: "Deals Sold This Month",
    value: "245",
    trend: "8% this month",
    isPositive: true,
    icon: Bag,
    color: "text-cyan-500 bg-cyan-50",
  },
  {
    id: 3,
    title: "Deals Redeemed",
    value: "1,567",
    trend: "70% of sold",
    isPositive: true,
    icon: DealsRedeem,
    color: "text-teal-500 bg-teal-50",
  },
  {
    id: 4,
    title: "Deals yet Unredeemed",
    value: "526",
    trend: "30% of sold",
    isPositive: false,
    icon: DealYet,
    color: "text-red-500 bg-red-50",
  },
];

export default function Page() {
  return (
    <Container>
      <div className="space-y-6 text-gray-800 py-4">
        <CreateDealAction title="Services" />
        {/* Top Action Header Bar */}
        <MetricCards metrics={metrics} />
        {/* Main Core Content Table Block */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900">Deal Purchased</h2>

            {/* Action Filter Pill Trigger */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-xs font-bold hover:bg-teal-600 transition-colors shadow-sm">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
          </div>

          {/* Detailed Data Table Layout */}
          <PurchasesTable />
        </div>
      </div>
    </Container>
  );
}
