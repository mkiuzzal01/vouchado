"use client";

export default function PaymentInformationPage() {
  const handleEditPayment = () => {
    // Custom logic to handle opening a Stripe configuration modal or routing link
    console.log("Edit payment method clicked");
  };

  return (
    <div className="w-full space-y-6">
      {/* Subview Section Header */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Payment Information
        </h2>
      </div>

      {/* Stripe Payment Integration Status Container */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50/80 hover:border-gray-100 transition-all">
        {/* Left Side Status Metrics */}
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-gray-800 tracking-wide">
            Payment methods
          </h3>
          <p className="text-[11px] text-gray-400 font-medium tracking-wide">
            Stripe
          </p>
        </div>

        {/* Brand Rounded Action Button */}
        <button
          type="button"
          onClick={handleEditPayment}
          className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-cyan-100 bg-cyan-50/40 text-[#29b6be] hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-200"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
