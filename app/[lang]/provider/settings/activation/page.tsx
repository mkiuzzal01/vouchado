"use client";

export default function AccountActivationPage() {
  const handleDeactivate = () => {
    console.log("Deactivate account requested");
  };

  const handleDelete = () => {
    console.log("Delete account requested");
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Account Activation
        </h2>
      </div>

      {/* Grid framework matching the double panel alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deactivate Account Action Box */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50">
          <div className="space-y-0.5 max-w-[65%]">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide">
              Deactivate Account
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              Temporarily disable your business profile
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeactivate}
            className="px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-100/40"
          >
            Deactivate Account
          </button>
        </div>

        {/* Delete Account Action Box */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50">
          <div className="space-y-0.5 max-w-[65%]">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide">
              Delete Account
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              Permanently delete your account and all data
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all bg-[#ff4a4a] hover:bg-[#e03e3e] text-white shadow-sm"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
