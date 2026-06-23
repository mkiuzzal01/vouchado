"use client";

import { useState } from "react";
import { LogOut, Trash2, KeyRound, ChevronRight } from "lucide-react";
import ModalContainer from "@/app/components/shared/ModalContainer";
import UpdateUserPassForm from "@/app/components/forms/UpdateUserPassForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { logout } from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";

export default function AsideAction() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"logout" | "delete" | null>(
    null,
  );

  const handleLogout = () => {
    dispatch(logout());
    setDialogType(null);
    router.refresh();
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account initiated...");
    setDialogType(null);
  };

  const actions = [
    {
      label: "Change Password",
      icon: (
        <KeyRound className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
      ),
      onClick: () => setIsPasswordModalOpen(true),
      isDanger: false,
    },
    {
      label: "Log Out",
      icon: (
        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
      ),
      onClick: () => setDialogType("logout"),
      isDanger: true,
    },
    {
      label: "Delete Account",
      icon: (
        <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
      ),
      onClick: () => setDialogType("delete"),
      isDanger: true,
    },
  ];

  return (
    <>
      {/* ACTION CARD CONTAINER */}
      <div className="bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm divide-y divide-slate-50">
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
                    ? "text-slate-700 group-hover:text-rose-600 transition-colors"
                    : "text-slate-700 group-hover:text-slate-900 transition-colors"
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
        <UpdateUserPassForm />
      </ModalContainer>

      {/* CONFIRMATION FLOW ENGINE */}
      <AlertDialog
        open={dialogType !== null}
        onOpenChange={(open) => !open && setDialogType(null)}
      >
        <AlertDialogContent className="bg-white border border-slate-100 rounded-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-slate-800">
              {dialogType === "logout" ? "Log Out?" : "Delete Account?"}
            </AlertDialogTitle>

            <AlertDialogDescription className="text-xs text-slate-400 font-medium leading-relaxed">
              {dialogType === "logout"
                ? "Are you sure you want to log out of your provider dashboard account session?"
                : "This action is completely irreversible. Your active packages, statistics profile, and data listings will be cleared instantly."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-0 mt-4">
            <AlertDialogCancel className="text-xs font-bold rounded-xl border-slate-200 text-slate-500 hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                dialogType === "logout" ? handleLogout : handleDeleteAccount
              }
              className={`text-xs font-bold rounded-xl text-white transition ${
                dialogType === "delete"
                  ? "bg-red-500 hover:bg-red-600 shadow-sm"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              {dialogType === "logout" ? "Log Out" : "Confirm Deletion"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
