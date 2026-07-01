"use client";
import { useState } from "react";
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
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <Container className="py-6 space-y-8 bg-slate-50/50 min-h-screen">
      {/* HEADER SECTION */}
      <CreateDealAction title="Deals" />

      {/* METRIC SUMMARY CARDS MODULE */}
      <MetricCards metrics={metricsData} />

      {/* DATA TABLE MODULE */}
      <ActiveDealsTable />

      {/* OPTIONAL SCANNER MODAL OVERLAY */}
      {isScannerOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full  space-y-4 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              Voucher Scanner Active
            </h3>
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 text-xs">
              [ Camera Feed Preview Container ]
            </div>
            <button
              onClick={() => setIsScannerOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-sm transition"
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
