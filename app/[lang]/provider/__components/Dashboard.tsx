"use client";
import MetricCards from "../__components/MetricCards";
import DealsTable from "../__components/DealsTable";
import Container from "@/app/components/shared/Container";
import Link from "next/link";
import ModalContainer from "@/app/components/shared/ModalContainer";
import CreateDealForm from "@/app/components/forms/muti-steps/CreateDealForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { setOpenDealModal } from "@/redux/features/provider/deal.slice";
import { Plus, Scan } from "lucide-react";

interface Props {
  lang: string;
}

export default function Dashboard({ lang }: Props) {
  const dispatch = useAppDispatch();
  const { openDealModal } = useAppSelector((state) => state.deal);

  return (
    <Container>
      <div className="space-y-7 p-4 w-full text-gray-800">
        {/* Welcome Bar Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
              Hi Eva <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Let's grow your business today
            </p>
          </div>

          {/* Global Control Button Pairs */}
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-teal-500 text-teal-600 font-medium rounded-xl text-sm bg-white hover:bg-teal-50 transition shadow-sm w-full sm:w-auto">
              <Scan className="w-4 h-4" /> Scan Voucher
            </button>
            <button
              onClick={() => dispatch(setOpenDealModal(!openDealModal))}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl text-sm transition shadow-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Add New Deal
            </button>
          </div>
        </div>

        {/* Metric Cards Section Block Row */}
        <MetricCards />

        {/* Primary Analytical Data Feed Layout Container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900">Deal Purchased</h2>
            <Link href={`/${lang}/provider/purchases`}>
              <button className="text-xs font-bold text-teal-500 hover:underline">
                View all
              </button>
            </Link>
          </div>

          {/* Dynamic Inner Table Grid */}
          <DealsTable />
        </div>
        <ModalContainer
          title="Create new deal"
          isOpen={openDealModal}
          onClose={() => dispatch(setOpenDealModal(!openDealModal))}
        >
          <CreateDealForm />
        </ModalContainer>
      </div>
    </Container>
  );
}
