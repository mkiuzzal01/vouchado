"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import ModalContainer from "@/app/components/shared/ModalContainer";
import UpdateUserPassForm from "@/app/components/forms/UpdateUserPassForm";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { logout } from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import ReusableAlert from "@/app/components/shared/ReusableAlart";
import ChangePass from "@/app/components/icons/ChangePass";
import Logout from "@/app/components/icons/Logout";
import Delete from "@/app/components/icons/Delete";
import { useDeleteAccountMutation } from "@/redux/features/user/user.api";
import { toast } from "react-toastify";

export default function AsideAction() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"logout" | "delete" | null>(
    null,
  );
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleLogout = () => {
    dispatch(logout());
    setDialogType(null);
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteAccount({}).unwrap();
      console.log(res);
      dispatch(logout());
      setDialogType(null);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const actions = [
    {
      label: "Change Password",
      icon: <ChangePass />,
      onClick: () => setIsPasswordModalOpen(true),
      isDanger: false,
    },
    {
      label: "Log Out",
      icon: <Logout />,
      onClick: () => setDialogType("logout"),
      isDanger: true,
    },
    {
      label: "Delete Account",
      icon: <Delete />,
      onClick: () => setDialogType("delete"),
      isDanger: true,
    },
  ];

  return (
    <>
      {/* ACTION CARD CONTAINER */}
      <div className="bg-white rounded-2xl p-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold rounded-xl hover:bg-slate-50/80 transition-all group"
          >
            <div className="flex items-center gap-3">
              {action.icon}
              <span
                className={
                  action.isDanger
                    ? "text-slate-700 group-hover:text-rose-600 font-medium text-xl"
                    : "text-slate-700 group-hover:text-slate-900 font-medium text-xl"
                }
              >
                {action.label}
              </span>
            </div>
            {!action.isDanger && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
            )}
          </button>
        ))}
      </div>

      {/* CHANGE PASSWORD WINDOW OVERLAY */}
      <ModalContainer
        title="Change Password"
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <UpdateUserPassForm onClose={() => setIsPasswordModalOpen(false)} />
      </ModalContainer>

      <ReusableAlert
        open={dialogType !== null}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={dialogType === "logout" ? "Log Out?" : "Delete Account?"}
        description={
          dialogType === "logout"
            ? "Are you sure you want to log out of your provider dashboard account session?"
            : "This action is completely irreversible. Your active packages, statistics profile, and data listings will be cleared instantly."
        }
        confirmText={dialogType === "logout" ? "Log Out" : "Confirm Deletion"}
        onConfirm={dialogType === "logout" ? handleLogout : handleDeleteAccount}
        variant={dialogType === "delete" ? "danger" : "default"}
      />
    </>
  );
}
