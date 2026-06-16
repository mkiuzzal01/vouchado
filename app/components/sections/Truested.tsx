import Container from "../shared/Container";
import SeactionHeader from "../shared/SeactionHeader";

export default function Truested() {
  return (
    <Container>
      <div className="py-4">
        <SeactionHeader title="Trusted by the best and loved by all" />
      </div>
      <div className="grid grid-cols-3 items-center justify-center md:grid-cols-4 lg:grid-cols-7 gap-4 ">
        {/* Card 1: Reviews */}
        <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[200px] flex-1 sm:flex-initial">
          <div className="text-[#1ec6cc] shrink-0">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold text-slate-800 leading-tight">
              4.8/5
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Based on 12,500+ Review
            </div>
          </div>
        </div>

        {/* Card 2: Secure Payments */}
        <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[200px] flex-1 sm:flex-initial">
          <div className="text-[#1ec6cc] shrink-0">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold text-slate-800 leading-tight">
              Secure Payments
            </div>
            <div className="text-xs text-slate-400 font-medium">
              100% Protected
            </div>
          </div>
        </div>

        {/* Card 3: Customer Support */}
        <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[200px] flex-1 sm:flex-initial">
          <div className="text-[#1ec6cc] shrink-0">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold text-slate-800 leading-tight">
              Customer Support
            </div>
            <div className="text-xs text-slate-400 font-medium">
              We're here to help
            </div>
          </div>
        </div>

        {/* Card 4: Trustpilot */}
        <div className="flex items-center justify-center bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[140px] h-[68px] flex-1 sm:flex-initial">
          <div className="flex items-center gap-1 font-sans font-bold text-lg text-slate-800">
            <svg
              className="w-6 h-6 text-[#00b67a]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Trustpilot
          </div>
        </div>

        {/* Card 5: Visa */}
        <div className="flex items-center justify-center bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[100px] h-[68px] flex-1 sm:flex-initial">
          <span className="text-[#1a1f71] text-2xl font-black italic tracking-tight">
            VISA
          </span>
        </div>

        {/* Card 6: PayPal */}
        <div className="flex items-center justify-center bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[110px] h-[68px] flex-1 sm:flex-initial">
          <div className="flex items-center gap-0.5 text-[#003087] font-black italic text-xl">
            <span className="text-[#00457c]">Pay</span>
            <span className="text-[#0079c1]">Pal</span>
          </div>
        </div>

        {/* Card 7: Mastercard */}
        <div className="flex flex-col items-center justify-center bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-50 min-w-[100px] h-[68px] flex-1 sm:flex-initial">
          <div className="flex -space-x-2.5">
            <div className="w-6 h-6 rounded-full bg-[#eb001b] opacity-90"></div>
            <div className="w-6 h-6 rounded-full bg-[#ff5f00] opacity-90"></div>
          </div>
          <span className="text-[9px] text-slate-500 font-medium tracking-tighter mt-1">
            mastercard
          </span>
        </div>
      </div>
    </Container>
  );
}
