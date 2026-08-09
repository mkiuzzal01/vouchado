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
import { getDictionary } from "@/app/[lang]/dictionaries";

interface IAsideAction {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function AsideAction({ t }: IAsideAction) {
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
      label: t?.user_profile?.aside?.action?.change_pass,
      icon: <ChangePass />,
      onClick: () => setIsPasswordModalOpen(true),
      isDanger: false,
    },
    {
      label: t?.user_profile?.aside?.action?.log_out,
      icon: <Logout />,
      onClick: () => setDialogType("logout"),
      isDanger: true,
    },
    {
      label: t?.user_profile?.aside?.action?.delete_account,
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
        title={t?.user_profile?.aside?.action?.title}
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <UpdateUserPassForm
          t={t}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      </ModalContainer>
      <ReusableAlert
        open={dialogType !== null}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={
          dialogType === "logout"
            ? t.user_profile?.aside?.logout_dialog?.title
            : t.user_profile?.aside?.delete_account_dialog?.title
        }
        description={
          dialogType === "logout"
            ? t.user_profile?.aside?.logout_dialog?.description
            : t.user_profile?.aside?.delete_account_dialog?.description
        }
        confirmText={dialogType === "logout" ? "Log Out" : "Confirm Deletion"}
        onConfirm={dialogType === "logout" ? handleLogout : handleDeleteAccount}
        variant={dialogType === "delete" ? "danger" : "default"}
      />
    </>
  );
}
