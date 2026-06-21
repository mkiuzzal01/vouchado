export default function AsidePoint() {
  return (
    <div className="space-y-4">
      {/* Teal Points Card */}
      <div className="bg-gradient-to-br from-teal-800 to-teal-600 text-white rounded-2xl p-6 text-center shadow-sm">
        <p className="text-sm font-medium opacity-90">Hey Sarah</p>
        <h2 className="text-4xl font-bold my-2 tracking-tight">1,800</h2>
        <p className="text-xs opacity-75">Points you've collected</p>
      </div>

      {/* Info Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-xs text-gray-600 space-y-3 leading-relaxed">
        <p>
          You have reached{" "}
          <strong className="text-gray-900 font-semibold">1800 points</strong>,
          collect <strong className="text-gray-900 font-semibold">200</strong>{" "}
          more to unlock more{" "}
          <strong className="text-gray-900 font-semibold">
            €100 Vouchado Voucher
          </strong>
          .
        </p>
        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-[13px]">
            How to use points:
          </p>
          <p className="text-gray-500">
            Apply your points at checkout to unlock exclusive discounts on your
            next purchase.
          </p>
        </div>
        <p className="text-gray-400 text-[11px]">
          <span className="font-medium text-gray-500">Note:</span> Every 1,000
          points spent gives you a €50 discount.
        </p>
      </div>
    </div>
  );
}
