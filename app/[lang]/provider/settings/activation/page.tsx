"use client";
import ReusableAlert from "@/app/components/shared/ReusableAlart";
import { logout } from "@/redux/features/auth/auth.slice";
import { useDeleteAccountMutation } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AccountActivationPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const [dialogType, setDialogType] = useState<"deactivate" | "delete" | null>(
    null,
  );

  const handleDeactivate = async () => {
    console.log("Deactivate account requested");
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAccount({}).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        router.push("/");
        dispatch(logout());
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      <div className="pb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Account Activation
        </h2>
      </div>

      {/* Grid framework matching the double panel alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deactivate Account Action Box */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50">
          <div className="space-y-0.5 w-full sm:max-w-[65%]">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide">
              Deactivate Account
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              Temporarily disable your business profile
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDialogType("deactivate")}
            className="w-full sm:w-auto text-center px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-100/40"
          >
            Deactivate Account
          </button>
        </div>

        {/* Delete Account Action Box */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50">
          <div className="space-y-0.5 w-full sm:max-w-[65%]">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide">
              Delete Account
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              Permanently delete your account and all data
            </p>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => setDialogType("delete")}
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all bg-[#ff4a4a] hover:bg-[#e03e3e] text-white shadow-sm"
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>

      {/* Dynamic Action Dialog Context */}
      <ReusableAlert
        open={dialogType !== null}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={
          dialogType === "deactivate"
            ? "Deactivate Account?"
            : "Delete Account?"
        }
        description={
          dialogType === "deactivate"
            ? "Are you sure you want to temporarily deactivate your business account? You can log back in anytime to reactivate it."
            : "This action is completely irreversible. Your active packages, statistics profile, and data listings will be cleared instantly."
        }
        confirmText={
          dialogType === "deactivate" ? "Deactivate" : "Confirm Deletion"
        }
        onConfirm={
          dialogType === "deactivate" ? handleDeactivate : handleDelete
        }
        variant={
          dialogType === "delete" || dialogType === "deactivate"
            ? "danger"
            : "default"
        }
      />
    </div>
  );
}
