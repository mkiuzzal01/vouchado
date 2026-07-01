"use client";
import MetricCards from "../__components/MetricCards";
import DealsTable from "../__components/DealsTable";
import Container from "@/app/components/shared/Container";
import Link from "next/link";
import PromoCreateDeals from "./PromoCreateDeals";
import DealSold from "@/app/components/icons/DealSold";
import DealsRedeem from "@/app/components/icons/DealsRedeem";
import DealYet from "@/app/components/icons/DealYet";
import Bag from "@/app/components/icons/Bag";

export const metricsData = [
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

interface Props {
  lang: string;
}

export default function Dashboard({ lang }: Props) {
  return (
    <Container>
      <div className="space-y-7 p-4 w-full text-gray-800">
        {/* Welcome Bar Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 flex items-center gap-1.5">
              Hi Eva <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-base text-gray-400 font-normal mt-0.5">
              Let's grow your business today
            </p>
          </div>
        </div>

        {/* Metric Cards Section Block Row */}
        <MetricCards metrics={metricsData} />
        <PromoCreateDeals />

        {/* Primary Analytical Data Feed Layout Container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Deal Purchased</h2>
            <Link href={`/${lang}/provider/purchases`}>
              <span className="text-base font-se text-teal-500 underline">
                View all
              </span>
            </Link>
          </div>

          {/* Dynamic Inner Table Grid */}
          <DealsTable />
        </div>
      </div>
    </Container>
  );
}
