import Container from "@/app/components/shared/Container";
import PurchasesTable from "./__components/PurchasesTable";
import ServiceMetrics from "./__components/ServiceMetrics";

export default function Page() {
  return (
    <Container>
      <div className="space-y-6 text-gray-800 py-4">
        {/* Top Action Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Services
          </h1>

          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-teal-500/20 bg-white text-teal-600 rounded-xl text-xs font-bold hover:bg-teal-50/40 transition-colors shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Scan Voucher
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Deal
            </button>
          </div>
        </div>

        {/* Top Level Quick Metrics Row */}
        <ServiceMetrics />

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

          {/* Dynamic Responsive Pagination Footer */}
          <div className="flex items-center justify-center gap-1 pt-4 border-t border-gray-50 text-xs font-bold">
            <button
              className="p-2 text-gray-400 hover:text-gray-700 disabled:opacity-30"
              disabled
            >
              &l backward;
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-800 rounded-full">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-full">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-full">
              3
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-full">
              4
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-full">
              5
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              &r forward;
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
