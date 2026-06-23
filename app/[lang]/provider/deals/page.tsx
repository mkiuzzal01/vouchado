"use client";
import { useState } from "react";
import { Plus, Scan } from "lucide-react";
import Container from "@/app/components/shared/Container";
import StatsCards from "./__components/StatsCards";
import DealsTable from "../__components/DealsTable";
import ActiveDealsTable from "./__components/ActiveDealsTable";

export default function DealsPage() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScanVoucher = () => {
    setIsScannerOpen(true);
    console.log("Scanner opened");
  };

  return (
    <Container className="py-6 space-y-8 bg-slate-50/50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Deals
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleScanVoucher}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-teal-500 text-teal-600 font-medium rounded-xl text-sm bg-white hover:bg-teal-50 transition shadow-sm w-full sm:w-auto"
          >
            <Scan className="w-4 h-4" /> Scan Voucher
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl text-sm transition shadow-sm w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Add New Deal
          </button>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS MODULE */}
      <StatsCards />

      {/* DATA TABLE MODULE */}
      <ActiveDealsTable />

      {/* OPTIONAL SCANNER MODAL OVERLAY */}
      {isScannerOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl space-y-4 text-center">
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
