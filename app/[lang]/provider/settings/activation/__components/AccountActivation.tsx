"use client";

import { getDictionary } from "@/app/[lang]/dictionaries";
import ReusableAlert from "@/app/components/shared/ReusableAlart";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAccountStatusMutation } from "@/redux/features/provider/settings.api";
import { useDeleteAccountMutation } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  profile: any;
}

export default function AccountActivation({ profile, t }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [accountStatus, { isLoading: isStatusLoading }] =
    useAccountStatusMutation();
  const [deleteAccount, { isLoading: isDeleteLoading }] =
    useDeleteAccountMutation();

  const [dialogType, setDialogType] = useState<string | null>(null);

  const isCurrentActive = profile?.status === "active";

  // Shortcut for clean access to account activation translations
  const i18n = t?.provider_profile?.settings?.account_activation;

  const handleDeactivate = async () => {
    try {
      // Toggle payload: target "Deactive" if currently active ("deactivate" dialog), else "Active"
      const targetStatus = dialogType === "deactivate" ? "Deactive" : "Active";
      const res = await accountStatus({ status: targetStatus }).unwrap();

      if (res?.message) {
        toast.success(res.message);
        router.push("/");
        dispatch(logout());
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          i18n?.errors?.something_went_wrong ||
          "Something went wrong",
      );
    } finally {
      setDialogType(null);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAccount({}).unwrap();
      if (res?.message) {
        toast.success(res.message);
        router.push("/");
        dispatch(logout());
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          i18n?.errors?.something_went_wrong ||
          "Something went wrong",
      );
    } finally {
      setDialogType(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      <div className="pb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          {i18n?.title || "Account Activation"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Toggle Activation Action Box */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50">
          <div className="space-y-0.5 w-full sm:max-w-[65%]">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide">
              {isCurrentActive
                ? i18n?.deactivate?.title || "Deactivate Account"
                : i18n?.activate?.title || "Activate Account"}
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              {isCurrentActive
                ? i18n?.deactivate?.description ||
                  "Temporarily disable your business profile"
                : i18n?.activate?.description ||
                  "Re-enable your business profile visibility"}
            </p>
          </div>

          <button
            type="button"
            disabled={isStatusLoading || isDeleteLoading}
            onClick={() =>
              setDialogType(isCurrentActive ? "deactivate" : "active")
            }
            className="w-full sm:w-auto text-center px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-100/40 disabled:opacity-50"
          >
            {isStatusLoading
              ? i18n?.processing || "Processing..."
              : isCurrentActive
                ? i18n?.deactivate?.button || "Deactivate Account"
                : i18n?.activate?.button || "Activate Account"}
          </button>
        </div>

        {/* Delete Account Action Box */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50">
          <div className="space-y-0.5 w-full sm:max-w-[65%]">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide">
              {i18n?.delete?.title || "Delete Account"}
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              {i18n?.delete?.description ||
                "Permanently delete your account and all data"}
            </p>
          </div>

          <button
            type="button"
            disabled={isStatusLoading || isDeleteLoading}
            onClick={() => setDialogType("delete")}
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all bg-[#ff4a4a] hover:bg-[#e03e3e] text-white shadow-sm disabled:opacity-50"
          >
            {isDeleteLoading
              ? i18n?.deleting || "Deleting..."
              : i18n?.delete?.button || "Delete Account"}
          </button>
        </div>
      </div>

      {/* Dynamic Action Dialog Context */}
      <ReusableAlert
        open={dialogType !== null}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={
          dialogType === "active"
            ? i18n?.dialog?.activate_title || "Activate Account?"
            : dialogType === "deactivate"
              ? i18n?.dialog?.deactivate_title || "Deactivate Account?"
              : i18n?.dialog?.delete_title || "Delete Account?"
        }
        description={
          dialogType === "active"
            ? i18n?.dialog?.activate_desc ||
              "Are you sure you want to reactivate your business account? This will make your profile public again."
            : dialogType === "deactivate"
              ? i18n?.dialog?.deactivate_desc ||
                "Are you sure you want to temporarily deactivate your business account? You can log back in anytime to reactivate it."
              : i18n?.dialog?.delete_desc ||
                "This action is completely irreversible. Your active packages, statistics profile, and data listings will be cleared instantly."
        }
        confirmText={
          dialogType === "active"
            ? i18n?.dialog?.confirm_activate || "Activate"
            : dialogType === "deactivate"
              ? i18n?.dialog?.confirm_deactivate || "Deactivate"
              : i18n?.dialog?.confirm_delete || "Confirm Deletion"
        }
        onConfirm={dialogType === "delete" ? handleDelete : handleDeactivate}
        variant={dialogType === "active" ? "default" : "danger"}
      />
    </div>
  );
}
