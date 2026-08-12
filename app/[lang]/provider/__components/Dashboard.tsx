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
import { getDictionary } from "../../dictionaries";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  lang: string;
  stat: any;
  purchases: any;
  profileInfo: any;
}

export default async function Dashboard({
  t,
  lang,
  stat,
  purchases,
  profileInfo,
}: Props) {
  const metrics = [
    {
      id: 1,
      title: t?.provider_profile?.dashboard?.stats_1?.deals_sold_total,
      value: stat?.deals_sold_total?.value,
      trend: `${stat?.deals_sold_total?.percentage} % ${t?.provider_profile?.dashboard?.stats_1?.all_time}`,
      isPositive: true,
      icon: DealSold,
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: 2,
      title: t?.provider_profile?.dashboard?.stats_1?.deals_sold_this_month,
      value: stat?.deals_sold_this_month?.value,
      trend: `${stat?.deals_sold_this_month?.percentage} % ${t?.provider_profile?.dashboard?.stats_1?.this_month}`,
      isPositive: true,
      icon: Bag,
      color: "text-cyan-500 bg-cyan-50",
    },
    {
      id: 3,
      title: t?.provider_profile?.dashboard?.stats_1?.deals_redeemed,
      value: stat?.deals_redeemed?.value,
      trend: `${stat?.deals_redeemed?.percentage} % ${t?.provider_profile?.dashboard?.stats_1?.of_sold}`,
      isPositive: true,
      icon: DealsRedeem,
      color: "text-teal-500 bg-teal-50",
    },
    {
      id: 4,
      title: t?.provider_profile?.dashboard?.stats_1?.deals_unredeemed,
      value: stat?.deals_unredeemed?.value,
      trend: `${stat?.deals_unredeemed?.percentage} % ${t?.provider_profile?.dashboard?.stats_1?.of_sold}`,
      isPositive: false,
      icon: DealYet,
      color: "text-red-500 bg-red-50",
    },
  ];

  return (
    <Container>
      <div className="space-y-7 p-4 w-full text-gray-800">
        {/* Welcome Bar Header Section */}
        <CreateGiftVoucher lang={lang} t={t} profileInfo={profileInfo} />

        {/* Metric Cards Section Block Row */}
        <MetricCards stat={metrics} />
        <PromoCreateDeals t={t} />

        {/* Primary Analytical Data Feed Layout Container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {t?.provider_profile?.dashboard?.deals_purchased?.title}
            </h2>
            <Link href={`/${lang}/provider/purchases`}>
              <span className="text-base font-se text-teal-500 underline">
                {t?.provider_profile?.dashboard?.deals_purchased?.view_all}
              </span>
            </Link>
          </div>

          {/* Dynamic Inner Table Grid */}
          <DealsTable deal={purchases} t={t} />
        </div>
      </div>
    </Container>
  );
}
