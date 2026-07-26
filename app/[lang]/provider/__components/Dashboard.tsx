"use client";
import MetricCards from "../__components/MetricCards";
import DealsTable from "../__components/DealsTable";
import Container from "@/app/components/shared/Container";
import Link from "next/link";
import PromoCreateDeals from "./PromoCreateDeals";
import CreateGiftVoucher from "./CreateGiftVoucher";
import Bag from "@/app/components/icons/Bag";
import DealSold from "@/app/components/icons/DealSold";
import DealsRedeem from "@/app/components/icons/DealsRedeem";
import DealYet from "@/app/components/icons/DealYet";

interface Props {
  lang: string;
  stat: any;
  purchases: any;
  profileInfo: any;
}

export default async function Dashboard({
  lang,
  stat,
  purchases,
  profileInfo,
}: Props) {
  const metrics = [
    {
      id: 1,
      title: "Deals Sold (Total)",
      value: stat?.deals_sold_total?.value,
      trend: `${stat?.deals_sold_total?.percentage} % all time`,
      isPositive: true,
      icon: DealSold,
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: 2,
      title: "Deals Sold This Month",
      value: stat?.deals_sold_this_month?.value,
      trend: `${stat?.deals_sold_this_month?.percentage} % this month`,
      isPositive: true,
      icon: Bag,
      color: "text-cyan-500 bg-cyan-50",
    },
    {
      id: 3,
      title: "Deals Redeemed",
      value: stat?.deals_redeemed?.value,
      trend: `${stat?.deals_redeemed?.percentage} % of sold`,
      isPositive: true,
      icon: DealsRedeem,
      color: "text-teal-500 bg-teal-50",
    },
    {
      id: 4,
      title: "Deals yet Unredeemed",
      value: stat?.deals_unredeemed?.value,
      trend: `${stat?.deals_unredeemed?.percentage} % of sold`,
      isPositive: false,
      icon: DealYet,
      color: "text-red-500 bg-red-50",
    },
  ];

  return (
    <Container>
      <div className="space-y-7 p-4 w-full text-gray-800">
        {/* Welcome Bar Header Section */}
        <CreateGiftVoucher profileInfo={profileInfo} />

        {/* Metric Cards Section Block Row */}
        <MetricCards stat={metrics} />
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
          <DealsTable deal={purchases} />
        </div>
      </div>
    </Container>
  );
}
