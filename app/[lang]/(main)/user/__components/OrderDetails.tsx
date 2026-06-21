export default function OrderDetails() {
  return (
    <div className="w-full space-y-6">
      {/* Services List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 tracking-wider uppercase">
          Services
        </h3>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 rounded-2xl bg-white shadow-sm"
          >
            {/* Service Thumbnail */}
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80"
              alt="Service location"
              className="w-full sm:w-28 h-28 object-cover rounded-xl shrink-0"
            />

            {/* Service Meta Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 font-medium text-[10px] rounded-full">
                  Beauty and Wellness
                </span>
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  Live Concert Tickets for Summer Fest
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-0.5 text-amber-500">
                    ★ <span className="text-gray-700 font-bold">4.0</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    City Park, Chicago
                  </span>
                </div>
              </div>

              {/* Micro Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="flex-1 sm:flex-initial text-center bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-colors">
                  View Coupon
                </button>
                <button className="flex-1 sm:flex-initial text-center border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] font-bold px-4 py-2 rounded-lg transition-colors">
                  View Details
                </button>
                <button className="flex-1 sm:flex-initial text-center border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] font-bold px-4 py-2 rounded-lg transition-colors">
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Summary Block */}
      <div className="bg-gray-50/70 border border-gray-100/80 rounded-2xl p-5 space-y-4">
        {/* Main Grid Header */}
        <div className="grid grid-cols-3 text-[11px] font-bold text-gray-400 tracking-wider">
          <div>Item</div>
          <div className="text-center">Items</div>
          <div className="text-right">Sub Total</div>
        </div>

        {/* Sub Total Values */}
        <div className="grid grid-cols-3 items-center text-sm font-bold text-gray-800 border-b border-gray-200/60 pb-3">
          <div>Sub Total</div>
          <div className="text-center font-semibold text-gray-600">02</div>
          <div className="text-right">€ 468.86</div>
        </div>

        {/* Breakdowns */}
        <div className="space-y-2 text-xs font-semibold text-gray-500 border-b border-gray-200/60 pb-3">
          <div className="flex justify-between">
            <span>Vat (20%)</span>
            <span className="text-gray-800">€ 11.65</span>
          </div>
          <div className="flex justify-between">
            <span>voucher Discount</span>
            <span className="text-rose-500">-€ 10.00</span>
          </div>
          <div className="flex justify-between">
            <span>Vouchado voucher</span>
            <span className="text-rose-500">-€ 50.00</span>
          </div>
        </div>

        {/* Total Block */}
        <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-1">
          <span>Total</span>
          <span className="text-lg">€ 516.31</span>
        </div>
      </div>

      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button className="w-full sm:flex-1 py-2.5 text-center text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors顺序">
          Purchase again
        </button>
        <button className="w-full sm:flex-1 py-2.5 text-center text-xs font-bold text-rose-500 border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors">
          Cancel Order
        </button>
      </div>
    </div>
  );
}
